from rest_framework import serializers

from .models import Profile


class ProfileSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Profile

        fields = "__all__"

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Profile


class CustomTokenSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):

        data = super().validate(attrs)

        profile, created = Profile.objects.get_or_create(
            user=self.user
        )

        data["user"] = {
            "id": self.user.id,
            "name": self.user.first_name,
            "email": self.user.email,
            "role": profile.role,
            "is_staff": self.user.is_staff,
        }

        return data