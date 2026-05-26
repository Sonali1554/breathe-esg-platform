import csv
import io

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from companies.models import Company
from ingestion.models import DataSource
from emissions.models import RawRecord, NormalizedRecord

from services.normalization import (
    normalize_unit,
    detect_scope,
    detect_status
)


class SAPUploadView(APIView):

    def post(self, request):

        file = request.FILES.get("file")

        if not file:
            return Response(
                {"error": "CSV file required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        company, _ = Company.objects.get_or_create(
            name="Demo Company"
        )

        source = DataSource.objects.create(
            company=company,
            source_type="SAP"
        )

        decoded_file = file.read().decode("utf-8")

        csv_data = csv.DictReader(
            io.StringIO(decoded_file)
        )

        for index, row in enumerate(csv_data, start=1):

            raw_record = RawRecord.objects.create(
                source=source,
                raw_json=row,
                row_number=index
            )

            quantity = float(
                row.get("Quantity", 0)
            )

            category = row.get(
                "Fuel Type",
                "Unknown"
            )

            unit = row.get(
                "Unit",
                ""
            )

            normalized_unit = normalize_unit(unit)

            scope = detect_scope(category)

            status_value = detect_status(quantity)

            NormalizedRecord.objects.create(
                raw_record=raw_record,
                category=category,
                scope=scope,
                quantity=quantity,
                normalized_unit=normalized_unit,
                status=status_value
            )

        return Response(
            {"message": "SAP CSV uploaded successfully"}
        )
