from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Job
from .serializers import JobSerializer
from recruiter.models import Recruiter


@api_view(["GET", "POST"])   # 🔥 THIS IS MANDATORY
@permission_classes([IsAuthenticated])
def jobs_list(request):

    # GET JOBS
    if request.method == "GET":
        jobs = Job.objects.all().order_by("-id")
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

    # POST JOB
    if request.method == "POST":

        try:
            recruiter = Recruiter.objects.get(user=request.user)
        except Recruiter.DoesNotExist:
            return Response(
                {"error": "Only recruiters can post jobs"},
                status=403
            )

        serializer = JobSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(recruiter=recruiter)
            return Response(serializer.data)

        return Response(serializer.errors, status=400)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_job(request, id):
    job = Job.objects.get(id=id)

    serializer = JobSerializer(job, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_job(request, id):
    job = Job.objects.get(id=id)
    job.delete()
    return Response({"message": "Deleted"})