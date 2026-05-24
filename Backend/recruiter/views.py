from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response

from jobs.models import Job
from jobs.serializers import JobSerializer

from applications.models import Application
from applications.serializers import (
    ApplicationSerializer
)


# ==========================
# CHECK RECRUITER
# ==========================

def is_recruiter(user):

    return hasattr(
        user,
        "profile"
    ) and user.profile.role=="recruiter"

# ==========================
# ADD JOB
# ==========================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_job(request):

    if not is_recruiter(request.user):
        return Response({"error": "Recruiter only"}, status=403)

    serializer = JobSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(recruiter=request.user)
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

# ==========================
# GET RECRUITER JOBS
# ==========================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recruiter_jobs(request):

    if not is_recruiter(request.user):
        return Response([], status=200)

    jobs = Job.objects.filter(recruiter=request.user)

    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

# ==========================
# GET APPLICATIONS
# ==========================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recruiter_applications(request):

    if not is_recruiter(request.user):
        return Response([], status=200)

    jobs = Job.objects.filter(recruiter=request.user)

    applications = Application.objects.filter(job__in=jobs)

    serializer = ApplicationSerializer(applications, many=True)

    return Response(serializer.data)


# ==========================
# UPDATE STATUS
# ==========================

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_application_status(request, id):

    if not is_recruiter(request.user):
        return Response({"error": "Recruiter only"}, status=403)

    try:
        application = Application.objects.get(
            id=id,
            job__recruiter=request.user.recruiter
        )

    except Application.DoesNotExist:
        return Response({"error": "Not Found"}, status=404)

    application.status = request.data.get("status", application.status)
    application.save()

    return Response({"message": "Status Updated"})

