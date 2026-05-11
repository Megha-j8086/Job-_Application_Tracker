import React, {
  useEffect,
  useState,
} from "react";

import API from "../../api/api";

import {
  useNavigate,
} from "react-router-dom";

const ManageApplications = () => {

  // NAVIGATE
  const navigate =
    useNavigate();

  // APPLICATIONS
  const [applications, setApplications] =
    useState([]);

  // FETCH DATA
  useEffect(() => {

    fetchApplications();

  }, []);

  // FETCH APPLICATIONS
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

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/applications/update/${id}/`,
        {
          status,
        }
      );

      fetchApplications();

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

      {/* TITLE */}
      <h1>
        Manage Applications
      </h1>

      {/* TABLE */}
      <table style={styles.table}>

        <thead>

          <tr>

            <th style={styles.th}>
              Company
            </th>

            <th style={styles.th}>
              Role
            </th>

            <th style={styles.th}>
              Status
            </th>

            <th style={styles.th}>
              Update
            </th>

          </tr>

        </thead>

        <tbody>

          {applications.map(
            (app) => (

              <tr key={app.id}>

                <td style={styles.td}>
                  {app.company}
                </td>

                <td style={styles.td}>
                  {app.role}
                </td>

                <td style={styles.td}>
                  {app.status}
                </td>

                <td style={styles.td}>

                  <select
                    style={styles.select}
                    value={
                      app.status
                    }
                    onChange={(e) =>
                      updateStatus(
                        app.id,
                        e.target.value
                      )
                    }
                  >

                    <option>
                      Applied
                    </option>

                    <option>
                      Interview
                    </option>

                    <option>
                      Offer
                    </option>

                    <option>
                      Rejected
                    </option>

                  </select>

                </td>

              </tr>
            )
          )}

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
    fontFamily: "Arial",
  },

  backBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    marginTop: "20px",
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

  select: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },

};

export default ManageApplications;