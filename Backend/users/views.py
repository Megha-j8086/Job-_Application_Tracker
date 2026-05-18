from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile

from .serializers import ProfileSerializer


# =========================
# REGISTER USER
# =========================

@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():

        return Response(
            {"error": "Username already exists"},
            status=400
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    Profile.objects.create(
        user=user,
        skills="",
        projects="",
        bio=""
    )

    return Response({
        "message": "User Registered Successfully"
    })


# =========================
# LOGIN USER
# =========================

@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        refresh = RefreshToken.for_user(user)

    return Response({

        "access": str(refresh.access_token),

        "refresh": str(refresh),

        "user": {

            "id": auth_user.id,

            "name": auth_user.first_name,

            "email": auth_user.email,

            "is_staff": auth_user.is_staff,

            "is_recruiter":
                hasattr(auth_user, "recruiter")

        }

    })

    return Response(
        {"error": "Invalid Credentials"},
        status=401
    )


# =========================
# USER PROFILE
# =========================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    serializer = UserSerializer(request.user)

    return Response(serializer.data)