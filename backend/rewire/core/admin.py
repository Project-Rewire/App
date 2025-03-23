from django.contrib import admin
from .models import User
from aiprofile.models import AIProfile
from questionnaire.models import QuestionnaireQuestion
from community.models import Community,Post



admin.site.register(User)
admin.site.register(AIProfile)
admin.site.register(QuestionnaireQuestion)
admin.site.register(Community)
admin.site.register(Post)



# Register your models here.
