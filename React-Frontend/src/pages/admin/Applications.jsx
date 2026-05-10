// ==========================
// Applications.jsx
// ==========================

import React from "react";

const Applications = () => {

  const applications = [
    {
      user: "Megha",
      company: "Google",
      role: "Frontend Developer",
      status: "Applied",
    },

    {
      user: "Arjun",
      company: "Amazon",
      role: "Backend Developer",
      status: "Interview",
    },
  ];

  const styles = {

    page: {
      padding: "40px",
      background: "#f3f4f6",
      minHeight: "100vh",
      fontFamily: "Arial",
    },

    heading: {
      marginBottom: "25px",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "white",
      borderRadius: "15px",
      overflow: "hidden",
    },

    th: {
      background: "#7c3aed",
      color: "white",
      padding: "15px",
      textAlign: "left",
    },

    td: {
      padding: "15px",
      borderBottom: "1px solid #eee",
    },

  };

  return (

    <div style={styles.page}>

      <h1 style={styles.heading}>
        Applications
      </h1>

      <table style={styles.table}>

        <thead>

          <tr>

            <th style={styles.th}>
              User
            </th>

            <th style={styles.th}>
              Company
            </th>

            <th style={styles.th}>
              Role
            </th>

            <th style={styles.th}>
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {applications.map((app, index) => (

            <tr key={index}>

              <td style={styles.td}>
                {app.user}
              </td>

              <td style={styles.td}>
                {app.company}
              </td>

              <td style={styles.td}>
                {app.role}
              </td>

              <td style={styles.td}>
                {app.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Applications;