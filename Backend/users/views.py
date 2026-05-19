# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate

# from rest_framework.decorators import (
#     api_view,
#     permission_classes
# )

# from rest_framework.permissions import (
#     AllowAny,
#     IsAuthenticated
# )

# from rest_framework.response import Response

# from rest_framework_simplejwt.tokens import RefreshToken

# from .models import Profile

# from .serializers import ProfileSerializer


# # =========================
# # REGISTER USER
# # =========================
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_user(request):

#     name = request.data.get("name")
#     email = request.data.get("email")
#     password = request.data.get("password")

#     # 🔥 IMPORTANT VALIDATION
#     if not email or not password:
#         return Response(
#             {"error": "Email and password required"},
#             status=400
#         )

#     email = email.strip()

#     if User.objects.filter(username=email).exists():
#         return Response({"error": "User already exists"}, status=400)

#     try:
#         validate_password(password)
#     except Exception as e:
#         return Response({"error": str(e)}, status=400)

#     user = User.objects.create_user(
#         username=email,
#         email=email,
#         password=password,
#         first_name=name or ""
#     )

#     return Response({"message": "User created successfully"})
# # =========================
# # LOGIN USER
# # =========================

# @api_view(["POST"])
# @permission_classes([AllowAny])
# def login_user(request):

#     username = request.data.get("username")
#     password = request.data.get("password")

#     user = authenticate(
#         username=username,
#         password=password
#     )

#     if user is not None:

#         refresh = RefreshToken.for_user(user)

#     return Response({

#         "access": str(refresh.access_token),

#         "refresh": str(refresh),

#         "user": {

#             "id": auth_user.id,

#             "name": auth_user.first_name,

#             "email": auth_user.email,

#             "is_staff": auth_user.is_staff,


#         }

#     })

#     return Response(
#         {"error": "Invalid Credentials"},
#         status=401
#     )


# # =========================
# # USER PROFILE
# # =========================

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def profile(request):

#     serializer = UserSerializer(request.user)

#     return Response(serializer.data)

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile
from .serializers import ProfileSerializer


# =========================
# REGISTER USER
# =========================
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):

    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password required"},
            status=400
        )

    email = email.strip()

    if User.objects.filter(username=email).exists():
        return Response({"error": "User already exists"}, status=400)

    try:
        validate_password(password)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

    User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name or ""
    )

    return Response({"message": "User created successfully"})


# =========================
# LOGIN USER
# =========================


@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password required"},
            status=400
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"error": "Invalid credentials"},
            status=401
        )

    refresh = RefreshToken.for_user(user)

    return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "name": user.first_name,
                "email": user.email,
                "is_staff": True,
                "is_recruiter":True,
            }
        })
# =========================
# PROFILE
# =========================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    profile, created = Profile.objects.get_or_create(user=request.user)

    serializer = ProfileSerializer(profile)

    return Response(serializer.data)