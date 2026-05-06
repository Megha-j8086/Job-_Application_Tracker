import React, { useState } from "react";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const user = { name: "Megha", skills: ["React", "Python"] };

  const [search, setSearch] = useState("");

  const jobs = [
    { company: "Google", role: "Frontend Developer", skill: "React" },
    { company: "Amazon", role: "Backend Developer", skill: "Python" },
    { company: "Netflix", role: "UI Engineer", skill: "React" },
  ];

  const filteredJobs = jobs.filter(job =>
    job.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>SmartJob</h2>
        <ul>
          <li>Dashboard</li>
          <li>Track Jobs</li>
          <li>My Applications</li>
          <li>Analytics</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">

        <h1>Welcome, {user.name} 👋</h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search jobs..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* STATS */}
        <div className="stats">
          <div className="card">12 Applied</div>
          <div className="card">5 Interviews</div>
          <div className="card">3 Offers</div>
        </div>

        {/* JOB LIST */}
        <div className="jobs">
          <h2>Recommended Jobs</h2>

          {filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.role}</h3>
              <p>{job.company}</p>
              <button>Apply</button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;