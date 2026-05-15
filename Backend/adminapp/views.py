from django.contrib.auth.models import User

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response

from jobs.models import Job
from applications.models import Application

from .serializers import (
    UserSerializer,
    JobSerializer,
    ApplicationSerializer
)


# ===================================
# CHECK ADMIN
# ===================================
def is_admin(user):

    return user.is_staff


# ===================================
# USERS
# ===================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    users = User.objects.all()

    serializer = UserSerializer(
        users,
        many=True
    )

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, id):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        user = User.objects.get(id=id)

        user.first_name = request.data.get(
            "name",
            user.first_name
        )

        user.email = request.data.get(
            "email",
            user.email
        )

        user.username = user.email

        user.save()

        return Response({
            "message": "User Updated"
        })

    except User.DoesNotExist:

        return Response(
            {"error": "User Not Found"},
            status=404
        )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, id):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        user = User.objects.get(id=id)

        user.delete()

        return Response({
            "message": "User Deleted"
        })

    except User.DoesNotExist:

        return Response(
            {"error": "User Not Found"},
            status=404
        )


# ===================================
# JOBS
# ===================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_jobs(request):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    jobs = Job.objects.all()

    serializer = JobSerializer(
        jobs,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_job(request):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    serializer = JobSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_job(request, id):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        job = Job.objects.get(id=id)

        serializer = JobSerializer(
            job,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    except Job.DoesNotExist:

        return Response(
            {"error": "Job Not Found"},
            status=404
        )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_job(request, id):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        job = Job.objects.get(id=id)

        job.delete()

        return Response({
            "message": "Job Deleted"
        })

    except Job.DoesNotExist:

        return Response(
            {"error": "Job Not Found"},
            status=404
        )


# ===================================
# APPLICATIONS
# ===================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_applications(request):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    apps = Application.objects.all()

    serializer = ApplicationSerializer(
        apps,
        many=True
    )

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_application(request, id):

    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        app = Application.objects.get(id=id)

        app.status = request.data.get(
            "status",
            app.status
        )

        app.save()

        return Response({
            "message": "Status Updated"
        })

    except Application.DoesNotExist:

        return Response(
            {"error": "Application Not Found"},
            status=404
        )