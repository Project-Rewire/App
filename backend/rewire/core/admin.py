from django.contrib import admin
from .models import User
from aiprofile.models import AIProfile

admin.site.register(User)
admin.site.register(AIProfile)



# Register your models here.
