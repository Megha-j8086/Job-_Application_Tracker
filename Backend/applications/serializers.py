from rest_framework import serializers
from .models import Application


class ApplicationSerializer(
    serializers.ModelSerializer
):

    user_name =serializers.CharField(
        source="user.first_name",
        read_only=True
    )

    user_email =serializers.CharField(
        source="user.email",
        read_only=True
    )

    job_title =serializers.CharField(
        source="job.role",
        read_only=True
    )

    company =serializers.CharField(
        source="job.company",
        read_only=True
    )

    applied_at =serializers.DateTimeField(
        read_only=True
    )

    class Meta:

        model = Application

        fields = [

            "id",

            "job",

            "status",

            "applied_at",

            "user_name",

            "user_email",

            "job_title",

            "company"

        ]

    def create(self, validated_data):

        validated_data["user"] = (

            self.context[
                "request"
            ].user

        )

        return Application.objects.create(
            **validated_data
        )

