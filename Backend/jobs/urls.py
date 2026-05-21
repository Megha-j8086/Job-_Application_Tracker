# from django.urls import path
# from .views import jobs_list, update_job, delete_job

# urlpatterns = [
#     path("", jobs_list),
#     path("<int:id>/update/", update_job),
#     path("<int:id>/delete/", delete_job),
# ]

from django.urls import path
from .views import *

urlpatterns = [

path(
"jobs/",
jobs_list
),

path(
"jobs/<int:id>/",
update_job
),

path(
"jobs/delete/<int:id>/",
delete_job
),

]