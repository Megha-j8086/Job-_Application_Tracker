from django.urls import path

from .views import (
    jobs_list,
    delete_job,update_job,add_job
)

urlpatterns = [

    path(
        '',
        jobs_list
    ),

    path(
        'delete/<int:id>/',
        delete_job
    ),
    path(
    'update/<int:id>/',
    update_job
),

path(
    'delete/<int:id>/',
    delete_job
),
path(
        'add/',
        add_job
    ),

]