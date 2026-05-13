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
  const navigate =
    useNavigate();

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

  // JOB VIEW POPUP
  const [selectedJob, setSelectedJob] =
    useState(null);

  // ADD JOB POPUP
  const [showAddPopup, setShowAddPopup] =
    useState(false);

  // NEW JOB FORM
  const [newJob, setNewJob] =
    useState({
      company: "",
      role: "",
      skill: "",
      location: "",
      salary: "",
      description: "",
    });

  // LOAD DATA
  useEffect(() => {

    const token =
      localStorage.getItem(
        "access"
      );

    // CHECK LOGIN
    if (!token) {

      navigate("/login");

    }

    const loggedUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (loggedUser) {

      setUser(loggedUser);

    }

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
            "/applications/"
          );

        setApplications(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // APPLY JOB
    const applyJob = async (job) => {

  try {

    const res = await API.post(
      "/applications/",
      {
        company: job.company,
        role: job.role,
        status: "Applied"
      }
    );

    console.log(res.data);

    alert("Job Applied Successfully");

  } catch (error) {

    console.log(error.response?.data);

    alert(
      error.response?.data?.error ||
      "Application Failed"
    );
  }
};

  // ADD NEW JOB
     const handleAddJob = async () => {
  try {
   await API.post("/jobs/add/", newJob); // ✅ FIXED

    alert("✅ Job Added Successfully");

    setShowAddPopup(false);

    setNewJob({
      company: "",
      role: "",
      skill: "",
      location: "",
      salary: "",
      description: "",
    });

    fetchJobs();
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Failed to add job");
  }
};

  // LOGOUT
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

  // SEARCH FILTER
  const filteredJobs =
    jobs.filter((job) =>
      job.role
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // COUNTS
  const appliedCount =
    applications.filter(
      (job) =>
        job.status ===
        "Applied"
    ).length;

  const interviewCount =
    applications.filter(
      (job) =>
        job.status ===
        "Interview"
    ).length;

  const offerCount =
    applications.filter(
      (job) =>
        job.status ===
        "Offer"
    ).length;

  const rejectedCount =
    applications.filter(
      (job) =>
        job.status ===
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
              </span>{" "}
              👋
            </h1>

            <p>
              Track your jobs and
              career progress.
            </p>

          </div>

          {/* ADD JOB BUTTON */}
          <button
            className="add-job-btn"
            onClick={() =>
              setShowAddPopup(
                true
              )
            }
          >
            + Add Job
          </button>

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

            {filteredJobs.map(
              (job, index) => (

                <div
                  className="job-card"
                  key={index}
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
                          job
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
            )}

          </div>

        </section>

      </main>

      {/* VIEW JOB POPUP */}
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
              {
                selectedJob.company
              }
            </p>

            <p>
              <strong>
                Location:
              </strong>{" "}
              {
                selectedJob.location
              }
            </p>

            <p>
              <strong>
                Salary:
              </strong>{" "}
              {
                selectedJob.salary
              }
            </p>

            <p>
              <strong>
                Skill:
              </strong>{" "}
              {
                selectedJob.skill
              }
            </p>

            <p>
              <strong>
                Description:
              </strong>{" "}
              {
                selectedJob.description
              }
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

      {/* ADD JOB POPUP */}
      {showAddPopup && (

        <div className="popup-overlay">

          <div className="popup">

            <h2>
              Add New Job
            </h2>

            <input
              type="text"
              placeholder="Company"
              value={
                newJob.company
              }
              onChange={(e) =>
                setNewJob({
                  ...newJob,
                  company:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Role"
              value={newJob.role}
              onChange={(e) =>
                setNewJob({
                  ...newJob,
                  role:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Skill"
              value={newJob.skill}
              onChange={(e) =>
                setNewJob({
                  ...newJob,
                  skill:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Location"
              value={
                newJob.location
              }
              onChange={(e) =>
                setNewJob({
                  ...newJob,
                  location:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Salary"
              value={newJob.salary}
              onChange={(e) =>
                setNewJob({
                  ...newJob,
                  salary:
                    e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              value={
                newJob.description
              }
              onChange={(e) =>
                setNewJob({
                  ...newJob,
                  description:
                    e.target.value,
                })
              }
            />

            <div className="popup-buttons">

              <button
                className="apply-btn"
                onClick={
                  handleAddJob
                }
              >
                Add Job
              </button>

              <button
                className="close-btn"
                onClick={() =>
                  setShowAddPopup(
                    false
                  )
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Dashboard;