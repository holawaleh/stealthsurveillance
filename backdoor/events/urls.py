from django.urls import path
from .views import EventCreateView, EventListView

urlpatterns = [
    path("", EventListView.as_view(), name="event-list"),
    path("create/", EventCreateView.as_view(), name="event-create"),
]
