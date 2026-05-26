from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.shortcuts import get_object_or_404

from .models import NormalizedRecord

from audits.models import AuditLog


class DashboardStatsView(APIView):

    def get(self, request):

        total_records = NormalizedRecord.objects.count()

        flagged_records = NormalizedRecord.objects.filter(
            status="FLAGGED"
        ).count()

        scope1 = NormalizedRecord.objects.filter(
            scope="Scope 1"
        ).count()

        scope2 = NormalizedRecord.objects.filter(
            scope="Scope 2"
        ).count()

        scope3 = NormalizedRecord.objects.filter(
            scope="Scope 3"
        ).count()

        return Response({
            "total_records": total_records,
            "flagged_records": flagged_records,
            "scope1": scope1,
            "scope2": scope2,
            "scope3": scope3,
        })


@api_view(["GET"])
def recent_records(request):

    records = NormalizedRecord.objects.all().order_by("-id")[:10]

    data = []

    for record in records:

        data.append({
            "id": record.id,
            "category": record.category,
            "quantity": record.quantity,
            "scope": record.scope,
            "status": record.status,
        })

    return Response(data)


@api_view(["POST"])
def update_record_status(request, record_id):

    record = get_object_or_404(
        NormalizedRecord,
        id=record_id
    )

    status = request.data.get("status")

    if status not in [
        "APPROVED",
        "REJECTED",
    ]:
        return Response({
            "error": "Invalid status"
        }, status=400)

    record.status = status

    record.save()

    AuditLog.objects.create(
        record=record,
        action=status
    )

    return Response({
        "message": "Status updated successfully"
    })