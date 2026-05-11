import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../../api/api";

import "../../styles/MyApplications.css";

const MyApplications = () => {

  const [applications, setApplications] =
    useState([]);

  // FETCH APPLICATIONS
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

  // DELETE APPLICATION
  const handleDelete = async (id) => {

    try {

      await API.delete(
        `/applications/${id}/`
      );

      fetchApplications();

      alert(
        "Application Deleted"
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="applications-page">

      <Link
        to="/dashboard"
        className="back-link"
      >
        ← Back to Dashboard
      </Link>

      <h1>
        My Applications
      </h1>

      {applications.length > 0 ? (

        applications.map((job) => (

          <div
            className="application-card"
            key={job.id}
          >

            <div>

              <h3>
                {job.role}
              </h3>

              <p>
                {job.company}
              </p>

            </div>

            <div className="application-actions">

              <span
                className={`status ${job.status.toLowerCase()}`}
              >
                {job.status}
              </span>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(job.id)
                }
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