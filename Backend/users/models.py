# users/models.py

from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    skills = models.TextField()

    projects = models.TextField()

    resume = models.FileField(
        upload_to="resumes/",
        null=True,
        blank=True
    )

    bio = models.TextField()

    github = models.URLField(
        null=True,
        blank=True
    )

    linkedin = models.URLField(
        null=True,
        blank=True
    )

    def __str__(self):

        return self.user.username