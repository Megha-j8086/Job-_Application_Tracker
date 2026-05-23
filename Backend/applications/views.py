from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response

from .models import Application
from .serializers import (
    ApplicationSerializer
)


# ==================================
# GET APPLICATIONS + APPLY JOB
# ==================================
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])

def applications_list(request):

    try:

        # =====================
        # GET APPLICATIONS
        # =====================
        if request.method == "GET":

            profile = getattr(
                request.user,
                "profile",
                None
            )

            role = (
                profile.role
                if profile
                else "user"
            )

            if request.user.is_staff:

                applications = (

                    Application.objects

                    .select_related(
                        "user",
                        "job"
                    )

                    .all()

                    .order_by("-id")
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

                    .order_by("-id")
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

                    .order_by("-id")
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

        # =====================
        # APPLY JOB
        # =====================
        elif request.method == "POST":

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

            profile = getattr(
                request.user,
                "profile",
                None
            )

            if (
                profile
                and
                profile.role
                ==
                "recruiter"
            ):

                return Response(
                    {
                        "error":
                        "Recruiters cannot apply"
                    },
                    status=403
                )

            already = (

                Application.objects

                .filter(
                    user=request.user,
                    job_id=job_id
                )

                .exists()

            )

            if already:

                return Response(
                    {
                        "error":
                        "Already Applied"
                    },
                    status=400
                )

            application = (

                Application.objects

                .create(

                    user=request.user,

                    job_id=job_id,

                    status="Applied"

                )

            )

            serializer = (

                ApplicationSerializer(

                    application,

                    context={
                        "request":
                        request
                    }

                )

            )

            return Response(
                serializer.data,
                status=201
            )

    except Exception as e:

        print(
            "APPLICATION ERROR:",
            str(e)
        )

        return Response(
            {
                "error":
                str(e)
            },
            status=500
        )


# ==================================
# DELETE APPLICATION
# ==================================
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


# ==================================
# UPDATE STATUS
# ==================================
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

    app.status = request.data.get(
        "status",
        app.status
    )

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