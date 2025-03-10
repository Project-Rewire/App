from rest_framework import serializers
from .models import QuestionnaireQuestion

class QuestionnaireQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionnaireQuestion
        fields = '__all__'
        