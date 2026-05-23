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


# ===========================
# GET + APPLY
# ===========================
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])

def applications_list(request):

    # -------------------
    # GET
    # -------------------
    if request.method == "GET":

        role = getattr(
            getattr(
                request.user,
                "profile",
                None
            ),
            "role",
            "user"
        )

        if request.user.is_staff:

            applications = (
                Application.objects
                .select_related(
                    "user",
                    "job"
                )
                .all()
                .order_by("-created_at")
            )

        elif role == "recruiter":

            applications = (
                Application.objects
                .select_related(
                    "user",
                    "job"
                )
                .filter(
                    job__recruiter=request.user
                )
                .order_by("-created_at")
            )

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

        serializer = ApplicationSerializer(
            applications,
            many=True,
            context={
                "request": request
            }
        )

        return Response(
            serializer.data
        )



    # -------------------
    # APPLY
    # -------------------
    job_id = request.data.get(
        "job"
    )

    if not job_id:

        return Response(
            {
                "error":
                "Job required"
            },
            status=400
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
                "Already Applied"
            },
            status=400
        )

    serializer = ApplicationSerializer(
        data=request.data,
        context={
            "request": request
        }
    )

    if serializer.is_valid():

        serializer.save(
            user=request.user
        )

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )


# ===========================
# DELETE
# ===========================
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])

def delete_application(
request,
id
):

    try:

        app = (
            Application.objects
            .get(
                id=id,
                user=request.user
            )
        )

        app.delete()

        return Response({
            "message":
            "Deleted"
        })

    except Application.DoesNotExist:

        return Response(
            {
                "error":
                "Not Found"
            },
            status=404
        )


# ===========================
# UPDATE STATUS
# ===========================
@api_view(["PUT"])
@permission_classes([IsAuthenticated])

def update_application(
request,
id
):

    try:

        app = (
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

    if app.job.recruiter != request.user:

        return Response(
            {
                "error":
                "Permission denied"
            },
            status=403
        )

    status_value = (
        request.data.get(
            "status"
        )
    )

    app.status = status_value

    app.save()

    serializer = (
        ApplicationSerializer(
            app,
            context={
                "request":
                request
            }
        )
    )

    return Response(
        serializer.data
    )