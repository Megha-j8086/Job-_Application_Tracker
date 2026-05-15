import React, {
  useEffect,
  useState,
} from "react";

import API from "../../api/api";

import {
  useNavigate,
} from "react-router-dom";

const ManageJobs = () => {

  // NAVIGATE
  const navigate =
    useNavigate();

  // JOBS
  const [jobs, setJobs] =
    useState([]);

  // UPDATE POPUP
  const [selectedJob, setSelectedJob] =
    useState(null);

  // ADD POPUP
  const [showAddPopup, setShowAddPopup] =
    useState(false);

  // FORM DATA
  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  const [location, setLocation] =
    useState("");
  const [skill, setSkill] =
  useState("");
   const [experience, setExperience] =
  useState("");

const [salary, setSalary] =
  useState("");

const [description, setDescription] =
  useState("");

  // FETCH JOBS
  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const res =
        await API.get("/admin/jobs/");

      setJobs(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE JOB
  const deleteJob = async (id) => {

    try {

      await API.delete(
        `/admin/jobs/delete/${id}/`
      );

      alert("Job Deleted");

      fetchJobs();

    } catch (error) {

      console.log(error);

    }
  };

  // OPEN UPDATE
  const openUpdate = (job) => {

    setSelectedJob(job);

    setCompany(job.company);

    setRole(job.role);

    setLocation(job.location);
  };

  // UPDATE JOB
  const updateJob = async () => {

    try {

      await API.put(
        `/admin/jobs/update/${selectedJob.id}/`,
        {
          company,
          role,
          location,
        }
      );

      alert("Job Updated");

      setSelectedJob(null);

      fetchJobs();

    } catch (error) {

      console.log(error);

    }
  };

  // ADD JOB
  const addJob = async () => {

    try {

      await API.post(
        "/admin/jobs/add/",
        {
          company,
          role,
          skill,
          experience,
          location,
          salary,
          description,
        }
      );

      alert("Job Added");

      setShowAddPopup(false);

      setCompany("");
      setRole("");
      setSkill("");
      setExperience("");
      setLocation("");
      setSalary("");
      setDescription("");

      fetchJobs();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div style={styles.page}>

      {/* TOP BAR */}
      <div style={styles.topBar}>

        <button
          style={styles.backBtn}
          onClick={() =>
            navigate("/admin-dashboard")
          }
        >
          ← Back
        </button>

        <button
          style={styles.addBtn}
          onClick={() =>
            setShowAddPopup(true)
          }
        >
          + Add Job
        </button>

      </div>

      {/* TITLE */}
      <h1>
        Manage Jobs
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
              Location
            </th>

            <th style={styles.th}>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {jobs.map((job) => (

            <tr key={job.id}>

              <td style={styles.td}>
                {job.company}
              </td>

              <td style={styles.td}>
                {job.role}
              </td>

              <td style={styles.td}>
                {job.location}
              </td>

              <td style={styles.td}>

                <button
                  style={styles.updateBtn}
                  onClick={() =>
                    openUpdate(job)
                  }
                >
                  Update
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    deleteJob(job.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* ADD JOB POPUP */}
      {showAddPopup && (

        <div style={styles.overlay}>

          <div style={styles.popup}>

            <h2>
              Add Job
            </h2>

            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) =>
                setCompany(
                  e.target.value
                )
              }
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
              style={styles.input}
            />
            <input
            type="text"
            placeholder="Skill"
            value={skill}
            onChange={(e) =>
              setSkill(e.target.value)
            }
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
            style={styles.input}
          />
            <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) =>
              setSalary(e.target.value)
            }
            style={styles.input}
          />
                <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        style={styles.textarea}
      />

            <div>

              <button
                style={styles.saveBtn}
                onClick={addJob}
              >
                Add Job
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() =>
                  setShowAddPopup(false)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

      {/* UPDATE POPUP */}
      {selectedJob && (

        <div style={styles.overlay}>

          <div style={styles.popup}>

            <h2>
              Update Job
            </h2>

            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) =>
                setCompany(
                  e.target.value
                )
              }
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
              style={styles.input}
            />

            <div>

              <button
                style={styles.saveBtn}
                onClick={updateJob}
              >
                Save
              </button>

              <button
                style={styles.cancelBtn}
                onClick={() =>
                  setSelectedJob(null)
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

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  backBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  addBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
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
  textarea: {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  minHeight: "100px",
},

};

export default ManageJobs;