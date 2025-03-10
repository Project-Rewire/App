from django.contrib import admin
from .models import Task, UserTask, UserScore


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'difficulty', 'marks', 'created_at')
    list_filter = ('difficulty',)
    search_fields = ('title', 'description')


@admin.register(UserTask)
class UserTaskAdmin(admin.ModelAdmin):
    list_display = ('user', 'task', 'status', 'rating', 'started_at', 'completed_at', 'earned_marks')
    list_filter = ('status', 'task__difficulty')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'task__title')
    raw_id_fields = ('user', 'task')


@admin.register(UserScore)
class UserScoreAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_marks', 'tasks_completed', 'last_updated')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
    raw_id_fields = ('user',)

# Register your models here.
