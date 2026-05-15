from django.urls import path

from .views import *

urlpatterns = [

    # USERS
    path(
        'users/',
        get_users
    ),

    path(
        'users/update/<int:id>/',
        update_user
    ),

    path(
        'users/delete/<int:id>/',
        delete_user
    ),

    # JOBS
    path(
        'jobs/',
        get_jobs
    ),

    path(
        'jobs/add/',
        add_job
    ),

    path(
        'jobs/update/<int:id>/',
        update_job
    ),

    path(
        'jobs/delete/<int:id>/',
        delete_job
    ),

    # APPLICATIONS
    path(
        'applications/',
        get_applications
    ),

    path(
        'applications/update/<int:id>/',
        update_application
    ),
]