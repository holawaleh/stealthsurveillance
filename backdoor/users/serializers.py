from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model
from tenants.models import Tenant

User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    tenant_name = serializers.CharField()

    phone_number = serializers.CharField()
    area = serializers.CharField()

    def create(self, validated_data):
        tenant = Tenant.objects.create(name=validated_data["tenant_name"])

        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            tenant=tenant,
            role="admin",
            phone_number=validated_data["phone_number"],
            area=validated_data["area"],
        )

        return user


class MeSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source="tenant.name", read_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "role", "tenant_name", "phone_number", "area"]
