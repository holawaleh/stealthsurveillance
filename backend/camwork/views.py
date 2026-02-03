from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserProfileSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for user registration, profile viewing, and updates.
    """

    queryset = User.objects.all()
    serializer_class = UserProfileSerializer

    def get_permissions(self):
        """
        Allow anyone to register (create).
        Require authentication for other actions.
        """
        if self.action == "create":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        """
        Use UserSerializer for registration, UserProfileSerializer for viewing.
        """
        if self.action == "create":
            return UserSerializer
        return UserProfileSerializer

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Get current user's profile.
        Endpoint: /api/users/me/
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(
        detail=False, methods=["put", "patch"], permission_classes=[IsAuthenticated]
    )
    def update_profile(self, request):
        """
        Update current user's profile.
        Endpoint: /api/users/update_profile/
        """
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
