from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):

    model = CustomUser

    # Fields to display in the user list
    list_display = [
        "username",
        "email",
        "phone_number",
        "location",
        "is_staff",
        "is_active",
    ]

    # Fields you can filter by
    list_filter = ["is_staff", "is_active", "date_joined"]

    # Fields you can search
    search_fields = ["username", "email", "phone_number", "location"]

    # How fields are organized in the user detail/edit page
    fieldsets = UserAdmin.fieldsets + (
        ("Additional Info", {"fields": ("phone_number", "location")}),
    )

    # Fields shown when creating a new user
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Additional Info", {"fields": ("phone_number", "location")}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
