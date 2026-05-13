from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,   # 🔥 TEMPORARY FIX
        blank=True
    )

    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    skill = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    salary = models.CharField(max_length=50)
    description = models.TextField()