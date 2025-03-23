from django.urls import path
from . import views

urlpatterns = [
    # Get user's tasks and score
    path('tasks/', views.get_user_tasks, name='get_user_tasks'),
    path('score/', views.get_user_score, name='get_user_score'),
    path('generate/', views.generate_recommendations, name='generate_recommendations'),
    path('tasks/<int:task_id>/update/', views.update_task_status, name='update_task_status'),
    path('daily-progress/', views.get_daily_progress, name='get_daily_progress'),
]