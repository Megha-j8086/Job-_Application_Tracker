from django.db import models

# Create your models here.
class Job(models.Model):

    company = models.CharField(max_length=100)

    role = models.CharField(max_length=100)

    skill = models.CharField(max_length=100)

    location = models.CharField(max_length=100)

    salary = models.CharField(max_length=50)

    description = models.TextField()
