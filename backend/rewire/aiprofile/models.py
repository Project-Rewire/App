from django.db import models
from core.models import User

class AIProfile(models.Model):
    """
    AIProfile: Database model that stores the user's current AI profile information.
    
    Fields:
        user: ForeignKey(User) - The Rewire app user.
        addiction_type: CharField(max_length=30) - The type of addiction the user has.
        addiction_duration_months: IntegerField - The number of months the user has had the addiction.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    addiction_type  = models.CharField(max_length=30)
    addiction_duration_months = models.IntegerField()