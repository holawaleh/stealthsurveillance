import uuid
import secrets

from django.db import models
from core.models import TenantScopedModel


def generate_api_key():
    return secrets.token_hex(32)


class Device(TenantScopedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=255)

    api_key = models.CharField(
        max_length=64, unique=True, db_index=True, blank=False, null=False
    )

    status = models.CharField(max_length=20, default="offline")

    last_seen = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.api_key:
            self.api_key = generate_api_key()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
