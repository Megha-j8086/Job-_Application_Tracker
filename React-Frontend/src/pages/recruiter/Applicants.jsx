import React from "react";



const Applicants = () => {

  return (

    <div className="dashboard-container">

      <RecruiterSidebar />

      <div className="page-content">

        <h1>Applicants</h1>

        <div className="applicant-card">

          <h2>John Doe</h2>

          <p>Skills: React, Django</p>

          <button>
            View Resume
          </button>

          <button>
            Schedule Interview
          </button>

        </div>

      </div>

    </div>
  );
};

export default Applicants;