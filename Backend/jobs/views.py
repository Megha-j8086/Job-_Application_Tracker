from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Job
from .serializers import JobSerializer


@api_view(['GET', 'POST'])
def jobs_list(request):

    if request.method == 'GET':

        jobs = Job.objects.all()

        serializer = JobSerializer(
            jobs,
            many=True
        )

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = JobSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors)


@api_view(['DELETE'])
def delete_job(request, id):

    job = Job.objects.get(id=id)

    job.delete()

    return Response({
        "message": "Deleted"
    })

@api_view(['PUT'])
def update_job(request, id):

    job = Job.objects.get(id=id)

    serializer = JobSerializer(
        job,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)


@api_view(['POST'])
def add_job(request):

    serializer =JobSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)


