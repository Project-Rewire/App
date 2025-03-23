from rest_framework import serializers
from .models import Community, CommunityMember, Post, CommunityAllocation
from django.contrib.auth.models import User

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
            return CommunityMember.objects.filter(user=request.user, community=obj).exists()
        return False

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