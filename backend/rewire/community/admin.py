from django.contrib import admin
from .models import Community, CommunityMembership, Post, CommunityAllocation

admin.register(Community)
admin.register(CommunityMembership)
admin.register(Post)
admin.register(CommunityAllocation)


