from django.db import models
from core.models import User

class AIProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    addiction_type  = models.CharField(max_length=30)
    sentiment_value = models.DecimalField(max_digits=3, decimal_places=3)
    addiction_duration_months = models.IntegerField()