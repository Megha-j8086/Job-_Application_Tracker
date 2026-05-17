from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Recruiter

from jobs.models import Job
from applications.models import Application


# RECRUITER DASHBOARD
@api_view(["GET"])
def recruiter_dashboard(request):

    recruiter = Recruiter.objects.get(
        user=request.user
    )

    jobs = Job.objects.filter(
        recruiter=recruiter
    )

    applications = Application.objects.filter(
        job__recruiter=recruiter
    )

    return Response({

        "total_jobs":
        jobs.count(),

        "total_applications":
        applications.count(),

        "shortlisted":
        applications.filter(
            status="Shortlisted"
        ).count(),

        "interviews":
        applications.filter(
            status="Interview"
        ).count(),

        "selected":
        applications.filter(
            status="Selected"
        ).count(),

        "rejected":
        applications.filter(
            status="Rejected"
        ).count(),

    })


# RECRUITER JOBS
@api_view(["GET"])
def recruiter_jobs(request):

    recruiter = Recruiter.objects.get(
        user=request.user
    )

    jobs = Job.objects.filter(
        recruiter=recruiter
    )

    data = []

    for job in jobs:

        data.append({

            "id": job.id,

            "company":
            job.company,

            "role":
            job.role,

            "skill":
            job.skill,

            "experience":
            job.experience,

            "location":
            job.location,

            "salary":
            job.salary,

            "description":
            job.description,

        })

    return Response(data)


# VIEW APPLICANTS
@api_view(["GET"])
def recruiter_applicants(request):

    recruiter = Recruiter.objects.get(
        user=request.user
    )

    applications = Application.objects.filter(
        job__recruiter=recruiter
    )

    data = []

    for app in applications:

        profile = getattr(
            app.user,
            "candidateprofile",
            None
        )

        data.append({

            "id": app.id,

            "username":
            app.user.username,

            "email":
            app.user.email,

            "company":
            app.job.company,

            "role":
            app.job.role,

            "status":
            app.status,

            "skills":
            profile.skills if profile else "",

            "projects":
            profile.projects if profile else "",

            "phone":
            profile.phone if profile else "",

            "location":
            profile.location if profile else "",

            "resume":
            profile.resume.url
            if profile and profile.resume
            else "",

        })

    return Response(data)


# UPDATE APPLICATION STATUS
@api_view(["PUT"])
def update_application_status(
    request,
    id
):

    try:

        application = Application.objects.get(
            id=id
        )

        status = request.data.get(
            "status"
        )

        application.status = status

        application.save()

        return Response({

            "message":
            "Application Updated"

        })

    except Application.DoesNotExist:

        return Response({

            "error":
            "Application Not Found"

        }, status=404)