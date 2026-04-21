from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from devices.authentication import DeviceAuthentication
from devices.permissions import IsDevice
from devices.models import Device
from .models import Event
from .serializers import EventSerializer, EventCreateSerializer


class EventCreateView(APIView):
    """
    Device creates a motion event.
    Auth: Device API key
    """

    authentication_classes = [DeviceAuthentication]
    permission_classes = [IsDevice]

    def post(self, request):
        """
        Create a motion event.

        POST /api/events/
        Authorization: Device <api_key>

        {
            "type": "motion",
            "confidence": 92,
            "timestamp": "2026-04-19T10:35:00Z"
        }
        """
        # request.user is the Device object
        device = request.user

        serializer = EventCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create event linked to device + tenant
        event = Event.objects.create(
            device=device,
            tenant=device.tenant,  # use device's tenant
            status="IN_PROGRESS",
            **serializer.validated_data,
        )

        return Response(EventSerializer(event).data, status=201)


class EventListView(APIView):
    """
    List events for a device.
    Frontend can view; ESP32 can create.
    """

    # Support both user + device auth
    authentication_classes = [DeviceAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        List events for a specific device.
        Query param: ?device_id=<uuid>
        """
        device_id = request.query_params.get("device_id")

        if not device_id:
            return Response({"error": "device_id parameter required"}, status=400)

        try:
            device = Device.objects.get(id=device_id)
        except Device.DoesNotExist:
            return Response({"error": "Device not found"}, status=404)

        # Check tenant isolation
        if device.tenant != request.user.tenant:
            return Response({"error": "Not found"}, status=404)

        events = Event.objects.filter(device=device)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
