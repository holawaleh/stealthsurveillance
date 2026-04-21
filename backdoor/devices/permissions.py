from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Allow only admin users.
    """

    message = "Only admin users can perform this action."

    def has_permission(self, request, view):
        return request.user and request.user.role == "admin"


class IsDevice(BasePermission):
    """
    Allow device authentication.
    """

    message = "Device authentication required."

    def has_permission(self, request, view):
        return hasattr(request, "user") and hasattr(request.user, "api_key")
