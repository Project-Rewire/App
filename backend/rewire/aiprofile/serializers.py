from rest_framework import serializers
from .models import AIProfile

class AIProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIProfile
        fields = '__all__'
        