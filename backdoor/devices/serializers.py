from rest_framework import serializers
from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ["id", "name", "status", "last_seen", "api_key"]
        read_only_fields = ["id", "status", "last_seen", "api_key"]
