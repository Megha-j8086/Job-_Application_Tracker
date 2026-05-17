from django.db import models
from django.contrib.auth.models import User
from jobs.models import Job


class Application(models.Model):

    STATUS_CHOICES = (
        ("Applied", "Applied"),
        ("Shortlisted", "Shortlisted"),
        ("Interview", "Interview"),
        ("Rejected", "Rejected"),
        ("Selected", "Selected"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="Applied"
    )

    applied_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.job.role}"