from rest_framework import serializers

from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):

    # JOB DETAILS
    role = serializers.CharField(
        source="job.role",
        read_only=True
    )

    company = serializers.CharField(
        source="job.company",
        read_only=True
    )

    location = serializers.CharField(
        source="job.location",
        read_only=True
    )

    class Meta:

        model = Application

        fields = [
            "id",
            "job",
            "user",
            "status",
            "role",
            "company",
            "location",
        ]

        read_only_fields = [
            "user"
        ]