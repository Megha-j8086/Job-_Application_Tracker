from django.urls import path

from .views import (

    register_user,

    login_user,

    save_profile,

    get_profile

)

urlpatterns = [

    path(
        "register/",
        register_user
    ),

    path(
        "login/",
        login_user
    ),

    path(
        "profile/save/",
        save_profile
    ),

    path(
        "profile/me/",
        get_profile
    ),

]