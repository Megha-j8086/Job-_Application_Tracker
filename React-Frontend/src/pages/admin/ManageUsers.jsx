// ==========================
// ManageUsers.jsx
// ==========================

import React from "react";

const ManageUsers = () => {

  const users = [
    {
      name: "Megha",
      email: "megha@gmail.com",
    },

    {
      name: "Arjun",
      email: "arjun@gmail.com",
    },
  ];

  const styles = {

    page: {
      padding: "40px",
      background: "#f8fafc",
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
      background: "#4f46e5",
      color: "white",
      padding: "16px",
      textAlign: "left",
    },

    td: {
      padding: "16px",
      borderBottom: "1px solid #eee",
    },

    button: {
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
    },

  };

  return (

    <div style={styles.page}>

      <h1 style={styles.heading}>
        Manage Users
      </h1>

      <table style={styles.table}>

        <thead>

          <tr>

            <th style={styles.th}>
              Name
            </th>

            <th style={styles.th}>
              Email
            </th>

            <th style={styles.th}>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user, index) => (

            <tr key={index}>

              <td style={styles.td}>
                {user.name}
              </td>

              <td style={styles.td}>
                {user.email}
              </td>

              <td style={styles.td}>

                <button style={styles.button}>
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ManageUsers;