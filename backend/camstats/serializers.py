from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Camera, CameraAccess, MotionEvent

User = get_user_model()


class CameraAccessSerializer(serializers.ModelSerializer):
    """
    Serializer for CameraAccess model.
    Shows which users have access to a camera and their roles.
    """

    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)
    invited_by_username = serializers.CharField(
        source="invited_by.username", read_only=True
    )

    class Meta:
        model = CameraAccess
        fields = [
            "id",
            "user",
            "username",
            "email",
            "role",
            "invited_by",
            "invited_by_username",
            "invited_at",
        ]
        read_only_fields = ["invited_by", "invited_at"]


class CameraSerializer(serializers.ModelSerializer):
    """
    Serializer for Camera model.
    MAC address is write-only for security (only used during registration).
    UUID is used for all public identification.
    """

    # MAC address only accepted during creation, never exposed
    mac_address = serializers.CharField(write_only=True)

    # Show camera access information
    camera_access = CameraAccessSerializer(many=True, read_only=True)
    owner = serializers.SerializerMethodField()
    user_role = serializers.SerializerMethodField()

    class Meta:
        model = Camera
        fields = [
            "id",
            "uuid",
            "mac_address",
            "name",
            "description",
            "location",
            "motion_detection_enabled",
            "motion_sensitivity",
            "snapshot_interval",
            "is_online",
            "last_seen",
            "battery_level",
            "camera_access",
            "owner",
            "user_role",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "uuid",
            "is_online",
            "last_seen",
            "created_at",
            "updated_at",
        ]

    def get_owner(self, obj):
        """Get the username of the camera owner."""
        owner = obj.get_owner()
        return owner.username if owner else None

    def get_user_role(self, obj):
        """Get the current user's role for this camera."""
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            try:
                access = CameraAccess.objects.get(camera=obj, user=request.user)
                return access.role
            except CameraAccess.DoesNotExist:
                return None
        return None

    def create(self, validated_data):
        """
        Create a camera and automatically assign the creator as owner.
        """
        user = self.context["request"].user
        camera = Camera.objects.create(**validated_data)

        # Automatically create owner access for the creator
        CameraAccess.objects.create(
            camera=camera, user=user, role="owner", invited_by=user
        )

        return camera


class CameraListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for listing cameras (without full access details).
    """

    owner = serializers.SerializerMethodField()
    user_role = serializers.SerializerMethodField()

    class Meta:
        model = Camera
        fields = [
            "id",
            "uuid",
            "name",
            "location",
            "is_online",
            "owner",
            "user_role",
            "created_at",
        ]

    def get_owner(self, obj):
        owner = obj.get_owner()
        return owner.username if owner else None

    def get_user_role(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            try:
                access = CameraAccess.objects.get(camera=obj, user=request.user)
                return access.role
            except CameraAccess.DoesNotExist:
                return None
        return None


class InviteUserSerializer(serializers.Serializer):
    """
    Serializer for inviting users to access a camera.
    """

    username = serializers.CharField()
    role = serializers.ChoiceField(
        choices=["admin", "viewer"]
    )  # Owner cannot be assigned via invite

    def validate_username(self, value):
        """Ensure the user exists."""
        try:
            User.objects.get(username=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found.")
        return value

    def validate(self, attrs):
        """Ensure user is not already invited to this camera."""
        camera = self.context.get("camera")
        username = attrs.get("username")
        user = User.objects.get(username=username)

        if CameraAccess.objects.filter(camera=camera, user=user).exists():
            raise serializers.ValidationError("User already has access to this camera.")

        return attrs


class MotionEventSerializer(serializers.ModelSerializer):
    """
    Serializer for MotionEvent model.
    """

    camera_name = serializers.CharField(source="camera.name", read_only=True)
    camera_uuid = serializers.UUIDField(source="camera.uuid", read_only=True)

    class Meta:
        model = MotionEvent
        fields = [
            "id",
            "camera",
            "camera_name",
            "camera_uuid",
            "detected_at",
            "snapshot_url",
            "video_url",
            "confidence",
            "duration",
            "notified_users",
        ]
        read_only_fields = ["detected_at"]


class MotionEventCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for ESP32-CAM to create motion events.
    Uses camera UUID instead of ID for security.
    """

    camera_uuid = serializers.UUIDField(write_only=True)

    class Meta:
        model = MotionEvent
        fields = ["camera_uuid", "snapshot_url", "video_url", "confidence", "duration"]

    def validate_camera_uuid(self, value):
        """Ensure the camera exists."""
        try:
            Camera.objects.get(uuid=value)
        except Camera.DoesNotExist:
            raise serializers.ValidationError("Camera not found.")
        return value

    def create(self, validated_data):
        """Create motion event and link to camera."""
        camera_uuid = validated_data.pop("camera_uuid")
        camera = Camera.objects.get(uuid=camera_uuid)

        motion_event = MotionEvent.objects.create(camera=camera, **validated_data)

        # Get all users with access to this camera for notification
        users_to_notify = User.objects.filter(camera_access__camera=camera)
        motion_event.notified_users.set(users_to_notify)

        return motion_event
