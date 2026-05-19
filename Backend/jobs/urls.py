from django.urls import path
from .views import jobs_list, update_job, delete_job

urlpatterns = [
    path('', jobs_list, name="jobs-list"),
    # path('add/', add_job, name="create-job"),
    path('update/<int:id>/', update_job, name="update-job"),
    path('delete/<int:id>/', delete_job, name="delete-job"),
]