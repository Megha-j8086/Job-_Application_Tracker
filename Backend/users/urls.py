# from django.urls import path

# from .views import (
#     register_user,
#     login_user,
#     save_profile,
#     profile
# )

# urlpatterns = [

#     path(
#         "register/",
#         register_user
#     ),

#     path(
#         "login/",
#         login_user
#     ),

#     # GET PROFILE
#     path(
#         "profile/me/",
#         profile
#     ),

#     # SAVE PROFILE
#     path(
#         "profile/save/",
#         save_profile
#     ),
# ]

from django.urls import path

from .views import (
    register_user,
    login_user,
    profile,
    save_profile,
    register_recruiter,
    
)

urlpatterns = [

    path("register/", register_user),

    path("login/", login_user),

    path("profile/", profile),

    path("profile/save/", save_profile),

   
    path(
    "register-recruiter/",
    register_recruiter
),

]