from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken


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
            {"error": "All fields are required"},
            status=400
        )

    # EMAIL EXISTS
    if User.objects.filter(email=email).exists():

        return Response(
            {"error": "User already exists"},
            status=400
        )

    # PASSWORD VALIDATION
    try:
        validate_password(password)

    except Exception as e:

        return Response(
            {"error": str(e)},
            status=400
        )

    # CREATE USER
    user = User.objects.create_user(

        username=name,   # 👈 USERNAME = NAME
        email=email,
        password=password
    )

    return Response({

        "message": "User created successfully",

        "user": {
            "id": user.id,
            "name": user.username,
            "email": user.email
        }
    })


# =========================
# LOGIN
# =========================
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = User.objects.get(email=email)

    except User.DoesNotExist:

        return Response(
            {"error": "User not found"},
            status=401
        )

    # CHECK PASSWORD
    if not user.check_password(password):

        return Response(
            {"error": "Invalid password"},
            status=401
        )

    refresh = RefreshToken.for_user(user)

    return Response({

        "access": str(refresh.access_token),

        "refresh": str(refresh),

        "user": {
            "id": user.id,
            "name": user.username,
            "email": user.email
        }
    })