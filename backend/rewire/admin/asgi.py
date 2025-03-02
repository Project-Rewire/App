"""
ASGI config for admin project.
=============================

Note:
    If you want a separate frontend (different origin), perform one action out of following:
    - Update the ALLOWED_HOSTS in settings with the new frontend url
    - Remove the AllowedHostsOriginValidator wrapper

"""

import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from rebot.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin.settings')

application = ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        )
    ),
})