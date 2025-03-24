from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import AIProfile
from .serializers import AIProfileSerializer

@api_view(['GET'])
def getAIProfiles(request):
    profiles = AIProfile.objects.all()
    serializer = AIProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createAIProfile(request):
    serializer = AIProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateAIProfile(request, user_id):
    try:
        profile = AIProfile.objects.get(user_id=user_id)
    except AIProfile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = AIProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
