from django.urls import path

from .views import (
    register_user,
    login_user,
    get_users,
    delete_user,
    update_user
)

urlpatterns = [

    path(
        'register/',
        register_user
    ),

    path(
        'login/',
        login_user
    ),

    path(
        '/users',
        get_users
    ),

    path(
        'delete/<int:id>/',
        delete_user
    ),
    path(
    'update/<int:id>/',
     update_user
),

]