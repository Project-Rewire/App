from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Community, Post, CommunityAllocation
from .serializer import CommunitySerializer, PostSerializer, CommunityAllocationSerializer
from rest_framework.decorators import action

class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        community = self.get_object()
        user = request.user
        
        allocation, created = CommunityAllocation.objects.get_or_create(
            user=user,
            community=community
        )
        
        serializer = CommunityAllocationSerializer(allocation)
        return Response(serializer.data)
    
    @action(detail=True, methods=['delete'])
    def leave(self, request, pk=None):
        community = self.get_object()
        user = request.user
        
        try:
            allocation = CommunityAllocation.objects.get(
                user=user,
                community=community
            )
            allocation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CommunityAllocation.DoesNotExist:
            return Response(
                {"detail": "You are not a member of this community."},
                status=status.HTTP_400_BAD_REQUEST
            )

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