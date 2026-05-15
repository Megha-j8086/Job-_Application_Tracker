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

  // SELECTED USER
  const [selectedUser, setSelectedUser] =
    useState(null);

  // FORM STATES
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  // FETCH USERS
  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const res =
        await API.get("admin/users/");

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE USER
  const deleteUser = async (id) => {

    try {

      await API.delete(
        `/admin/users/delete/${id}/`
      );

      alert("User Deleted");

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };

  // OPEN UPDATE POPUP
  const openUpdate = (user) => {

    setSelectedUser(user);

    setName(user.first_name);

    setEmail(user.email);
  };

  // UPDATE USER
  const updateUser = async () => {

    try {

      await API.put(
        `/admin/users/update/${selectedUser.id}/`,
        {
          name,
          email,
        }
      );

      alert("User Updated");

      setSelectedUser(null);

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };

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

      <h1>
        Manage Users
      </h1>

      {/* TABLE */}
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
                {user.first_name}
              </td>

              <td style={styles.td}>
                {user.email}
              </td>

              <td style={styles.td}>

                {/* UPDATE BUTTON */}
                <button
                  style={styles.updateBtn}
                  onClick={() =>
                    openUpdate(user)
                  }
                >
                  Update
                </button>

                {/* DELETE BUTTON */}
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

      {/* UPDATE POPUP */}
      {selectedUser && (

        <div style={styles.overlay}>

          <div style={styles.popup}>

            <h2>
              Update User
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              style={styles.input}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={styles.input}
            />

            <div>

              <button
                style={styles.saveBtn}
                onClick={updateUser}
              >
                Save
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() =>
                  setSelectedUser(null)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

const styles = {

  page: {
    padding: "40px",
    background: "#f5f7fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  backBtn: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
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

  updateBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  saveBtn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#9ca3af",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  },

};

export default ManageUsers;