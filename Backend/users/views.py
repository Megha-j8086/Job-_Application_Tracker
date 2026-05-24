from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from rest_framework.decorators import (
    api_view,
    permission_classes,
    parser_classes
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

from rest_framework.response import Response

from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile
from .serializers import ProfileSerializer

@api_view(["POST"])
@permission_classes([AllowAny])

def register_user(request):

    try:

        name=request.data.get(
            "name"
        )

        email=(
            request.data
            .get(
                "email"
            )
            .strip()
            .lower()
        )

        password=request.data.get(
            "password"
        )

        if not email:

            return Response(
                {
                    "error":
                    "Email required"
                },
                status=400
            )

        if User.objects.filter(
            username=email
        ).exists():

            return Response(
                {
                    "error":
                    "User already exists"
                },
                status=400
            )

        user=User.objects.create_user(

            username=email,

            email=email,

            password=password,

            first_name=name

        )

        Profile.objects.create(

            user=user,

            role="user"

        )

        return Response({

            "message":
            "Registered"

        })

    except Exception as e:

        return Response(

            {
                "error":
                str(e)
            },

            status=400

        )


# =========================================
# REGISTER RECRUITER
# =========================================
@api_view(["POST"])
@permission_classes([AllowAny])
def register_recruiter(request):

    try:

        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")

        email = email.strip().lower()

        if User.objects.filter(username=email).exists():

            return Response(
                {
                    "error": "Recruiter already exists"
                },
                status=400
            )

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name
        )

        Profile.objects.create(
            user=user,
            role="recruiter"
        )

        return Response(
            {
                "message": "Recruiter registered"
            },
            status=201
        )

    except Exception as e:

        return Response(
            {
                "error": str(e)
            },
            status=400
        )


# =========================================
# LOGIN
# =========================================
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
def login_user(request):

    email=(
        request.data
        .get("username","")
        .strip()
        .lower()
    )

    password=request.data.get(
        "password"
    )

    user=authenticate(
        username=email,
        password=password
    )

    if user is None:

        return Response(
            {
                "error":
                "Invalid credentials"
            },
            status=401
        )

    refresh=RefreshToken.for_user(
        user
    )

    role="user"

    if hasattr(
        user,
        "profile"
    ):
        role=user.profile.role

    if user.is_staff:
        role="admin"

    return Response({

        "access":
        str(
            refresh.access_token
        ),

        "refresh":
        str(refresh),

        "user":{

            "id":
            user.id,

            "name":
            user.first_name,

            "email":
            user.email,

            "role":
            role,

            "is_staff":
            user.is_staff

        }

    })
# =========================================
# GET PROFILE
# =========================================
# =========================================
# GET PROFILE
# =========================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])

def profile(request):

    profile, created = Profile.objects.get_or_create(

        user=request.user,

        defaults={

            "role":

            "admin"

            if request.user.is_staff

            else "user"

        }

    )

    return Response({

        "id":

        request.user.id,

        "name":

        request.user.first_name

        or

        request.user.username,

        "email":

        request.user.email,

        "role":

        (

            "admin"

            if request.user.is_staff

            else profile.role

        ),

        "is_staff":

        request.user.is_staff,

        "skills":

        profile.skills,

        "projects":

        profile.projects,

        "bio":

        profile.bio,

        "github":

        profile.github,

        "linkedin":

        profile.linkedin,

        "resume":

        request.build_absolute_uri(

            profile.resume.url

        )

        if profile.resume

        else None

    })



# =========================================
# SAVE PROFILE
# =========================================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])

def save_profile(request):

    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    profile.skills = request.data.get("skills", "")
    profile.projects = request.data.get("projects", "")
    profile.bio = request.data.get("bio", "")
    profile.github = request.data.get("github", "")
    profile.linkedin = request.data.get("linkedin", "")

    if request.FILES.get("resume"):

        profile.resume = request.FILES["resume"]

    profile.save()

    serializer = ProfileSerializer(profile)

    return Response(serializer.data)