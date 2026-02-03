from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

# Create a router and register the UserViewSet
router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    # This will create the following endpoints:
    # POST   /api/users/          - Register new user
    # GET    /api/users/          - List all users (requires auth)
    # GET    /api/users/<id>/     - Get specific user (requires auth)
    # GET    /api/users/me/       - Get current user profile (requires auth)
    # PUT    /api/users/update_profile/  - Update current user (requires auth)
    path("", include(router.urls))
]
