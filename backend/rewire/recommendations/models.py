from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import User

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    DIFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard'),
    ]
    
    difficulty = models.CharField(max_length=10, choices = DIFICULTY_CHOICES)
    marks = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)

    def ___str__(self):
        return f"{self.title} ({self.get_difficulty_display()})"
    

class UserTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_tasks')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='assigned_users')

    STATUS_CHOICES = [
        ('NOT_STARTED', 'Not Started'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('PASSED', 'Passed'),
    ]

    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='NOT_STARTED')
    rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    earned_marks = models.IntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'task')

    def __str__(self):
        return f"{self.user.email} - {self.task.title} - {self.get_status_display()}"
    

class UserScore(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='score')
    total_marks = models.IntegerField(default=0)
    tasks_completed = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.email} - {self.total_marks} marks"
