from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Application
from .serializers import ApplicationSerializer

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def applications_list(request):

    if request.method == 'GET':
        apps = Application.objects.all()
        return Response(ApplicationSerializer(apps, many=True).data)

    if request.method == 'POST':
        serializer = ApplicationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_application(request, id):
    app = Application.objects.get(id=id)

    serializer = ApplicationSerializer(app, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_application(request, id):
    app = Application.objects.get(id=id)
    app.delete()
    return Response({"message": "Deleted"})