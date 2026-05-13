from django.urls import path

from .views import (
    applications_list,
    delete_application,
    update_application
)

urlpatterns = [

    path(
        '',
        applications_list
    ),

    path(
        'delete/<int:id>/',
        delete_application
    ),

    path(
        'update/<int:id>/',
        update_application
    ),
]