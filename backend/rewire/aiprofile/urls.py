from django.urls import path
from . import views

urlpatterns = [
    path("", views.getAIProfiles),
    path("create", views.createAIProfile)
]