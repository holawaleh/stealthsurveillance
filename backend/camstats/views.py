from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Camera, CameraAccess, MotionEvent
from .serializers import (
    CameraSerializer,
    CameraListSerializer,
    CameraAccessSerializer,
    InviteUserSerializer,
    MotionEventSerializer,
    MotionEventCreateSerializer,
)
from .permissions import (
    IsCameraOwner,
    IsCameraOwnerOrAdmin,
    HasCameraAccess,
    CanInviteUsers,
    CanModifySettings,
)

User = get_user_model()


class CameraViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing cameras.

    List/Retrieve: Any authenticated user can see cameras they have access to
    Create: Any authenticated user can register a new camera
    Update/Partial Update: Owner and Admin only
    Delete: Owner only
    """

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Return only cameras the user has access to.
        """
        return Camera.objects.filter(users=self.request.user).distinct()

    def get_serializer_class(self):
        """
        Use lightweight serializer for list, detailed for everything else.
        """
        if self.action == "list":
            return CameraListSerializer
        return CameraSerializer

    def get_permissions(self):
        """
        Set permissions based on action.
        """
        if self.action == "destroy":
            # Only owner can delete
            return [IsAuthenticated(), IsCameraOwner()]
        elif self.action in ["update", "partial_update"]:
            # Owner and admin can update settings
            return [IsAuthenticated(), IsCameraOwnerOrAdmin()]
        elif self.action in ["retrieve", "list"]:
            # Anyone with access can view
            return [IsAuthenticated()]
        return [IsAuthenticated()]

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAuthenticated, CanInviteUsers],
    )
    def invite_user(self, request, pk=None):
        """
        Invite a user to access this camera.
        Only owner and admin can invite.

        POST /api/cameras/{uuid}/invite_user/
        Body: {"username": "john", "role": "viewer"}
        """
        camera = self.get_object()
        serializer = InviteUserSerializer(data=request.data, context={"camera": camera})

        if serializer.is_valid():
            username = serializer.validated_data["username"]
            role = serializer.validated_data["role"]
            user = User.objects.get(username=username)

            # Create camera access
            CameraAccess.objects.create(
                camera=camera, user=user, role=role, invited_by=request.user
            )

            return Response(
                {
                    "message": f"User {username} invited as {role}",
                    "username": username,
                    "role": role,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=True,
        methods=["delete"],
        permission_classes=[IsAuthenticated, CanInviteUsers],
    )
    def remove_user(self, request, pk=None):
        """
        Remove a user's access to this camera.
        Only owner and admin can remove users.
        Owner cannot be removed.

        DELETE /api/cameras/{uuid}/remove_user/
        Body: {"username": "john"}
        """
        camera = self.get_object()
        username = request.data.get("username")

        if not username:
            return Response(
                {"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(username=username)
            access = CameraAccess.objects.get(camera=camera, user=user)

            # Prevent removing the owner
            if access.role == "owner":
                return Response(
                    {
                        "error": "Cannot remove the owner. Transfer ownership first or delete the camera."
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

            access.delete()
            return Response(
                {"message": f"User {username} access removed"},
                status=status.HTTP_200_OK,
            )

        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except CameraAccess.DoesNotExist:
            return Response(
                {"error": "User does not have access to this camera"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(
        detail=True,
        methods=["get"],
        permission_classes=[IsAuthenticated, HasCameraAccess],
    )
    def access_list(self, request, pk=None):
        """
        List all users with access to this camera.

        GET /api/cameras/{uuid}/access_list/
        """
        camera = self.get_object()
        accesses = CameraAccess.objects.filter(camera=camera)
        serializer = CameraAccessSerializer(accesses, many=True)
        return Response(serializer.data)

    @action(
        detail=True,
        methods=["patch"],
        permission_classes=[IsAuthenticated, IsCameraOwner],
    )
    def transfer_ownership(self, request, pk=None):
        """
        Transfer camera ownership to another user.
        Only current owner can transfer ownership.

        PATCH /api/cameras/{uuid}/transfer_ownership/
        Body: {"username": "newowner"}
        """
        camera = self.get_object()
        username = request.data.get("username")

        if not username:
            return Response(
                {"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            new_owner = User.objects.get(username=username)

            # Get current owner access
            current_owner_access = CameraAccess.objects.get(
                camera=camera, user=request.user, role="owner"
            )

            # Get or create new owner's access
            new_owner_access, created = CameraAccess.objects.get_or_create(
                camera=camera,
                user=new_owner,
                defaults={"role": "owner", "invited_by": request.user},
            )

            if not created:
                # Update existing access to owner
                new_owner_access.role = "owner"
                new_owner_access.save()

            # Downgrade current owner to admin
            current_owner_access.role = "admin"
            current_owner_access.save()

            return Response(
                {
                    "message": f"Ownership transferred to {username}",
                    "new_owner": username,
                },
                status=status.HTTP_200_OK,
            )

        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except CameraAccess.DoesNotExist:
            return Response(
                {"error": "You are not the owner of this camera"},
                status=status.HTTP_403_FORBIDDEN,
            )

    @action(
        detail=True,
        methods=["patch"],
        permission_classes=[IsAuthenticated, IsCameraOwnerOrAdmin],
    )
    def update_settings(self, request, pk=None):
        """
        Update camera settings (motion detection, sensitivity, etc.)
        Owner and admin can update settings.

        PATCH /api/cameras/{uuid}/update_settings/
        """
        camera = self.get_object()

        # Only allow updating specific settings fields
        allowed_fields = [
            "motion_detection_enabled",
            "motion_sensitivity",
            "snapshot_interval",
            "name",
            "description",
            "location",
        ]
        update_data = {k: v for k, v in request.data.items() if k in allowed_fields}

        serializer = CameraSerializer(
            camera, data=update_data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MotionEventViewSet(viewsets.ModelViewSet):
    """
    ViewSet for motion detection events.

    List/Retrieve: Users can see events from cameras they have access to
    Create: ESP32-CAM devices can create events (requires camera UUID)
    """

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Return motion events from cameras the user has access to.
        """
        user_cameras = Camera.objects.filter(users=self.request.user)
        return MotionEvent.objects.filter(camera__in=user_cameras).distinct()

    def get_serializer_class(self):
        """
        Use create serializer for POST, regular serializer for everything else.
        """
        if self.action == "create":
            return MotionEventCreateSerializer
        return MotionEventSerializer

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def recent(self, request):
        """
        Get recent motion events (last 24 hours).

        GET /api/motion-events/recent/
        """
        from django.utils import timezone
        from datetime import timedelta

        yesterday = timezone.now() - timedelta(days=1)
        events = self.get_queryset().filter(detected_at__gte=yesterday)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def by_camera(self, request):
        """
        Get motion events for a specific camera.

        GET /api/motion-events/by_camera/?camera_uuid=xxx-xxx-xxx
        """
        camera_uuid = request.query_params.get("camera_uuid")

        if not camera_uuid:
            return Response(
                {"error": "camera_uuid parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            camera = Camera.objects.get(uuid=camera_uuid)

            # Check if user has access to this camera
            if not CameraAccess.objects.filter(
                camera=camera, user=request.user
            ).exists():
                return Response(
                    {"error": "You do not have access to this camera"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            events = MotionEvent.objects.filter(camera=camera)
            serializer = self.get_serializer(events, many=True)
            return Response(serializer.data)

        except Camera.DoesNotExist:
            return Response(
                {"error": "Camera not found"}, status=status.HTTP_404_NOT_FOUND
            )
