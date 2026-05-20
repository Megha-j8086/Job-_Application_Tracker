# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.response import Response

# from .models import Application
# from .serializers import ApplicationSerializer


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def applications_list(request):
#     apps = Application.objects.all()
#     serializer = ApplicationSerializer(apps, many=True)
#     return Response(serializer.data)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_application(request):
#     serializer = ApplicationSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

#     return Response(serializer.errors, status=400)
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_application(request, id):
#     app = Application.objects.get(id=id)

#     serializer = ApplicationSerializer(app, data=request.data, partial=True)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

#     return Response(serializer.errors)


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_application(request, id):
#     app = Application.objects.get(id=id)
#     app.delete()
#     return Response({"message": "Deleted"})

# from rest_framework.decorators import api_view,permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated

# from .models import Application
# from .serializers import ApplicationSerializer


# @api_view(['GET', 'POST'])
# def applications_list(request):

#     # GET ALL APPLICATIONS
#     if request.method == 'GET':

#         apps = Application.objects.all()

#         serializer = ApplicationSerializer(
#             apps,
#             many=True
#         )

#         return Response(serializer.data)

#     # APPLY JOB
#     if request.method == 'POST':

#         # CHECK LOGIN
#         if not request.user.is_authenticated:

#             return Response(
#                 {"error": "Login Required"},
#                 status=401
#             )

#         serializer = ApplicationSerializer(
#             data=request.data
#         )

#         if serializer.is_valid():

#             serializer.save(
#                 user=request.user
#             )

#             return Response(serializer.data)

#         return Response(
#             serializer.errors,
#             status=400
#         )

# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_application(request, id):

#     try:

#         app = Application.objects.get(
#             id=id,
#             user=request.user
#         )

#         app.delete()

#         return Response({
#             "message": "Deleted"
#         })

#     except Application.DoesNotExist:

#         return Response(
#             {"error": "Not Found"},
#             status=404
#         )

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_application(request, id):

#     try:

#         app = Application.objects.get(id=id)

#     except Application.DoesNotExist:

#         return Response(
#             {"error": "Application not found"},
#             status=404
#         )

#     serializer = ApplicationSerializer(
#         app,
#         data=request.data,
#         partial=True
#     )

#     if serializer.is_valid():

#         serializer.save()

#         return Response(serializer.data)

#     return Response(
#         serializer.errors,
#         status=400
#     )
from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response

from .models import Application
from .serializers import ApplicationSerializer


# =====================================
# GET APPLICATIONS + APPLY JOB
# =====================================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def applications_list(request):

    # =========================
    # GET APPLICATIONS
    # =========================
    if request.method == "GET":

        # ADMIN CAN SEE ALL
        if request.user.is_staff:

            applications = Application.objects.all()

        # NORMAL USER ONLY THEIR DATA
        else:

            applications = Application.objects.filter(
                user=request.user
            )

        serializer = ApplicationSerializer(
            applications,
            many=True
        )

        return Response(serializer.data)

    # =========================
    # APPLY JOB
    # =========================
    if request.method == "POST":

        job_id = request.data.get("job")

        # CHECK DUPLICATE APPLICATION
        already_applied = Application.objects.filter(
            user=request.user,
            job_id=job_id
        ).exists()

        if already_applied:

            return Response(
                {
                    "error": "Already applied this job"
                },
                status=400
            )

        serializer = ApplicationSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )


# =====================================
# DELETE APPLICATION
# =====================================

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_application(request, id):

    try:

        application = Application.objects.get(
            id=id,
            user=request.user
        )

        application.delete()

        return Response({
            "message": "Deleted Successfully"
        })

    except Application.DoesNotExist:

        return Response(
            {
                "error": "Application Not Found"
            },
            status=404
        )


# =====================================
# UPDATE APPLICATION STATUS
# =====================================

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_application(request, id):

    try:

        application = Application.objects.get(id=id)

    except Application.DoesNotExist:

        return Response(
            {
                "error": "Application Not Found"
            },
            status=404
        )

    serializer = ApplicationSerializer(
        application,
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