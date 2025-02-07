"""
URL configuration for admin project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import signup_step_one, signup_step_two, login_user, delete_user, update_user, forget_password, reset_password

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/step-one', signup_step_one),
    path('signup/step-two', signup_step_two),
    path('login', login_user),
    path('delete-user', delete_user),
    path('update-user', update_user),
    path('forget-password', forget_password),
    path('reset-password', reset_password),
]

