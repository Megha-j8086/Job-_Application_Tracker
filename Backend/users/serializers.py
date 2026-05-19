from rest_framework import serializers

from .models import Profile


class ProfileSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Profile

        fields = "__all__"
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data["user"] = {
            "id": self.user.id,
            "name": self.user.first_name,
            "email": self.user.email,
            "role": self.user.profile.role,
            "is_staff": self.user.is_staff,
        }

        return data