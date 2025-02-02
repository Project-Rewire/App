import json
from django.http import JsonResponse
from .models import User
from .serializers import userSerializer
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt

# create new users
@csrf_exempt
def create_User(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        data['password'] = make_password(data['password'])
        serializer = userSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

# get all users
@csrf_exempt
def get_All_Users(request):
    users = User.objects.all()
    serializer = userSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)

# delete user by id 
@csrf_exempt
def delete_User(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return JsonResponse({'message': 'The user does not exist'}, status=404)
    
    if request.method == 'DELETE':
        user.delete()
        return JsonResponse({'message': 'User deleted successfully'}, status=204)

# update user by id
@csrf_exempt
def update_User(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return JsonResponse({'message': 'The user does not exist'}, status=404)
    
    if request.method == 'PUT':
        if not request.body:
            return JsonResponse({'message': 'No data provided'}, status=400)
        
        data = json.loads(request.body)

        if 'password' in data:
            data['password'] = make_password(data['password'])

        serializer = userSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
