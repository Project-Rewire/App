from django.contrib import admin
from .models import Community, CommunityMembership, Post, CommunityAllocation

admin.site.register(Community)
admin.site.register(CommunityMembership)
admin.site.register(Post)
admin.site.register(CommunityAllocation)


