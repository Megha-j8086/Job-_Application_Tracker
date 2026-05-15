from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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
            {"error": "All fields required"},
            status=400
        )

    if User.objects.filter(username=email).exists():
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
        "message": "User created successfully"
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
        user_obj = User.objects.get(email=email)

    except User.DoesNotExist:

        return Response(
            {"error": "User not found"},
            status=404
        )

    user = authenticate(
        username=user_obj.username,
        password=password
    )

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

            "email": user.email,

            "is_staff": user.is_staff,

            "is_superuser": user.is_superuser

        }
    })
    