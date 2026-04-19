# frames/models.py

import uuid
from django.db import models


class Frame(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    event = models.ForeignKey(
        "events.Event", on_delete=models.CASCADE, related_name="frames"
    )

    sequence_index = models.IntegerField()

    image_url = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("event", "sequence_index")
        indexes = [
            models.Index(fields=["event", "sequence_index"]),
        ]
