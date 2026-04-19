from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .models import Device


class DeviceAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None  # let other auth methods run

        try:
            prefix, api_key = auth_header.split(" ")
        except ValueError:
            raise AuthenticationFailed("Invalid Authorization header format")

        if prefix != "Device":
            return None  # not device auth

        try:
            device = Device.objects.get(api_key=api_key)
        except Device.DoesNotExist:
            raise AuthenticationFailed("Invalid API key")

        return (device, None)
