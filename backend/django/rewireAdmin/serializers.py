from rest_framework import serializers
from .models import User

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'user_name', 'f_name', 'l_name', 'email']

        extra_kwargs = {
            'password': {'write_only': True}
        }