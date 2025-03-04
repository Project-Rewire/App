from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # No special characters can have in ws url because of re_path
    re_path(r"ws/rebot/(?P<room_name>\w+)/$", consumers.RebotConsumer.as_asgi()),
]