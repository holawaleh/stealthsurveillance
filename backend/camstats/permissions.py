from rest_framework import permissions
from .models import CameraAccess


class IsCameraOwner(permissions.BasePermission):
    """
    Permission class to check if user is the owner of the camera.
    Owner has full control including delete.
    """

    def has_object_permission(self, request, view, obj):
        # Get the camera object
        camera = obj if hasattr(obj, "uuid") else obj.camera

        try:
            access = CameraAccess.objects.get(camera=camera, user=request.user)
            return access.role == "owner"
        except CameraAccess.DoesNotExist:
            return False


class IsCameraOwnerOrAdmin(permissions.BasePermission):
    """
    Permission class to check if user is owner or admin of the camera.
    Owner and Admin can: change settings, playback, invite others.
    """

    def has_object_permission(self, request, view, obj):
        # Get the camera object
        camera = obj if hasattr(obj, "uuid") else obj.camera

        try:
            access = CameraAccess.objects.get(camera=camera, user=request.user)
            return access.role in ["owner", "admin"]
        except CameraAccess.DoesNotExist:
            return False


class HasCameraAccess(permissions.BasePermission):
    """
    Permission class to check if user has any access to the camera.
    All roles (owner, admin, viewer) can view footage.
    """

    def has_object_permission(self, request, view, obj):
        # Get the camera object
        camera = obj if hasattr(obj, "uuid") else obj.camera

        # Check if user has any access to this camera
        return CameraAccess.objects.filter(camera=camera, user=request.user).exists()


class CanInviteUsers(permissions.BasePermission):
    """
    Permission class to check if user can invite others to a camera.
    Only owner and admin can invite users.
    """

    def has_object_permission(self, request, view, obj):
        camera = obj if hasattr(obj, "uuid") else obj.camera

        try:
            access = CameraAccess.objects.get(camera=camera, user=request.user)
            return access.role in ["owner", "admin"]
        except CameraAccess.DoesNotExist:
            return False


class CanModifySettings(permissions.BasePermission):
    """
    Permission class to check if user can modify camera settings.
    Only owner and admin can change settings.
    Safe methods (GET, HEAD, OPTIONS) are allowed for all with access.
    """

    def has_object_permission(self, request, view, obj):
        camera = obj if hasattr(obj, "uuid") else obj.camera

        # Allow read access for anyone with camera access
        if request.method in permissions.SAFE_METHODS:
            return CameraAccess.objects.filter(
                camera=camera, user=request.user
            ).exists()

        # Write access only for owner and admin
        try:
            access = CameraAccess.objects.get(camera=camera, user=request.user)
            return access.role in ["owner", "admin"]
        except CameraAccess.DoesNotExist:
            return False
