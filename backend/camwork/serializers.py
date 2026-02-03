from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration and profile viewing.
    Includes all CustomUser fields.
    """

    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
        label="Confirm Password",
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "password2",
            "phone_number",
            "location",
            "first_name",
            "last_name",
        ]
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": True}}

    def validate(self, attrs):
        """
        Validate that password and password2 match.
        """
        if attrs.get("password") != attrs.get("password2"):
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        """
        Create and return a new user with encrypted password.
        """
        # Remove password2 as it's not part of the model
        validated_data.pop("password2")

        # Create user with create_user method to properly hash the password
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            phone_number=validated_data.get("phone_number", ""),
            location=validated_data.get("location", ""),
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for viewing user profile (no password).
    """

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "phone_number",
            "location",
            "first_name",
            "last_name",
            "date_joined",
        ]
        read_only_fields = ["id", "username", "date_joined"]
