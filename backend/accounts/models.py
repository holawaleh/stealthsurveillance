from django.db import models
from django.contrib.auth.models import AbstractUser


class UserRole(models.TextChoices):
    ADMIN = "ADMIN", "Admin"
    VIEWER = "VIEWER", "Viewer"


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

    namespace = models.ForeignKey(
    "namespaces.Namespace",
    on_delete=models.CASCADE,
    related_name="users",
)


    role = models.CharField(
        max_length=10,
        choices=UserRole.choices,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
