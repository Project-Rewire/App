
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Q
from .models import Community, CommunityMembership
from .serializer import CommunitySerializer, CommunityCreateSerializer, CommunityMembershipSerializer, PostSerializer
from .models import Community, CommunityMembership, Post

class IsCreatorOrReadOnly(permissions.BasePermission):
   
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the creator of the community
        return obj.creator == request.user

class CommunityViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly]
    
    def get_queryset(self):
        queryset = Community.objects.annotate(member_count=Count('members'))
        
        # Filter by search query if provided
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | 
                Q(description__icontains=search_query) |
                Q(category__icontains=search_query)
            )
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CommunityCreateSerializer
        return CommunitySerializer
    
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
    
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        community = self.get_object()
        user = request.user
        
        if CommunityMembership.objects.filter(user=user, community=community).exists():
            return Response(
                {"detail": "You are already a member of this community."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        membership = CommunityMembership.objects.create(user=user, community=community)
        serializer = CommunityMembershipSerializer(membership)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        community = self.get_object()
        user = request.user
        
        try:
            membership = CommunityMembership.objects.get(user=user, community=community)
            membership.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CommunityMembership.DoesNotExist:
            return Response(
                {"detail": "You are not a member of this community."},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'])
    def joined(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        user_communities = Community.objects.filter(
            members__user=request.user
        ).annotate(member_count=Count('members'))
        
        serializer = self.get_serializer(user_communities, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def suggested(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required."},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Get communities the user is not a member of
        suggested_communities = Community.objects.exclude(
            members__user=request.user
        ).annotate(member_count=Count('members'))
        
        serializer = self.get_serializer(suggested_communities, many=True)
        return Response(serializer.data)
        
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        post.like += 1
        post.save()
        serializer = PostSerializer(post)
        return Response(serializer.data)