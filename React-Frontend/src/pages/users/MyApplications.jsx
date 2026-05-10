import React, { useState } from "react";
import "../../styles/MyApplications.css";
import { Link } from "react-router-dom";

const MyApplications = () => {

  // GET APPLICATIONS
  const [applications, setApplications] =
    useState(
      JSON.parse(
        localStorage.getItem("applications")
      ) || []
    );

  // DELETE APPLICATION
  const handleDelete = (index) => {

    const updatedApplications =
      applications.filter(
        (_, i) => i !== index
      );

    setApplications(updatedApplications);

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    alert("❌ Application Deleted");
  };

  return (
    <div className="applications-page">

      <Link
        to="/dashboard"
        className="back-link"
      >
        ← Back to Dashboard
      </Link>

      <h1>My Applications</h1>

      {applications.length > 0 ? (

        applications.map((job, index) => (
         <div className="application-card" key={index}>

  <div>
    <h3>{job.role}</h3>
    <p>{job.company}</p>
  </div>

  <div className="application-actions">

    <span className="status">
      Applied
    </span>

    <button
      className="delete-btn"
      onClick={() => handleDelete(index)}
    >
      Delete
    </button>

  </div>

</div>
         
        ))

      ) : (

        <p className="empty-text">
          No Applications Found
        </p>

      )}

    </div>
  );
};

export default MyApplications;