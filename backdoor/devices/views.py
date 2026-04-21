from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Device
from .serializers import DeviceSerializer, DeviceClaimSerializer
from .permissions import IsAdmin

from django.utils import timezone
from rest_framework.exceptions import ValidationError


class DeviceClaimView(APIView):
    """
    Claim a device using provision code.
    Only admin users can claim devices.
    """

    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request):
        serializer = DeviceClaimSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        provision_code = serializer.validated_data["provision_code"]
        name = serializer.validated_data["name"]

        try:
            device = Device.objects.get(provision_code=provision_code)
        except Device.DoesNotExist:
            raise ValidationError({"error": "Invalid provision code"})

        # Prevent re-claim
        if device.is_claimed:
            raise ValidationError({"error": "Invalid provision code"})

        # Assign ownership
        device.tenant = request.user.tenant
        device.name = name
        device.is_claimed = True
        device.claimed_at = timezone.now()

        # Invalidate provision code (important)
        device.provision_code = None

        device.save()

        return Response(
            {
                "id": str(device.id),
                "name": device.name,
                "api_key": device.api_key,
            },
            status=200,
        )


class DeviceListCreateView(APIView):
    """
    List devices for the current user's tenant.
    Create a device (admin only).
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """List devices visible to this tenant."""
        devices = Device.objects.filter(tenant=request.user.tenant)
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Create a new device (admin only)."""
        # Check if user is admin
        if request.user.role != "admin":
            return Response(
                {"error": "Only admin users can create devices"}, status=403
            )

        serializer = DeviceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(tenant=request.user.tenant)

        return Response(serializer.data, status=201)
