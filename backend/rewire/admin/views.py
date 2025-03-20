import json
import uuid
import time
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from core.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.cache import cache

# Cache timeout for temporary user data (1 hour in seconds)
TEMP_USER_CACHE_TIMEOUT = 60 * 60

@api_view(['POST'])
@csrf_exempt
def signup_step_one(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            first_name = data['first_name']
            last_name = data['last_name']
            user_name = data['user_name']
            
            if User.objects.filter(user_name=user_name).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            
            # Generate a unique ID
            temp_user_id = str(uuid.uuid4())
            
            # Store data in cache instead of session
            cache_data = {
                'first_name': first_name,
                'last_name': last_name,
                'user_name': user_name,
                'timestamp': time.time()  # For potential expiry check
            }
            
            # Save to cache with expiration
            cache.set(f'signup_data_{temp_user_id}', cache_data, TEMP_USER_CACHE_TIMEOUT)
            
            # Return the temporary ID to the client
            return JsonResponse({
                'message': 'Step one completed successfully',
                'temp_user_id': temp_user_id
            }, status=200)
        except KeyError:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    
@api_view(['POST'])
@csrf_exempt
def signup_step_two(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data['email']
            password = data['password']
            confirm_password = data['confirm_password']
            temp_user_id = data.get('temp_user_id')
            
            if password != confirm_password:
                return JsonResponse({'error': 'Passwords do not match'}, status=400)
            
            # Get data from cache instead of session
            cache_key = f'signup_data_{temp_user_id}'
            signup_data = cache.get(cache_key)
            
            # Debug logging
            print(f"Received temp_user_id: {temp_user_id}")
            print(f"Cache data found: {signup_data is not None}")
            
            if not signup_data:
                return JsonResponse({'error': 'Invalid or expired temporary user ID'}, status=400)
            
            # Create the user
            user = User.objects.create(
                first_name=signup_data['first_name'],
                last_name=signup_data['last_name'],
                user_name=signup_data['user_name'],
                email=email,
                password=make_password(password)
            )
            
            user.save()
            
            # Delete the temporary data from cache
            cache.delete(cache_key)
            
            return JsonResponse({'message': 'User created successfully', 'user_id': user.id}, status=201)
        except KeyError as e:
            print(f"KeyError in signup_step_two: {e}")
            return JsonResponse({'error': f'Invalid data: missing {e}'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@api_view(['POST'])
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data['email']
            password = data['password']
            
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid email or password'}, status=400)
        except KeyError:
            return JsonResponse({'error': 'Invalid data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@api_view(['DELETE']) 
@csrf_exempt
def delete_user(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            email = data['email']
            
            user = User.objects.filter(email=email).first()
            if user:
                user.delete()
                return JsonResponse({'message': 'User deleted successfully'}, status=200)
            else:
                return JsonResponse({'error': 'User not found'}, status=404)
        except KeyError:
            return JsonResponse({'error': 'Invalid data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@api_view(['PUT'])
@csrf_exempt
def update_user(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            email = data['email']
            update_fields = data.get('update_fields', {})

            user = User.objects.filter(email=email).first()

            if user:
                for field, value in update_fields.items():
                    if field == 'password':
                        value = make_password(value)
                    setattr(user, field, value)
                    user.save()
                    return JsonResponse({'message': 'User updated successfully'}, status=200)
            else:
                return JsonResponse({'error': 'User not found'}, status=404)
        except KeyError:
            return JsonResponse({'error': 'Invalid data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@api_view(['POST'])    
@csrf_exempt
def forget_password(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data['email']

            if not User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email does not exist'}, status=404)
    
            user = User.objects.filter(email=email).first()
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = f"http://localhost:8000/reset_password/{uid}/{token}/"

            send_mail(
                'Reset your password for rewire',
                f'Click the link to reset your password: {reset_link}',
                'app.rewire@gmail.com',
                [email],
                fail_silently=False
            )
            return JsonResponse({'message': 'Password reset link sent to email'}, status=200)
        
        except KeyError:
            return JsonResponse({'error': 'Invalid data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@api_view(['POST'])        
@csrf_exempt
def reset_password(request, uidb64, token):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_password = data['new_password']
            
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            
            if default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return JsonResponse({'message': 'Password reset successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid token'}, status=400)
        except KeyError:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)