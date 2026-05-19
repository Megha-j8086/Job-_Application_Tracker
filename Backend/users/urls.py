from django.urls import path

from .views import (
    register_user,
    login_user,
    save_profile,
    profile
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

    # GET PROFILE
    path(
        "profile/me/",
        profile
    ),

    # SAVE PROFILE
    path(
        "profile/save/",
        save_profile
    ),
]