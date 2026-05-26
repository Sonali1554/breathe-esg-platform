from django.urls import path
from .views import (
    DashboardStatsView,
    recent_records,
    update_record_status,
)

urlpatterns = [

    path(
        "dashboard/stats/",
        DashboardStatsView.as_view()
    ),

    path(
        "records/recent/",
        recent_records
    ),

    path(
        "records/<int:record_id>/status/",
        update_record_status
    ),
]