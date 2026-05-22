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
#  

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


# ====================================
# GET APPLICATIONS + APPLY
# ====================================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])

def applications_list(request):

    # =========================
    # GET
    # =========================
    if request.method == "GET":

        try:

            role = (
                request.user.profile.role
            )

        except:

            role = "user"

        # RECRUITER
        if role == "recruiter":

            applications = (

                Application.objects

                .select_related(
                    "user",
                    "job"
                )

                .filter(
                    job__recruiter=
                    request.user
                )

                .order_by("-created_at")

            )

        # ADMIN
        elif request.user.is_staff:

            applications = (

                Application.objects

                .select_related(
                    "user",
                    "job"
                )

                .all()

                .order_by("-created_at")

            )

        # USER
        else:

            applications = (

                Application.objects

                .select_related(
                    "user",
                    "job"
                )

                .filter(
                    user=request.user
                )

                .order_by("-created_at")

            )

        serializer = (

            ApplicationSerializer(

                applications,

                many=True,

                context={
                    "request":
                    request
                }

            )

        )

        return Response(
            serializer.data
        )

    # =========================
    # APPLY
    # =========================
    job_id = request.data.get(
        "job"
    )

    exists = (

        Application.objects

        .filter(

            user=request.user,

            job_id=job_id

        )

        .exists()

    )

    if exists:

        return Response(

            {

                "error":

                "Already applied"

            },

            status=400

        )

    serializer = (

        ApplicationSerializer(

            data=request.data,

            context={
                "request":
                request
            }

        )

    )

    if serializer.is_valid():

        serializer.save()

        return Response(

            serializer.data,

            status=201

        )

    return Response(

        serializer.errors,

        status=400

    )


# ====================================
# DELETE
# ====================================

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])

def delete_application(
    request,
    id
):

    try:

        application = (

            Application.objects.get(

                id=id,

                user=request.user

            )

        )

        application.delete()

        return Response({

            "message":

            "Deleted"

        })

    except Application.DoesNotExist:

        return Response(

            {

                "error":

                "Not found"

            },

            status=404

        )


# ====================================
# UPDATE STATUS
# ====================================

@api_view(["PUT"])
@permission_classes([IsAuthenticated])

def update_application(
    request,
    id
):

    try:

        application = (

            Application.objects

            .select_related(
                "job"
            )

            .get(
                id=id
            )

        )

    except Application.DoesNotExist:

        return Response(

            {

                "error":

                "Application Not Found"

            },

            status=404

        )

    if (

        request.user

        !=

        application.job.recruiter

    ):

        return Response(

            {

                "error":

                "Permission denied"

            },

            status=403

        )

    serializer = (

        ApplicationSerializer(

            application,

            data=request.data,

            partial=True,

            context={
                "request":
                request
            }

        )

    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data
        )

    return Response(

        serializer.errors,

        status=400

    )