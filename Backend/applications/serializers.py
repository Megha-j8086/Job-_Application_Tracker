from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):

    company = serializers.CharField(source="job.company", read_only=True)
    role = serializers.CharField(source="job.role", read_only=True)
    user_name = serializers.CharField(source="user.first_name", read_only=True)

    class Meta:
        model = Application
        fields = "__all__"
        read_only_fields = ["user"]   # ✅ ADD THIS