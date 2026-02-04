import uuid
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Camera(models.Model):
    """
    Represents an ESP32-CAM device.
    Uses UUID for public identification, MAC address stored securely in backend.
    """

    # Unique identifiers
    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, db_index=True
    )
    mac_address = models.CharField(
        max_length=17,
        unique=True,
        db_index=True,
        help_text="MAC address of ESP32-CAM (format: XX:XX:XX:XX:XX:XX)",
    )

    # User-defined fields
    name = models.CharField(
        max_length=100, help_text="Custom name for the camera (e.g., 'Living Room Cam')"
    )
    description = models.TextField(blank=True, null=True)
    location = models.CharField(
        max_length=255, blank=True, null=True, help_text="Physical location of camera"
    )

    # Camera settings
    motion_detection_enabled = models.BooleanField(default=True)
    motion_sensitivity = models.IntegerField(
        default=80, help_text="Motion detection sensitivity (0-100)"
    )
    snapshot_interval = models.IntegerField(
        default=300, help_text="Snapshot interval in seconds (0 = disabled)"
    )

    # Status fields
    is_online = models.BooleanField(default=False)
    last_seen = models.DateTimeField(null=True, blank=True)
    battery_level = models.IntegerField(
        null=True, blank=True, help_text="Battery percentage (if applicable)"
    )

    # Relationship to users (many-to-many through CameraAccess)

    users = models.ManyToManyField(
        User,
        through="CameraAccess",
        through_fields=("camera", "user"),
        related_name="cameras",
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Camera"
        verbose_name_plural = "Cameras"

    def __str__(self):
        return f"{self.name} ({self.uuid})"

    def get_owner(self):
        """Returns the user who owns this camera."""
        try:
            return self.camera_access.get(role="owner").user
        except CameraAccess.DoesNotExist:
            return None


class CameraAccess(models.Model):
    """
    Intermediate model that defines which users have access to which cameras
    and what role they have (owner, admin, viewer).
    """

    ROLE_CHOICES = [
        ("owner", "Owner"),  # Full control: delete, change settings, playback, invite
        ("admin", "Admin"),  # Can change settings, playback, invite (cannot delete)
        ("viewer", "Viewer"),  # Can only view footage
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="camera_roles"
    )
    camera = models.ForeignKey(
        Camera, on_delete=models.CASCADE, related_name="camera_list"
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    # Invitation tracking
    invited_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="camera_invitation_sent",
    )
    invited_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [
            "user",
            "camera",
        ]  # Each user can only have one role per camera
        ordering = ["camera", "role"]
        verbose_name = "Camera Access"
        verbose_name_plural = "Camera Access"

    def __str__(self):
        return f"{self.user.username} - {self.camera.name} ({self.role})"


class MotionEvent(models.Model):
    """
    Records motion detection events from cameras.
    """

    camera = models.ForeignKey(
        Camera, on_delete=models.CASCADE, related_name="motion_events"
    )
    detected_at = models.DateTimeField(auto_now_add=True)
    snapshot_url = models.URLField(
        blank=True, null=True, help_text="URL to snapshot image"
    )
    video_url = models.URLField(
        blank=True, null=True, help_text="URL to recorded video clip"
    )

    # Event details
    confidence = models.IntegerField(
        default=0, help_text="Motion detection confidence (0-100)"
    )
    duration = models.IntegerField(
        null=True, blank=True, help_text="Duration of motion in seconds"
    )

    # Notification tracking
    notified_users = models.ManyToManyField(
        User, blank=True, related_name="motion_notifications"
    )

    class Meta:
        ordering = ["-detected_at"]
        verbose_name = "Motion Event"
        verbose_name_plural = "Motion Events"

    def __str__(self):
        return f"Motion detected: {self.camera.name} at {self.detected_at}"
