# core/models.py

from django.db import models


class TenantScopedModel(models.Model):
    tenant = models.ForeignKey(
        "tenants.Tenant", on_delete=models.CASCADE, db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
