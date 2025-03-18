from django.db import models
from core.models import User
from django.utils import timezone

class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to='community_icons/', null=True, blank=True)
    category = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    @property
    def member_count(self):
        return self.members.count()
    
class CommunityMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='members')
    joined_at = models.DateTimeField(default=timezone.now) # returns utc time by default
    
    class Meta:
        unique_together = ('user', 'community')

    def __str__(self):
        return f"{self.user.username} - {self.community.name}"

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    like = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='posts')
    
    def __str__(self):
        return self.title

class CommunityAllocation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'community')