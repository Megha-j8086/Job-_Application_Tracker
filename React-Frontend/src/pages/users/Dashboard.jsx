import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../../api/api";

import "../../styles/Dashboard.css";

const Dashboard = () => {

  // NAVIGATE
  const navigate = useNavigate();

  // USER
  const [user, setUser] =
    useState({});

  // JOBS
  const [jobs, setJobs] =
    useState([]);

  // APPLICATIONS
  const [applications, setApplications] =
    useState([]);

  // SEARCH
  const [search, setSearch] =
    useState("");

  // POPUP
  const [selectedJob, setSelectedJob] =
    useState(null);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {

    const token =
      localStorage.getItem(
        "access"
      );

    // CHECK LOGIN
    if (!token) {

      navigate("/log");
      return;

    }

    // GET USER
    const loggedUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (loggedUser) {

      setUser(loggedUser);

    }

    // FETCH DATA
    fetchJobs();

    fetchApplications();

  }, []);

  // =========================
  // FETCH JOBS
  // =========================
  const fetchJobs =
    async () => {

      try {

        const res =
          await API.get(
            "/jobs/"
          );

        console.log(
          "JOBS:",
          res.data
        );

        setJobs(res.data);

      }

      catch (error) {

        console.log(error);

      }
    };

  // =========================
  // FETCH APPLICATIONS
  // =========================
  const fetchApplications =
    async () => {

      try {

        const res =
          await API.get(
            "/applications/"
          );

        console.log(
          "APPLICATIONS:",
          res.data
        );

        setApplications(
          res.data
        );

      }

      catch (error) {

        console.log(error);

      }
    };

  // =========================
  // APPLY JOB
  // =========================
  const applyJob =
    async (jobId) => {

      try {

        const res =
          await API.post(
            "/applications/",
            {
              job: jobId,
              status: "Applied"
            }
          );

        console.log(
          "APPLICATION CREATED:",
          res.data
        );

        // UPDATE UI
        setApplications([
          ...applications,
          res.data
        ]);

        alert(
          "Application Submitted"
        );

      }

      catch (error) {

        console.log(
          error.response?.data
        );

        alert(
          error.response?.data?.error ||
          "Failed To Apply"
        );

      }
    };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout =
    () => {

      localStorage.removeItem(
        "access"
      );

      localStorage.removeItem(
        "refresh"
      );

      localStorage.removeItem(
        "user"
      );

      alert(
        "Logged Out Successfully"
      );

      navigate("/");

    };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredJobs =
    jobs.filter((job) =>
      job.role
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // =========================
  // COUNTS
  // =========================
  const appliedCount =
    applications.filter(
      (app) =>
        app.status ===
        "Applied"
    ).length;

  const interviewCount =
    applications.filter(
      (app) =>
        app.status ===
        "Interview"
    ).length;

  const offerCount =
    applications.filter(
      (app) =>
        app.status ===
        "Offer"
    ).length;

  const rejectedCount =
    applications.filter(
      (app) =>
        app.status ===
        "Rejected"
    ).length;

  return (

    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <h2 className="logo">
          SmartJob
        </h2>

        <ul>

          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/applications">
              My Applications
            </Link>
          </li>

          <li>
            <Link to="/analytics">
              Analytics
            </Link>
          </li>

          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>

          <li>

            <button
              onClick={
                handleLogout
              }
              className="logout-btn"
            >
              Logout
            </button>

          </li>

        </ul>

      </aside>

      {/* MAIN */}
      <main className="main">

        {/* TOP */}
        <div className="top-bar">

          <div>

            <h1>

              Welcome,

              <span className="username">

                {" "}
                {user.name}

              </span>

              👋

            </h1>

            <p>
              Track your jobs and career progress.
            </p>

          </div>

        </div>

        {/* SEARCH */}
        <div className="search-box">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* STATS */}
        <div className="stats">

          <div className="stat-card applied-card">

            <h2>
              {appliedCount}
            </h2>

            <p>
              Applied
            </p>

          </div>

          <div className="stat-card interview-card">

            <h2>
              {interviewCount}
            </h2>

            <p>
              Interviews
            </p>

          </div>

          <div className="stat-card offer-card">

            <h2>
              {offerCount}
            </h2>

            <p>
              Offers
            </p>

          </div>

          <div className="stat-card rejected-card">

            <h2>
              {rejectedCount}
            </h2>

            <p>
              Rejected
            </p>

          </div>

        </div>

        {/* JOBS */}
        <section className="jobs-section">

          <h2>
            Available Jobs
          </h2>

          <div className="jobs-grid">

            {filteredJobs.length > 0 ? (

              filteredJobs.map(
                (job) => (

                  <div
                    className="job-card"
                    key={job.id}
                  >

                    <h3>
                      {job.role}
                    </h3>

                    <p>
                      {job.company}
                    </p>

                    <span>
                      {job.location}
                    </span>

                    <div className="job-buttons">

                      <button
                        className="apply-btn"
                        onClick={() =>
                          applyJob(
                            job.id
                          )
                        }
                      >
                        Apply
                      </button>

                      <button
                        className="view-btn"
                        onClick={() =>
                          setSelectedJob(
                            job
                          )
                        }
                      >
                        View
                      </button>

                    </div>

                  </div>
                )
              )

            ) : (

              <h3>
                No Jobs Available
              </h3>

            )}

          </div>

        </section>

      </main>

      {/* POPUP */}
      {selectedJob && (

        <div className="popup-overlay">

          <div className="popup">

            <h2>
              {selectedJob.role}
            </h2>

            <p>
              <strong>
                Company:
              </strong>{" "}
              {selectedJob.company}
            </p>

            <p>
              <strong>
                Location:
              </strong>{" "}
              {selectedJob.location}
            </p>

            <p>
              <strong>
                Salary:
              </strong>{" "}
              {selectedJob.salary}
            </p>

            <p>
              <strong>
                Skill:
              </strong>{" "}
              {selectedJob.skill}
            </p>

            <p>
              <strong>
                Experience:
              </strong>{" "}
              {selectedJob.experience}
            </p>

            <p>
              <strong>
                Description:
              </strong>{" "}
              {selectedJob.description}
            </p>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedJob(
                  null
                )
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Dashboard;