from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Application
from .serializers import ApplicationSerializer


# GET + ADD APPLICATIONS
@api_view(['GET', 'POST'])
def applications_list(request):

    # GET
    if request.method == 'GET':

        applications =Application.objects.all()

        serializer =ApplicationSerializer(
            applications,
            many=True
        )

        return Response(
            serializer.data
        )

    # POST
    elif request.method == 'POST':

        serializer =ApplicationSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors
        )


# UPDATE STATUS
@api_view(['PUT'])
def update_application(
    request,
    id
):

    application =Application.objects.get(
        id=id
    )

    serializer =ApplicationSerializer(
        application,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data
        )

    return Response(
        serializer.errors
    )


# DELETE APPLICATION
@api_view(['DELETE'])
def delete_application(
    request,
    id
):

    application =Application.objects.get(
        id=id
    )

    application.delete()

    return Response({
        "message":
        "Deleted"
    })