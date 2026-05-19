import React, {
  useEffect,
  useState
} from "react";

import API from "../../api/api";

const RecruiterDashboard = () => {

  const [jobs, setJobs] =
    useState([]);

  const [applications, setApplications] =
    useState([]);

  const [newJob, setNewJob] =
    useState({

      company: "",
      role: "",
      skill: "",
      experience: "",
      location: "",
      salary: "",
      description: "",

    });

  useEffect(() => {

    fetchJobs();

    fetchApplications();

  }, []);

  // FETCH JOBS
  const fetchJobs =
    async () => {

      try {

        const res =
          await API.get(
            "/jobs/"
          );

        setJobs(res.data);

      } catch (error) {

        console.log(error);

      }
    };

  // FETCH APPLICATIONS
  const fetchApplications =
    async () => {

      try {

        const res =
          await API.get(
            "/admin/applications/"
          );

        setApplications(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // ADD JOB
  const handleAddJob =
    async () => {

      try {

        await API.post(
          "/jobs/add/",
          newJob
        );

        alert(
          "Job Added Successfully"
        );

        fetchJobs();

      } catch (error) {

        console.log(error);

      }
    };

  // UPDATE STATUS
  const updateStatus =
    async (id, status) => {

      try {

        await API.put(
          `/admin/applications/update/${id}/`,
          {
            status
          }
        );

        fetchApplications();

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="dashboard">

      <h1>
        Recruiter Dashboard
      </h1>

      {/* ADD JOB */}

      <div className="popup">

        <h2>
          Add Job
        </h2>

        <input
          placeholder="Company"
          onChange={(e) =>
            setNewJob({
              ...newJob,
              company:
                e.target.value
            })
          }
        />

        <input
          placeholder="Role"
          onChange={(e) =>
            setNewJob({
              ...newJob,
              role:
                e.target.value
            })
          }
        />

        <input
          placeholder="Skill"
          onChange={(e) =>
            setNewJob({
              ...newJob,
              skill:
                e.target.value
            })
          }
        />

        <input
          placeholder="Experience"
          onChange={(e) =>
            setNewJob({
              ...newJob,
              experience:
                e.target.value
            })
          }
        />

        <input
          placeholder="Location"
          onChange={(e) =>
            setNewJob({
              ...newJob,
              location:
                e.target.value
            })
          }
        />

        <input
          placeholder="Salary"
          onChange={(e) =>
            setNewJob({
              ...newJob,
              salary:
                e.target.value
            })
          }
        />

        <textarea
          placeholder="Description"
          onChange={(e) =>
            setNewJob({
              ...newJob,
              description:
                e.target.value
            })
          }
        />

        <button
          onClick={
            handleAddJob
          }
        >
          Add Job
        </button>

      </div>

      {/* APPLICATIONS */}

      <h2>
        Applicants
      </h2>

      {applications.map(
        (app) => (

          <div
            key={app.id}
            className="job-card"
          >

            <h3>
              {app.role}
            </h3>

            <p>
              {app.company}
            </p>

            <p>
              Status:
              {app.status}
            </p>

            <button
              onClick={() =>
                updateStatus(
                  app.id,
                  "Interview"
                )
              }
            >
              Interview
            </button>

            <button
              onClick={() =>
                updateStatus(
                  app.id,
                  "Rejected"
                )
              }
            >
              Reject
            </button>

            <button
              onClick={() =>
                updateStatus(
                  app.id,
                  "Offer"
                )
              }
            >
              Select
            </button>

          </div>

        )
      )}

    </div>
  );
};

export default RecruiterDashboard;