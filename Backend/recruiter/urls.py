from django.urls import path

from .views import *

urlpatterns = [

    path(
        "dashboard/",
        recruiter_dashboard
    ),

    path(
        "jobs/",
        recruiter_jobs
    ),

    path(
        "applicants/",
        recruiter_applicants
    ),

    path(
        "update-status/<int:id>/",
        update_application_status
    ),

]