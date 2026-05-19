# from rest_framework import serializers
# from .models import Job

# class JobSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Job
#         fields = '__all__'
         

from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job

        fields = [
            "id",
            "company",
            "role",
            "skill",
            "experience",
            "location",
            "salary",
            "description",
            "created_at",
            "recruiter"
        ]

        # IMPORTANT FIX
        extra_kwargs = {
            "recruiter": {
                "required": False
            }
        }

        # IMPORTANT FIX
        read_only_fields = [
            "recruiter"
        ]