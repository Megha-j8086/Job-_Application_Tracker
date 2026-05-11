import React, {
  useEffect,
  useState,
} from "react";

import API from "../../api/api";

import {
  useNavigate,
} from "react-router-dom";

const ManageUsers = () => {

  const navigate =
    useNavigate();

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const res =
        await API.get("/users/");

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteUser = async (id) => {

    try {

      await API.delete(
        `/users/delete/${id}/`
      );

      alert("User Deleted");

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div style={styles.page}>

      <button
        style={styles.backBtn}
        onClick={() =>
          navigate("/admin-dashboard")
        }
      >
        ← Back to Dashboard
      </button>

      <h1>
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
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td style={styles.td}>
                {user.name}
              </td>

              <td style={styles.td}>
                {user.email}
              </td>

              <td style={styles.td}>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    deleteUser(user.id)
                  }
                >
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

const styles = {

  page: {
    padding: "40px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  backBtn: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
  },

  th: {
    background: "#4f46e5",
    color: "white",
    padding: "15px",
    textAlign: "left",
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

};

export default ManageUsers;