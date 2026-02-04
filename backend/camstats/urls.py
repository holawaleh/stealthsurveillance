from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CameraViewSet, MotionEventViewSet

# Create a router and register viewsets
router = DefaultRouter()
router.register(r"cameras", CameraViewSet, basename="camera")
router.register(r"motion-events", MotionEventViewSet, basename="motion-event")

urlpatterns = [
    # Router URLs will create:
    #
    # Camera endpoints:
    # GET    /api/cameras/                          - List user's cameras
    # POST   /api/cameras/                          - Register new camera
    # GET    /api/cameras/{uuid}/                   - Get camera details
    # PUT    /api/cameras/{uuid}/                   - Update camera (owner/admin)
    # PATCH  /api/cameras/{uuid}/                   - Partial update camera (owner/admin)
    # DELETE /api/cameras/{uuid}/                   - Delete camera (owner only)
    #
    # Camera custom actions:
    # POST   /api/cameras/{uuid}/invite_user/       - Invite user to camera (owner/admin)
    # DELETE /api/cameras/{uuid}/remove_user/       - Remove user access (owner/admin)
    # GET    /api/cameras/{uuid}/access_list/       - List users with access
    # PATCH  /api/cameras/{uuid}/transfer_ownership/ - Transfer ownership (owner only)
    # PATCH  /api/cameras/{uuid}/update_settings/   - Update camera settings (owner/admin)
    #
    # Motion Event endpoints:
    # GET    /api/motion-events/                    - List motion events from user's cameras
    # POST   /api/motion-events/                    - Create motion event (ESP32-CAM)
    # GET    /api/motion-events/{id}/               - Get specific event
    # GET    /api/motion-events/recent/             - Get events from last 24 hours
    # GET    /api/motion-events/by_camera/?camera_uuid=xxx - Get events for specific camera
    path("", include(router.urls)),
]
