from django.contrib import admin
from .models import User

"""
Registers the data models created in the rewire_admin application to admin site
"""

admin.site.register(User)