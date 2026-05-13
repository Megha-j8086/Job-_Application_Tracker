from django.db import models
from django.contrib.auth.models import User


class Application(models.Model):

    user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    null=True,
    blank=True
)

    company = models.CharField(max_length=100)

    role = models.CharField(max_length=100)

    status = models.CharField(
        max_length=50,
        default="Applied"
    )