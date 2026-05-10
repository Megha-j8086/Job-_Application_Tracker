
import React from "react";

const AdminAnalytics = () => {

  const styles = {

    page: {
      padding: "40px",
      background: "#eef2ff",
      minHeight: "100vh",
      fontFamily: "Arial",
    },

    heading: {
      marginBottom: "30px",
    },

    cards: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
    },

    card: {
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      textAlign: "center",
      boxShadow:
        "0 5px 15px rgba(0,0,0,0.08)",
    },

    number: {
      color: "#4f46e5",
      fontSize: "2rem",
    },

  };

  return (

    <div style={styles.page}>

      <h1 style={styles.heading}>
        Analytics
      </h1>

      <div style={styles.cards}>

        <div style={styles.card}>
          <h2 style={styles.number}>
            85%
          </h2>

          <p>Hiring Rate</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.number}>
            1200
          </h2>

          <p>Monthly Visitors</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.number}>
            320
          </h2>

          <p>Active Users</p>
        </div>

      </div>

    </div>
  );
};

export default AdminAnalytics;