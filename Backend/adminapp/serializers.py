from rest_framework import serializers

from django.contrib.auth.models import User

from jobs.models import Job

from applications.models import Application


# USER SERIALIZER
class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [
            "id",
            "first_name",
            "email",
            "is_staff",
        ]


# JOB SERIALIZER
class JobSerializer(serializers.ModelSerializer):

    class Meta:

        model = Job

        fields = "__all__"


# APPLICATION SERIALIZER
class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:

        model = Application

        fields = "__all__"