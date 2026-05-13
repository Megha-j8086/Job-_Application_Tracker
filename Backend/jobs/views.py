from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Job
from .serializers import JobSerializer


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def jobs_list(request):

    if request.method == 'GET':
        jobs = Job.objects.all()
        return Response(JobSerializer(jobs, many=True).data)

    if request.method == 'POST':
        serializer = JobSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

# PROTECTED: add job (ONLY LOGGED IN USERS)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_job(request):
    serializer = JobSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data)

    return Response(serializer.errors)


# UPDATE (protected)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_job(request, id):
    job = Job.objects.get(id=id, user=request.user)
    serializer = JobSerializer(job, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)


# DELETE (protected)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_job(request, id):
    job = Job.objects.get(id=id, user=request.user)
    job.delete()
    return Response({"message": "Deleted"})