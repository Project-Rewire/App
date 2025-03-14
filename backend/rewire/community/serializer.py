from rest_framework import serializers
from .models import Community, Post, CommunityAllocation
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ['id', 'title']

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