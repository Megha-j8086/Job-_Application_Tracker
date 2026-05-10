from django.db import models

# Create your models here.
class Application(models.Model):
    company = models.CharField(max_length=100)

    role = models.CharField(max_length=100)

    status = models.CharField(max_length=50)