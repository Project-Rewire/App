from typing import List, Dict, Any, Optional
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import DailyProgress, Task, UserTask, UserScore
from .service import RecommendationsService

User = get_user_model()


def generate_task_for_user(user_id: int, difficulty: Optional[str] = None) -> List[Dict[str, Any]]:
    try:
        # Get user
        user = User.objects.get(id=user_id)
        
        # Generate recommendations
        service = RecommendationsService()
        recommendations = service.generate_recommendations(
            user_id=user_id,
            difficulty=difficulty,
            count=3 
        )
        
        # Create and assign tasks
        created_tasks = []
        for rec in recommendations:
            # Create task
            task = Task.objects.create(
                title=rec['title'],
                description=rec['description'],
                difficulty=rec['difficulty'],
                marks=rec['marks']
            )
            
            # Assign to user
            UserTask.objects.create(
                user=user,
                task=task,
                status='NOT_STARTED'
            )
            
            created_tasks.append({
                'id': task.id,
                'title': task.title,
                'difficulty': task.difficulty,
                'marks': task.marks
            })
            
        return created_tasks
        
    except User.DoesNotExist:
        return []
    except Exception as e:
        print(f"Error generating tasks: {str(e)}")
        return []


def complete_task(user_id: int, task_id: int) -> bool:
    try:
        # Get user task
        user_task = UserTask.objects.get(user_id=user_id, task_id=task_id)
        
        # Update status
        if user_task.status in ['NOT_STARTED', 'IN_PROGRESS']:
            now = timezone.now()
            user_task.status = 'COMPLETED'
            user_task.completed_at = now
            user_task.earned_marks = user_task.task.marks
            user_task.save()
            
            # Update user score
            user_score, created = UserScore.objects.get_or_create(user_id=user_id)
            user_score.total_marks += user_task.earned_marks
            user_score.tasks_completed += 1
            user_score.save()
            
            # Update daily progress - matches the logic in the view
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
            
            return True
            
        return False
        
    except UserTask.DoesNotExist:
        return False
    except Exception as e:
        print(f"Error completing task: {str(e)}")
        return False


def get_user_progress(user_id: int) -> Dict[str, Any]:
    try:
        # Get user
        user = User.objects.get(id=user_id)
        
        # Get user score
        user_score, created = UserScore.objects.get_or_create(user=user)
        
        # Get task counts
        total_tasks = UserTask.objects.filter(user=user).count()
        completed_tasks = UserTask.objects.filter(user=user, status='COMPLETED').count()
        
        # Calculate progress percentage
        progress = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
        
        return {
            'user_id': user_id,
            'total_score': user_score.total_marks,
            'tasks_completed': completed_tasks,
            'total_tasks': total_tasks,
            'progress_percentage': progress,
            'last_updated': user_score.last_updated
        }
        
    except User.DoesNotExist:
        return {
            'user_id': user_id,
            'error': 'User not found'
        }
    except Exception as e:
        return {
            'user_id': user_id,
            'error': str(e)
        }