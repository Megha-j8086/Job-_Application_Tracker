import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Dashboard.css";

const Dashboard = () => {

  // LOGGED USER
  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) || {
      name: "User",
      email: "user@gmail.com",
    };

  // PROFILE DATA
  const profile =
    JSON.parse(localStorage.getItem("profile")) || {
      skills: ["React", "Python"],
      resume: "resume.pdf",
    };

  // SEARCH STATE
  const [search, setSearch] = useState("");

  // POPUP STATE
  const [selectedJob, setSelectedJob] =
    useState(null);

  // APPLICATIONS
  const savedApplications =
    JSON.parse(
      localStorage.getItem("applications")
    ) || [];

  // REALTIME COUNTS
  const appliedCount =
    savedApplications.filter(
      (job) => job.status === "Applied"
    ).length;

  const interviewCount =
    savedApplications.filter(
      (job) => job.status === "Interview"
    ).length;

  const offerCount =
    savedApplications.filter(
      (job) => job.status === "Offer"
    ).length;

  const rejectedCount =
    savedApplications.filter(
      (job) => job.status === "Rejected"
    ).length;

  // JOBS
  const jobs = [
    {
      company: "Google",
      role: "Frontend Developer",
      skill: "React",
      location: "Bangalore",
      salary: "12 LPA",
      description:
        "Looking for React developers with frontend experience.",
    },

    {
      company: "Amazon",
      role: "Backend Developer",
      skill: "Python",
      location: "Hyderabad",
      salary: "15 LPA",
      description:
        "Backend APIs using Python and Django.",
    },

    {
      company: "Netflix",
      role: "UI Engineer",
      skill: "React",
      location: "Remote",
      salary: "18 LPA",
      description:
        "Build modern UI components and dashboards.",
    },

    {
      company: "Microsoft",
      role: "Java Developer",
      skill: "Java",
      location: "Chennai",
      salary: "10 LPA",
      description:
        "Spring Boot backend development role.",
    },
  ];

  // MATCHED JOBS
  const matchedJobs = jobs.filter(
    (job) =>
      profile.skills.some(
        (skill) =>
          skill.toLowerCase() ===
          job.skill.toLowerCase()
      )
  );

  // OTHER JOBS
  const otherJobs = jobs.filter(
    (job) =>
      !profile.skills.some(
        (skill) =>
          skill.toLowerCase() ===
          job.skill.toLowerCase()
      )
  );

  // SEARCH FILTER
  const filteredMatchedJobs =
    matchedJobs.filter((job) =>
      job.role
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // APPLY JOB
  const applyJob = (job) => {

    const existingApplications =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    const alreadyApplied =
      existingApplications.find(
        (item) =>
          item.company === job.company &&
          item.role === job.role
      );

    if (alreadyApplied) {
      alert("⚠️ Already Applied");
      return;
    }

    const newApplication = {
      ...job,
      status: "Applied",
      appliedDate:
        new Date().toLocaleDateString(),
    };

    const updatedApplications = [
      ...existingApplications,
      newApplication,
    ];

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    alert("✅ Applied Successfully");

    window.location.reload();
  };

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
            <Link to="/">
              Logout
            </Link>
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
              Discover jobs matching your
              skills and track your career
              journey.
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
              setSearch(e.target.value)
            }
          />

        </div>

        {/* STATS */}
        <div className="stats">

          <div className="stat-card applied-card">
            <h2>{appliedCount}</h2>
            <p>Appliedcations</p>
          </div>

          <div className="stat-card interview-card">
            <h2>{interviewCount}</h2>
            <p>Interviews</p>
          </div>

          <div className="stat-card offer-card">
            <h2>{offerCount}</h2>
            <p>Offers</p>
          </div>

          <div className="stat-card rejected-card">
            <h2>{rejectedCount}</h2>
            <p>Rejections</p>
          </div>

        </div>

        {/* RECOMMENDED JOBS */}
        <section className="jobs-section">

          <h2>Recommended Jobs</h2>

          <div className="jobs-grid">

            {filteredMatchedJobs.map(
              (job, index) => (

                <div
                  className="job-card"
                  key={index}
                >

                  <h3>{job.role}</h3>

                  <p>{job.company}</p>

                  <span>{job.location}</span>

                  <div className="job-buttons">

                    <button
                      className="apply-btn"
                      onClick={() =>
                        applyJob(job)
                      }
                    >
                      Apply
                    </button>

                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelectedJob(job)
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

      {/* POPUP */}
      {selectedJob && (

        <div className="popup-overlay">

          <div className="popup">

            <h2>
              {selectedJob.role}
            </h2>

            <p>
              <strong>Company:</strong>{" "}
              {selectedJob.company}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedJob.location}
            </p>

            <p>
              <strong>Salary:</strong>{" "}
              {selectedJob.salary}
            </p>

            <p>
              <strong>Skill:</strong>{" "}
              {selectedJob.skill}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {selectedJob.description}
            </p>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedJob(null)
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