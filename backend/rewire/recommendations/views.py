from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Task, UserTask, UserScore
from .serializers import (
    TaskSerializer, UserTaskSerializer, UserScoreSerializer,
    TaskRatingSerializer, RecommendationRequestSerializer, UserTaskUpdateSerializer
)
from .service import RecommendationsService
from .models import DailyProgress

# Get all tasks assigned to the user
@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_tasks(request):
    # Get filter params
    status_filter = request.query_params.get('status')
    difficulty = request.query_params.get('difficulty')
    
    # Build query
    query = Q(user=request.user)
    if status_filter:
        query &= Q(status=status_filter)
    if difficulty:
        query &= Q(task__difficulty=difficulty)
    
    user_tasks = UserTask.objects.filter(query).select_related('task').order_by('-created_at')
    serializer = UserTaskSerializer(user_tasks, many=True)
    
    return Response(serializer.data)


# Get the user's current score
@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_score(request):
    
    # Get or create user score
    user_score, created = UserScore.objects.get_or_create(user=request.user)
    serializer = UserScoreSerializer(user_score)
    
    return Response(serializer.data)


# Generate and save task recommendations for the user
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_recommendations(request):
    
    # Validate request
    serializer = RecommendationRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Get parameters
    difficulty = serializer.validated_data.get('difficulty')
    count = serializer.validated_data.get('count')
    
    # Generate recommendations
    service = RecommendationsService()
    recommendations = service.generate_recommendations(
        user_id=request.user.id,
        difficulty=difficulty,
        count=count
    )
    
    # Save recommendations as tasks and assign to user
    created_tasks = []
    for rec in recommendations:
        # Create the task
        task = Task.objects.create(
            title=rec['title'],
            description=rec['description'],
            difficulty=rec['difficulty'],
            marks=rec['marks']
        )
        
        # Assign to user
        UserTask.objects.create(
            user=request.user,
            task=task,
            status='NOT_STARTED'
        )
        
        created_tasks.append(task)
    
    # Return the created tasks
    task_serializer = TaskSerializer(created_tasks, many=True)
    return Response(task_serializer.data, status=status.HTTP_201_CREATED)


# Update the status of a user's task (start, complete, or pass)
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_task_status(request, task_id):
    
    # Get the user task
    user_task = get_object_or_404(UserTask, task_id=task_id, user=request.user)
    
    # Validate action
    serializer = UserTaskUpdateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    action = serializer.validated_data['action']
    now = timezone.now()
    
    # Process the action
    if action == 'start':
        if user_task.status == 'NOT_STARTED':
            user_task.status = 'IN_PROGRESS'
            user_task.started_at = now
            user_task.save()
        else:
            return Response(
                {'error': f'Cannot start task with status {user_task.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    elif action == 'complete':
        if user_task.status in ['NOT_STARTED', 'IN_PROGRESS']:
            user_task.status = 'COMPLETED'
            user_task.completed_at = now
            user_task.earned_marks = user_task.task.marks
            user_task.save()
            
            # Update user score
            user_score, created = UserScore.objects.get_or_create(user=request.user)
            user_score.total_marks += user_task.earned_marks
            user_score.tasks_completed += 1
            user_score.save()

            today = timezone.now().date()
            daily_progress, created = DailyProgress.objects.get_or_create(
                user=request.user,
                date=today,
                defaults={'target_marks': 20}
            )
            daily_progress.marks_earned += user_task.earned_marks
            if daily_progress.marks_earned >= daily_progress.target_marks:
                daily_progress.completed = True
            daily_progress.save()

        else:
            return Response(
                {'error': f'Cannot complete task with status {user_task.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    elif action == 'pass':
        if user_task.status in ['NOT_STARTED', 'IN_PROGRESS']:
            user_task.status = 'PASSED'
            user_task.save()
        else:
            return Response(
                {'error': f'Cannot pass task with status {user_task.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    serializer = UserTaskSerializer(user_task)
    return Response(serializer.data)


# Rate a task that the user has completed
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_task(request, task_id):
    
    # Get the user task
    user_task = get_object_or_404(UserTask, task_id=task_id, user=request.user)
    
    # Check if task is completed
    if user_task.status != 'COMPLETED':
        return Response(
            {'error': 'Only completed tasks can be rated'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validate rating
    serializer = TaskRatingSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Update rating
    user_task.rating = serializer.validated_data['rating']
    user_task.save()
    
    return Response(UserTaskSerializer(user_task).data)


# Get analytics about user's tasks and progress
@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_task_analytics(request):
    
    # Get user tasks
    user_tasks = UserTask.objects.filter(user=request.user)
    
    # Get user score
    user_score, created = UserScore.objects.get_or_create(user=request.user)
    
    # Calculate analytics
    total_tasks = user_tasks.count()
    completed_tasks = user_tasks.filter(status='COMPLETED').count()
    in_progress_tasks = user_tasks.filter(status='IN_PROGRESS').count()
    not_started_tasks = user_tasks.filter(status='NOT_STARTED').count()
    passed_tasks = user_tasks.filter(status='PASSED').count()
    
    # Calculate difficulty distribution
    easy_tasks = user_tasks.filter(task__difficulty='EASY').count()
    medium_tasks = user_tasks.filter(task__difficulty='MEDIUM').count()
    hard_tasks = user_tasks.filter(task__difficulty='HARD').count()
    
    # Calculate completion rate by difficulty
    easy_completed = user_tasks.filter(task__difficulty='EASY', status='COMPLETED').count()
    medium_completed = user_tasks.filter(task__difficulty='MEDIUM', status='COMPLETED').count()
    hard_completed = user_tasks.filter(task__difficulty='HARD', status='COMPLETED').count()
    
    # Prepare response
    analytics = {
        'total_score': user_score.total_marks,
        'tasks_completed': completed_tasks,
        'total_tasks': total_tasks,
        'completion_rate': (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0,
        
        'task_status': {
            'completed': completed_tasks,
            'in_progress': in_progress_tasks,
            'not_started': not_started_tasks,
            'passed': passed_tasks
        },
        
        'difficulty_distribution': {
            'easy': easy_tasks,
            'medium': medium_tasks,
            'hard': hard_tasks
        },
        
        'completion_by_difficulty': {
            'easy': {
                'completed': easy_completed,
                'total': easy_tasks,
                'rate': (easy_completed / easy_tasks * 100) if easy_tasks > 0 else 0
            },
            'medium': {
                'completed': medium_completed,
                'total': medium_tasks,
                'rate': (medium_completed / medium_tasks * 100) if medium_tasks > 0 else 0
            },
            'hard': {
                'completed': hard_completed,
                'total': hard_tasks,
                'rate': (hard_completed / hard_tasks * 100) if hard_tasks > 0 else 0
            }
        }
    }
    
    return Response(analytics)

# update daily progress
@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_daily_progress(request):
    today = timezone.now().date()
    daily_progress, created = DailyProgress.objects.get_or_create(
        user=request.user,
        date=today,
        defaults={'target_marks': 20}
    )
    
    return Response({
        'date': daily_progress.date,
        'marks_earned': daily_progress.marks_earned,
        'target_marks': daily_progress.target_marks,
        'percentage': daily_progress.percentage,
        'completed': daily_progress.completed,
        'status': daily_progress.status
    })
