from rest_framework import serializers
from .models import Task, UserTask, UserScore, DailyProgress

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for the Task model.
    """
    class Meta:
        model = Task
        fields = '__all__'


class UserTaskSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserTask model with nested task details.
    """
    task_details = TaskSerializer(source='task', read_only=True)
    
    class Meta:
        model = UserTask
        fields = [
            'id', 'user', 'task', 'task_details', 'status', 
            'rating', 'started_at', 'completed_at', 'earned_marks'
        ]
        read_only_fields = ['earned_marks']


class UserScoreSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserScore model.
    """
    class Meta:
        model = UserScore
        fields = ['total_marks', 'tasks_completed', 'last_updated']
        read_only_fields = fields


class TaskRatingSerializer(serializers.Serializer):
    """
    Serializer for rating a task.
    """
    rating = serializers.IntegerField(min_value=1, max_value=5)


class RecommendationRequestSerializer(serializers.Serializer):
    """
    Serializer for task recommendation requests.
    """
    difficulty = serializers.ChoiceField(
        choices=['EASY', 'MEDIUM', 'HARD'], 
        required=False, 
        allow_null=True
    )
    count = serializers.IntegerField(min_value=1, max_value=10, default=3)


class UserTaskUpdateSerializer(serializers.Serializer):
    """
    Serializer for updating task status.
    """
    action = serializers.ChoiceField(choices=['start', 'complete', 'pass'])


class DailyProgressSerializer(serializers.ModelSerializer):
    """
    Serializer for the DailyProgress model.
    """
    percentage = serializers.IntegerField(read_only=True)
    status = serializers.CharField(read_only=True)
    
    class Meta:
        model = DailyProgress
        fields = [
            'date', 'marks_earned', 'target_marks', 
            'completed', 'percentage', 'status'
        ]
        read_only_fields = ['marks_earned', 'completed', 'percentage', 'status']