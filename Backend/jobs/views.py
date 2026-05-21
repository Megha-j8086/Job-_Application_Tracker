# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response

# from .models import Job
# from .serializers import JobSerializer
# from users.permissions import IsRecruiter


# # GET + POST JOBS
# @api_view(["GET", "POST"])
# def jobs_list(request):

#     # GET (PUBLIC)
#     if request.method == "GET":
#         jobs = Job.objects.all().order_by("-id")
#         return Response(JobSerializer(jobs, many=True).data)

#     # POST (RECRUITER ONLY)
#     if request.method == "POST":

#         if not request.user.is_authenticated:
#             return Response({"error": "Login required"}, status=401)

#         if request.user.profile.role != "recruiter":
#             return Response({"error": "Recruiter only"}, status=403)

#         serializer = JobSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save(recruiter=request.user)
#             return Response(serializer.data)

#         return Response(serializer.errors, status=400)


# # UPDATE JOB
# @api_view(["PUT"])
# @permission_classes([IsRecruiter])
# def update_job(request, id):

#     try:
#         job = Job.objects.get(id=id, recruiter=request.user)
#     except Job.DoesNotExist:
#         return Response({"error": "Not found"}, status=404)

#     serializer = JobSerializer(job, data=request.data, partial=True)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

#     return Response(serializer.errors, status=400)


# # DELETE JOB
# @api_view(["DELETE"])
# @permission_classes([IsRecruiter])
# def delete_job(request, id):

#     try:
#         job = Job.objects.get(id=id, recruiter=request.user)
#         job.delete()
#         return Response({"message": "Deleted"})
#     except Job.DoesNotExist:
#         return Response({"error": "Not found"}, status=404)

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.response import Response

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

from .models import Job
from .serializers import JobSerializer

from users.permissions import (
    IsRecruiter
)


# =========================
# GET + CREATE JOB
# =========================
@api_view(["GET", "POST"])
@permission_classes([AllowAny])

def jobs_list(request):

    # GET JOBS
    if request.method == "GET":

        jobs = Job.objects.all().order_by("-id")

        serializer = JobSerializer(
            jobs,
            many=True
        )

        return Response(
            serializer.data
        )

    # CREATE JOB
    elif request.method == "POST":

        if not request.user.is_authenticated:

            return Response(
                {
                    "error":
                    "Login required"
                },
                status=401
            )

        try:

            if (
                request.user.profile.role
                !=
                "recruiter"
            ):

                return Response(
                    {
                        "error":
                        "Recruiter only"
                    },
                    status=403
                )

        except Exception:

            return Response(
                {
                    "error":
                    "Profile missing"
                },
                status=400
            )

        serializer = JobSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                recruiter=request.user
            )

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


# =========================
# UPDATE JOB
# =========================
@api_view(["PUT"])
@permission_classes([
    IsAuthenticated,
    IsRecruiter
])

def update_job(
    request,
    id
):

    try:

        job = Job.objects.get(
            id=id,
            recruiter=request.user
        )

    except Job.DoesNotExist:

        return Response(
            {
                "error":
                "Job not found"
            },
            status=404
        )

    serializer = JobSerializer(
        job,
        data=request.data,
        partial=True
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


# =========================
# DELETE JOB
# =========================
@api_view(["DELETE"])
@permission_classes([
    IsAuthenticated,
    IsRecruiter
])

def delete_job(
    request,
    id
):

    try:

        job = Job.objects.get(
            id=id,
            recruiter=request.user
        )

    except Job.DoesNotExist:

        return Response(
            {
                "error":
                "Job not found"
            },
            status=404
        )

    job.delete()

    return Response(
        {
            "message":
            "Job deleted"
        }
    )