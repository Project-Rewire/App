from django.shortcuts import render


def index(request):
    return render(request, "rebot/index.html")

def room(request, room_name):
    return render(request, "rebot/room.html", {"room_name": room_name})