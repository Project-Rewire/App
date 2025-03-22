from django.contrib import admin
from .models import User
from aiprofile.models import AIProfile
from questionnaire.models import QuestionnaireQuestion

admin.site.register(User)
admin.site.register(AIProfile)
admin.site.register(QuestionnaireQuestion)



# Register your models here.
