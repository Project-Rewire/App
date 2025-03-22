from rest_framework.response import Response
from rest_framework.decorators import api_view
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
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
