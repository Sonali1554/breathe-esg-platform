from django.db import models
from ingestion.models import DataSource


class RawRecord(models.Model):

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    raw_json = models.JSONField()

    row_number = models.IntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Row {self.row_number}"


class NormalizedRecord(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("FLAGGED", "Flagged"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]

    raw_record = models.ForeignKey(
        RawRecord,
        on_delete=models.CASCADE
    )

    category = models.CharField(
        max_length=100
    )

    scope = models.CharField(
        max_length=50
    )

    quantity = models.FloatField()

    normalized_unit = models.CharField(
        max_length=20
    )

    emission_factor = models.FloatField(
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.category} - {self.status}"