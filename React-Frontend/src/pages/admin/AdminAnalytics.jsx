import React, {
  useEffect,
  useState,
} from "react";

import API from "../../api/api";

import {
  useNavigate,
} from "react-router-dom";

const AdminAnalytics = () => {

  // NAVIGATE
  const navigate =
    useNavigate();

  // STATE
  const [applications, setApplications] =
    useState([]);

  // FETCH
  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const res =
        await API.get(
          "/applications/"
        );

      setApplications(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // COUNTS
  const total =
    applications.length;

  const applied =
    applications.filter(
      (app) =>
        app.status === "Applied"
    ).length;

  const interviews =
    applications.filter(
      (app) =>
        app.status === "Interview"
    ).length;

  const offers =
    applications.filter(
      (app) =>
        app.status === "Offer"
    ).length;

  const rejected =
    applications.filter(
      (app) =>
        app.status === "Rejected"
    ).length;

  return (

    <div style={styles.page}>

      {/* BACK BUTTON */}
      <button
        style={styles.backBtn}
        onClick={() =>
          navigate("/admin-dashboard")
        }
      >
        ← Back to Dashboard
      </button>

      {/* TITLE */}
      <h1>
        Admin Analytics
      </h1>

      {/* CARDS */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <h2>{total}</h2>
          <p>Total</p>
        </div>

        <div style={styles.card}>
          <h2>{applied}</h2>
          <p>Applied</p>
        </div>

        <div style={styles.card}>
          <h2>{interviews}</h2>
          <p>Interviews</p>
        </div>

        <div style={styles.card}>
          <h2>{offers}</h2>
          <p>Offers</p>
        </div>

        <div style={styles.card}>
          <h2>{rejected}</h2>
          <p>Rejected</p>
        </div>

      </div>

    </div>
  );
};

const styles = {

  page: {
    padding: "40px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  backBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background:
      "#4f46e5",
    color: "white",
    cursor: "pointer",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",

    gap: "20px",

    marginTop: "30px",
  },

  card: {
    background:
      "white",

    color: "black",

    padding: "30px",

    borderRadius: "14px",

    textAlign: "center",

    boxShadow:
      "0 5px 15px rgba(0,0,0,0.1)",
  },

};

export default AdminAnalytics;