from django.db import models
from core.models import User

class Community(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    
    def __str__(self):
        return self.title

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