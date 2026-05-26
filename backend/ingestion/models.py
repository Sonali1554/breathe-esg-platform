from django.db import models
from companies.models import Company


class DataSource(models.Model):

    SOURCE_TYPES = [
        ("SAP", "SAP"),
        ("UTILITY", "Utility"),
        ("TRAVEL", "Travel"),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=50,
        choices=SOURCE_TYPES
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.company.name} - {self.source_type}"
