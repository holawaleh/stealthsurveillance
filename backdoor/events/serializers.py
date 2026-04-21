from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    device_name = serializers.CharField(source="device.name", read_only=True)
    device_id = serializers.UUIDField(source="device.id", read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "device",
            "device_id",
            "device_name",
            "status",
            "frame_count",
            "created_at",
        ]
        read_only_fields = ["id", "status", "frame_count", "created_at"]


class EventCreateSerializer(serializers.Serializer):
    """
    Serializer for ESP32 to create events.
    """

    type = serializers.CharField(max_length=50)  # "motion", "sound", etc
    confidence = serializers.IntegerField(min_value=0, max_value=100)
    timestamp = serializers.DateTimeField()
