from datetime import datetime
from django.shortcuts import redirect, render
from django.contrib.auth.models import User 
from django.contrib import messages
from django.contrib. auth import authenticate, login, logout
from core import settings
from django.core.mail import send_mail, EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from . tokens import generate_token
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .models import userCollection


# Create your views here.
def home(request):
    return render(request, "authentication/index.html")

def signup(request):
    if request.method == "POST":
        # username = request.POST.get('username')
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        # if User.objects.filter(username=username):
        #     messages.error (request, "Username already exist Please try some other username") 
        #     return redirect('home')
        
        # if User.objects.filter(email=email):
        #     messages.error (request, "Email already registered")
        #     return redirect('home')
        
        if len(username) > 10:
            messages.error(request, "username must be under 10 characters")
 
        if pass1 != pass2:
            messages.error(request, "password didn't match")
 

        newUser = User.objects.create_user(username, email, pass1)
        newUser.first_name = fname
        newUser.last_name = lname
        newUser.is_active  = False

        newUser.save()

        # saving user data into mongodb
        user_data = { 
            'django_user_id': str(newUser.id),
            'username' : username,
            'email' : email,
            'first_name': fname,
            'last_name': lname,
            'created_at': datetime.utcnow(),
            'is_active': False
        }
        try:
            userCollection.insert_one(user_data)
        except Exception as e:
            newUser.delete()
            messages.error(request, "Account creation failed, please try again")
            return redirect('home')

        messages.success(request, "Account created successfully! we have sent you a confirmation email. please confirm your email in order to activate your account")

        # welcome email

        subject = 'welcome to rewire'
        message = 'Hello, '+ newUser.username + "!! \n"+ "we, team rewire exited to have you with us. please confirm your email address in order to activate your rewire account.\n\n Thank you!\n team rewire"
        from_email = settings.EMAIL_HOST_USER
        to_list = [newUser.email]
        send_mail(subject, message, from_email, to_list, fail_silently=False)

        # confirmation email
        current_site = get_current_site(request)
        email_subject = 'Confirm your email at REWIRE'
        message2 = render_to_string('authentication/email_confirmation.html',{
            'name': newUser.first_name,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(newUser.pk)),
            'token': generate_token.make_token(newUser),
        })
        email = EmailMessage(
            email_subject,
            message2,
            settings.EMAIL_HOST_USER,
            [newUser.email],
        )
        email.fail_silently = True
        email.send()
        return redirect('signIn')
    
    return render(request, "authentication/signUp.html")


def signin(request):

    if request.method == "POST":
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(username=username, password=pass1)

        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "authentication/index.html", {'fname':fname})
        else:
            messages.error(request, "Wrong Credentials")
            return render(request, "authentication/signIn.html")
            # return redirect('home')

    return render(request, "authentication/signIn.html")

def signout(request):
    logout(request)
    messages.success(request, "logout successfully")
    return redirect('home')


def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        newUser = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        newUser.none


    if newUser is not None and generate_token.check_token(newUser, token):
        newUser.is_active = True
        newUser.save()

        userCollection.update_one({'django_user_id': str(newUser.id)}, {'$set': {'is_active': True}})

        login(request, newUser)
        return redirect('home')
    else:
        return render(request, 'activation_failed.html ')
    


    
