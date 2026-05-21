import React from "react";


const Interviews = () => {

  return (

    <div className="dashboard-container">

      <RecruiterSidebar />

      <div className="page-content">

        <h1>Interviews</h1>

        <div className="interview-card">

          <h2>John Doe</h2>

          <p>Date: 20 July 2026</p>

          <p>Time: 10:00 AM</p>

          <button>
            Join Meeting
          </button>

        </div>

      </div>

    </div>
  );
};

export default Interviews;