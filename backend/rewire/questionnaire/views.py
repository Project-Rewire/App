from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import QuestionnaireQuestion
from .serializers import QuestionnaireQuestionSerializer

@api_view(['GET'])
def getQuestions(request):
    questions = QuestionnaireQuestion.objects.all()
    serializer = QuestionnaireQuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def postQuestion(request):
    serializer = QuestionnaireQuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
