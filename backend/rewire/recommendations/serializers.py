from rest_framework import serializers
from .models import Task, UserTask, UserScore

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class UserTaskSerializer(serializers.ModelSerializer):
    task_details = TaskSerializer(source='task', read_only=True)
    
    class Meta:
        model = UserTask
        fields = [
            'id', 'user', 'task', 'task_details', 'status', 
            'rating', 'started_at', 'completed_at', 'earned_marks'
        ]
        read_only_fields = ['earned_marks']


class UserScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserScore
        fields = ['total_marks', 'tasks_completed', 'last_updated']
        read_only_fields = fields


class TaskRatingSerializer(serializers.Serializer):
    rating = serializers.IntegerField(min_value=1, max_value=5)


class RecommendationRequestSerializer(serializers.Serializer):
    difficulty = serializers.ChoiceField(
        choices=['EASY', 'MEDIUM', 'HARD'], 
        required=False, 
        allow_null=True
    )
    count = serializers.IntegerField(min_value=1, max_value=10, default=3)


class UserTaskUpdateSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=['start', 'complete', 'pass'])