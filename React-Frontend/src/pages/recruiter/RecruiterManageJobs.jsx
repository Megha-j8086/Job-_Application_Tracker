import React from "react";

import RecruiterSidebar from "../../components/RecruiterSidebar";

const RecruiterManageJobs = () => {

  return (

    <div className="dashboard-container">

      <RecruiterSidebar />

      <div className="page-content">

        <h1>Manage Jobs</h1>

        <div className="job-card">

          <h2>Frontend Developer</h2>

          <p>Google</p>

          <button>Edit</button>

          <button>Delete</button>

        </div>

      </div>

    </div>
  );
};

export default RecruiterManageJobs;