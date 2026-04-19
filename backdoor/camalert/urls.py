from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    # route to apps
    path("api/auth/", include("users.urls")),
    path("api/devices/", include("devices.urls")),
]
