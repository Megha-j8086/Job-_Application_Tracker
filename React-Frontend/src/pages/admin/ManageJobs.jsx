
import React from "react";

const ManageJobs = () => {

  const jobs = [
    {
      company: "Google",
      role: "Frontend Developer",
    },

    {
      company: "Amazon",
      role: "Backend Developer",
    },
  ];

  const styles = {

    page: {
      padding: "40px",
      background: "#f9fafb",
      minHeight: "100vh",
      fontFamily: "Arial",
    },

    heading: {
      marginBottom: "20px",
    },

    addBtn: {
      background: "#4f46e5",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      marginBottom: "25px",
      cursor: "pointer",
    },

    jobsList: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
    },

    card: {
      background: "white",
      padding: "25px",
      borderRadius: "18px",
      boxShadow:
        "0 5px 15px rgba(0,0,0,0.08)",
    },

    actions: {
      marginTop: "20px",
      display: "flex",
      gap: "10px",
    },

    editBtn: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      background: "#3b82f6",
      color: "white",
      cursor: "pointer",
    },

    deleteBtn: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      background: "#ef4444",
      color: "white",
      cursor: "pointer",
    },

  };

  return (

    <div style={styles.page}>

      <h1 style={styles.heading}>
        Manage Jobs
      </h1>

      <button style={styles.addBtn}>
        Add Job
      </button>

      <div style={styles.jobsList}>

        {jobs.map((job, index) => (

          <div style={styles.card} key={index}>

            <h3>{job.role}</h3>

            <p>{job.company}</p>

            <div style={styles.actions}>

              <button style={styles.editBtn}>
                Edit
              </button>

              <button style={styles.deleteBtn}>
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ManageJobs;