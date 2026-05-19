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

    # CHECK ADMIN
    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    # GET USERS
    users = User.objects.all().order_by("-id")

    # SERIALIZER
    serializer = UserSerializer(
        users,
        many=True
    )

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, id):

    # CHECK ADMIN
    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        # GET USER
        user = User.objects.get(id=id)

        # UPDATE DATA
        user.first_name = request.data.get(
            "name",
            user.first_name
        )

        user.email = request.data.get(
            "email",
            user.email
        )

        user.username = user.email

        # SAVE
        user.save()

        return Response({
            "message": "User Updated Successfully"
        })

    except User.DoesNotExist:

        return Response(
            {"error": "User Not Found"},
            status=404
        )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, id):

    # CHECK ADMIN
    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        # GET USER
        user = User.objects.get(id=id)

        # DELETE USER
        user.delete()

        return Response({
            "message": "User Deleted Successfully"
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

    # CHECK ADMIN
    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    # GET JOBS
    jobs = Job.objects.all().order_by("-id")

    # SERIALIZER
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

        serializer.save(
            recruiter=request.user
        )

        return Response(serializer.data)

    print(serializer.errors)

    return Response(
        serializer.errors,
        status=400
    )
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_job(request, id):

    # CHECK ADMIN
    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        # GET JOB
        job = Job.objects.get(id=id)

        # UPDATE JOB
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

    # CHECK ADMIN
    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        # GET JOB
        job = Job.objects.get(id=id)

        # DELETE JOB
        job.delete()

        return Response({
            "message": "Job Deleted Successfully"
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

    # CHECK ADMIN
    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    # GET ALL APPLICATIONS
    applications = Application.objects.all().order_by("-id")

    # SERIALIZER
    serializer = ApplicationSerializer(
        applications,
        many=True
    )

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_application(request, id):

    # CHECK ADMIN
    if not is_admin(request.user):

        return Response(
            {"error": "Admin only"},
            status=403
        )

    try:

        # GET APPLICATION
        application = Application.objects.get(id=id)

        # UPDATE STATUS
        application.status = request.data.get(
            "status",
            application.status
        )

        # SAVE
        application.save()

        # UPDATED SERIALIZER
        serializer = ApplicationSerializer(
            application
        )

        return Response({
            "message": "Application Updated Successfully",
            "application": serializer.data
        })

    except Application.DoesNotExist:

        return Response(
            {"error": "Application Not Found"},
            status=404
        )