from rest_framework import serializers
from .models import Community, CommunityMembership, Post, CommunityAllocation  
from core.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CommunitySerializer(serializers.ModelSerializer):
    member_count = serializers.IntegerField(read_only=True)
    is_member = serializers.SerializerMethodField()
    class Meta:
        model = Community
        fields = ['id', 'name', 'icon', 'category', 'member_count', 'is_member']

    def get_is_member(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return CommunityMembership.objects.filter(user=request.user, community=obj).exists()
        return False

class CommunityCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ['name', 'description', 'icon', 'category']
    
    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return super().create(validated_data)

class CommunityMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    community = CommunitySerializer(read_only=True)
    
    class Meta:
        model = CommunityMembership
        fields = ['id', 'user', 'community', 'joined_at']

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'like', 'user', 'community']


class CommunityAllocationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    community = CommunitySerializer(read_only=True)
    
    class Meta:
        model = CommunityAllocation
        fields = ['id', 'user', 'community']