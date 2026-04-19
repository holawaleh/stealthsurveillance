# events/models.py

import uuid
from django.db import models
from core.models import TenantScopedModel


class Event(TenantScopedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    device = models.ForeignKey(
        "devices.Device", on_delete=models.CASCADE, related_name="events", db_index=True
    )

    STATUS_CHOICES = [
        ("IN_PROGRESS", "IN_PROGRESS"),
        ("COMPLETE", "COMPLETE"),
        ("INCOMPLETE", "INCOMPLETE"),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    frame_count = models.IntegerField(default=0)

    def __str__(self):
        return f"Event {self.id}"


class Meta:
    indexes = [
        models.Index(fields=["tenant", "device", "-created_at"]),
        models.Index(fields=["tenant", "status"]),
    ]
