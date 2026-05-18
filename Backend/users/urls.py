from django.urls import path
from .views import register_user, login_view, save_profile, get_profile

urlpatterns = [
    path("register/", register_user),
    path("login/", login_view),
    path("profile/save/", save_profile),
    path("profile/me/", get_profile),
]