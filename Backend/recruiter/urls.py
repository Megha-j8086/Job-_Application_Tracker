from django.urls import path

from .views import (

    add_job,
    recruiter_jobs,
    recruiter_applications,
    update_application_status

)

urlpatterns = [

    path(
        "jobs/add/",
        add_job
    ),

    path(
        "jobs/",
        recruiter_jobs
    ),

    path(
        "applications/",
        recruiter_applications
    ),

    path(
        "applications/update/<int:id>/",
        update_application_status
    ),

]