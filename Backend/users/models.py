# # users/models.py

# from django.db import models
# from django.contrib.auth.models import User


# class Profile(models.Model):

#     user = models.OneToOneField(
#         User,
#         on_delete=models.CASCADE
#     )

#     skills = models.TextField()

#     projects = models.TextField()

#     resume = models.FileField(
#         upload_to="resumes/",
#         null=True,
#         blank=True
#     )

#     bio = models.TextField()

#     github = models.URLField(
#         null=True,
#         blank=True
#     )

#     linkedin = models.URLField(
#         null=True,
#         blank=True
#     )

#     def __str__(self):

#         return self.user.username

from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):

    ROLE_CHOICES = [

        ("user","user"),

        ("recruiter","recruiter")

    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    role = models.CharField(
        max_length=20,
        default="user"
    )

    skills = models.TextField(
        blank=True
    )

    projects = models.TextField(
        blank=True
    )

    bio = models.TextField(
        blank=True
    )

    github = models.URLField(
        blank=True
    )

    linkedin = models.URLField(
        blank=True
    )

    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True
    )

    def __str__(self):

        return self.user.username