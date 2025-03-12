from django.contrib import admin
from .models import Task, UserTask, UserScore


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'difficulty', 'marks', 'created_at')
    list_filter = ('difficulty', 'created_at')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Task Details', {
            'fields': ('title', 'description')
        }),
        ('Classification', {
            'fields': ('difficulty', 'marks')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(UserTask)
class UserTaskAdmin(admin.ModelAdmin):
    list_display = ('user', 'task_title', 'task_difficulty', 'status', 'rating', 'started_at', 'completed_at', 'earned_marks')
    list_filter = ('status', 'task__difficulty', 'started_at', 'completed_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'task__title')
    raw_id_fields = ('user', 'task')
    readonly_fields = ('started_at', 'completed_at')
    
    def task_title(self, obj):
        return obj.task.title
    task_title.short_description = 'Task'
    
    def task_difficulty(self, obj):
        return obj.task.difficulty
    task_difficulty.short_description = 'Difficulty'
    
    fieldsets = (
        ('User & Task', {
            'fields': ('user', 'task')
        }),
        ('Status & Rating', {
            'fields': ('status', 'rating', 'earned_marks')
        }),
        ('Timestamps', {
            'fields': ('started_at', 'completed_at'),
            'classes': ('collapse',)
        }),
    )
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of completed tasks with earned marks
        if obj and obj.status == 'COMPLETED' and obj.earned_marks:
            return False
        return super().has_delete_permission(request, obj)


@admin.register(UserScore)
class UserScoreAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'total_marks', 'tasks_completed', 'last_updated')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
    readonly_fields = ('total_marks', 'tasks_completed', 'last_updated')
    raw_id_fields = ('user',)
    
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User'
    
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Statistics', {
            'fields': ('total_marks', 'tasks_completed', 'last_updated')
        }),
    )
    
    def has_add_permission(self, request):
        # UserScore objects should only be created through signals
        return False
        
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of user scores to maintain data integrity
        return False

