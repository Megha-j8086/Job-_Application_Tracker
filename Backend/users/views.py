from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from recruiter.models import Recruiter
from .models import Profile
from .serializers import ProfileSerializer


# =========================
# REGISTER
# =========================
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):

    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")

    if not name or not email or not password:

        return Response(
            {"error": "All fields required"},
            status=400
        )

    if User.objects.filter(
        username=email
    ).exists():

        return Response(
            {"error": "User already exists"},
            status=400
        )

    try:

        validate_password(password)

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=400
        )

    user = User.objects.create_user(

        username=email,
        email=email,
        password=password,
        first_name=name

    )

    return Response({

        "message":
        "User created successfully"

    })


# =========================
# # LOGIN
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response

# @api_view(["POST"])
# def login_view(request):

#     email = request.data.get("email")
#     password = request.data.get("password")

#     try:
#         user = User.objects.get(email=email)

#     except User.DoesNotExist:

#         return Response(
#             {"error": "User not found"},
#             status=404
#         )

#     auth_user = authenticate(
#         username=user.username,
#         password=password
#     )

#     if auth_user is None:

#         return Response(
#             {"error": "Wrong password"},
#             status=400
#         )

#     refresh = RefreshToken.for_user(auth_user)

#     return Response({

#         "access":
#             str(refresh.access_token),

#         "refresh":
#             str(refresh),

#         "user": {

#             "id": auth_user.id,
#             "name": auth_user.first_name,
#             "email": auth_user.email,
#             "is_staff": auth_user.is_staff,
#             "is_recruiter":
#                 hasattr(auth_user, "recruiter")

#         }
#     })
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = User.objects.get(email=email)

    except User.DoesNotExist:

        return Response(
            {"error": "User not found"},
            status=404
        )

    auth_user = authenticate(
        username=user.username,
        password=password
    )

    if auth_user is None:

        return Response(
            {"error": "Wrong password"},
            status=400
        )

    refresh = RefreshToken.for_user(auth_user)

    return Response({

    "access": str(refresh.access_token),

    "refresh": str(refresh),

    "user": {

        "id": auth_user.id,
        "name": auth_user.first_name,
        "email": auth_user.email,
        "is_staff": auth_user.is_staff,
        "is_recruiter": False

    }

})

# =========================
# SAVE PROFILE
# =========================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_profile(request):

    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    profile.skills = request.data.get(
        "skills"
    )

    profile.projects = request.data.get(
        "projects"
    )

    profile.bio = request.data.get(
        "bio"
    )

    profile.github = request.data.get(
        "github"
    )

    profile.linkedin = request.data.get(
        "linkedin"
    )

    # RESUME
    if request.FILES.get("resume"):

        profile.resume = request.FILES.get(
            "resume"
        )

    profile.save()

    serializer = ProfileSerializer(
        profile
    )

    return Response(serializer.data)


# =========================
# GET PROFILE
# =========================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile(request):

    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    serializer = ProfileSerializer(
        profile
    )

    return Response(serializer.data)