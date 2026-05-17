# recruiter/models.py

from django.db import models
from django.contrib.auth.models import User


class Recruiter(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    company_name = models.CharField(
        max_length=100
    )

    designation = models.CharField(
        max_length=100
    )

    phone = models.CharField(
        max_length=20
    )

    def __str__(self):

        return self.company_name