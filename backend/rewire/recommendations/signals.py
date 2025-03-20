from django.db.models.signals import post_save
from django.dispatch import receiver
from core.models import User
from .models import UserTask, UserScore


@receiver(post_save, sender=User)
def create_user_score(sender, instance, created, **kwargs):
    if created:
        UserScore.objects.create(user=instance)


@receiver(post_save, sender=UserTask)
def update_user_stats(sender, instance, **kwargs):
    if instance.status == 'COMPLETED' and instance.earned_marks:
        # Get or create user score
        user_score, created = UserScore.objects.get_or_create(user=instance.user)
        
        # Update stats
        user_tasks = UserTask.objects.filter(user=instance.user, status='COMPLETED')
        
        # Calculate totals
        total_marks = sum(task.earned_marks or 0 for task in user_tasks)
        tasks_completed = user_tasks.count()
        
        # Update user score
        user_score.total_marks = total_marks
        user_score.tasks_completed = tasks_completed
        user_score.save()