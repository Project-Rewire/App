from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Task, UserTask, UserScore, DailyProgress
from .serializers import UserScoreSerializer, UserTaskSerializer, UserTaskUpdateSerializer, RecommendationRequestSerializer, TaskSerializer

def complete_task(user_id, task_id):
    """
    Complete a task and update all related models.
    
    Args:
        user_id: The ID of the user completing the task
        task_id: The ID of the task being completed
        
    Returns:
        tuple: (success, message, task_data)
    """
    try:
        # Get the user task
        user_task = get_object_or_404(UserTask, user_id=user_id, task_id=task_id)
        
        # Check if the task can be completed
        if user_task.status == 'COMPLETED':
            return False, "Task is already completed", None
            
        if user_task.status not in ['NOT_STARTED', 'IN_PROGRESS']:
            return False, f"Cannot complete task with status {user_task.status}", None
        
        now = timezone.now()
        
        # Update task status
        user_task.status = 'COMPLETED'
        user_task.completed_at = now
        user_task.earned_marks = user_task.task.marks
        
        # Save the task
        user_task.save()
        
        # Update user score
        user_score, created = UserScore.objects.get_or_create(user_id=user_id)
        user_score.total_marks += user_task.earned_marks
        user_score.tasks_completed += 1
        user_score.save()
        
        # Update daily progress
        today = now.date()
        daily_progress, created = DailyProgress.objects.get_or_create(
            user_id=user_id,
            date=today,
            defaults={'target_marks': 20}
        )
        
        daily_progress.marks_earned += user_task.earned_marks
        if daily_progress.marks_earned >= daily_progress.target_marks:
            daily_progress.completed = True
        daily_progress.save()
        
        # Return the updated task data
        task_data = {
            'id': user_task.id,
            'status': user_task.status,
            'earned_marks': user_task.earned_marks,
            'completed_at': user_task.completed_at
        }
        
        return True, "Task completed successfully", task_data
        
    except Exception as e:
        return False, f"Error completing task: {str(e)}", None

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_task_status(request, task_id):
    """
    Update the status of a user's task (start, complete, or pass)
    """
    # Validate action
    serializer = UserTaskUpdateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    action = serializer.validated_data['action']
    now = timezone.now()
    
    # Get the user task
    try:
        user_task = UserTask.objects.get(task_id=task_id, user=request.user)
    except UserTask.DoesNotExist:
        return Response(
            {'error': 'Task not found for this user'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Process the action
    if action == 'start':
        if user_task.status == 'NOT_STARTED':
            user_task.status = 'IN_PROGRESS'
            user_task.started_at = now
            user_task.save()
            
            return Response(UserTaskSerializer(user_task).data)
        else:
            return Response(
                {'error': f'Cannot start task with status {user_task.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    elif action == 'complete':
        # Use the dedicated complete_task function
        success, message, task_data = complete_task(request.user.id, task_id)
        
        if success:
            # Refresh user_task to get updated data
            user_task.refresh_from_db()
            return Response(UserTaskSerializer(user_task).data)
        else:
            return Response(
                {'error': message},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    elif action == 'pass':
        if user_task.status in ['NOT_STARTED', 'IN_PROGRESS']:
            user_task.status = 'PASSED'
            user_task.save()
            return Response(UserTaskSerializer(user_task).data)
        else:
            return Response(
                {'error': f'Cannot pass task with status {user_task.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return Response(
            {'error': f'Unknown action: {action}'},
            status=status.HTTP_400_BAD_REQUEST
        )

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_tasks(request):
    """
    Get all tasks assigned to the user.
    """
    # Get filter params
    status_filter = request.query_params.get('status')
    difficulty = request.query_params.get('difficulty')
    
    # Build query
    query = Q(user=request.user)
    if status_filter:
        query &= Q(status=status_filter)
    if difficulty:
        query &= Q(task__difficulty=difficulty)
    
    user_tasks = UserTask.objects.filter(query).select_related('task').order_by('-started_at')
    serializer = UserTaskSerializer(user_tasks, many=True)
    
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_score(request):
    """
    Get the user's current score.
    """
    # Get or create user score
    user_score, created = UserScore.objects.get_or_create(user=request.user)
    serializer = UserScoreSerializer(user_score)
    
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_daily_progress(request):
    """
    Get the user's daily progress.
    """
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

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_recommendations(request):
    """
    Generate and save task recommendations for the user
    """
    # Import the serializer at the top of the file if you haven't already
    # from .serializers import RecommendationRequestSerializer

    print("Authentication classes:", request.authenticators)
    print("User authenticated:", request.user.is_authenticated)
    
    # Import the service
    from .service import RecommendationsService
    
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