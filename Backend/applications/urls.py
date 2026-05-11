from django.urls import path

from .views import (
    applications_list,
    update_application,
    delete_application,
)

urlpatterns = [

    path(
        '',
        applications_list
    ),

    path(
        'update/<int:id>/',
        update_application
    ),

    path(
        'delete/<int:id>/',
        delete_application
    ),
]