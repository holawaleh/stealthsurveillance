from django.urls import path
from .views import DeviceListCreateView
from .views import DeviceClaimView

urlpatterns = [
    path("", DeviceListCreateView.as_view(), name="devices"),
    path("claim/", DeviceClaimView.as_view(), name="device-claim"),
]
