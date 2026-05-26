from django.db import models

from emissions.models import NormalizedRecord


class AuditLog(models.Model):

    ACTION_CHOICES = [
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]

    record = models.ForeignKey(
        NormalizedRecord,
        on_delete=models.CASCADE
    )

    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES
    )

    timestamp = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.record.category} - {self.action}"