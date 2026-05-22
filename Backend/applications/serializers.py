from rest_framework import serializers

from .models import Application


class ApplicationSerializer(
    serializers.ModelSerializer
):

    user_name = serializers.SerializerMethodField()

    user_email = serializers.SerializerMethodField()

    company = serializers.SerializerMethodField()

    job_title = serializers.SerializerMethodField()

    created_at = serializers.DateTimeField(
        read_only=True
    )

    class Meta:

        model = Application

        fields = [

            "id",

            "job",

            "status",

            "created_at",

            "user_name",

            "user_email",

            "company",

            "job_title",

        ]

        read_only_fields = [

            "created_at",

            "user_name",

            "user_email",

            "company",

            "job_title"

        ]

    def get_user_name(
        self,
        obj
    ):

        if obj.user:

            return (

                obj.user.first_name

                or

                obj.user.username

            )

        return ""

    def get_user_email(
        self,
        obj
    ):

        if obj.user:

            return obj.user.email

        return ""

    def get_company(
        self,
        obj
    ):

        if obj.job:

            return obj.job.company

        return ""

    def get_job_title(
        self,
        obj
    ):

        if obj.job:

            return obj.job.role

        return ""

    def create(
        self,
        validated_data
    ):

        validated_data["user"] = (

            self.context[
                "request"
            ].user

        )

        return super().create(
            validated_data
        )