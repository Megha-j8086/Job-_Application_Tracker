from django.db import models

class Application(models.Model):
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.role