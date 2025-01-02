from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signUp', views.signup, name ='signUp'),
    path('signIn', views.signin, name ='signIn'),
    path('signOut', views.signout, name ='signOut'),
    path('activate/<uidb64>/<token>', views.activate, name ='activate'),



]