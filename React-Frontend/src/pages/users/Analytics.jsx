import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../../api/api";

import "../../styles/Analytics.css";

const Analytics = () => {

  // APPLICATIONS STATE
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

  // TOTAL COUNTS
  const totalApplications =
    applications.length;

  const appliedCount =
    applications.filter(
      (job) =>
        job.status === "Applied"
    ).length;

  const interviewCount =
    applications.filter(
      (job) =>
        job.status === "Interview"
    ).length;

  const offerCount =
    applications.filter(
      (job) =>
        job.status === "Offer"
    ).length;

  const rejectedCount =
    applications.filter(
      (job) =>
        job.status === "Rejected"
    ).length;

  // PERCENTAGES
  const interviewRate =
    totalApplications > 0
      ? (
          (interviewCount /
            totalApplications) *
          100
        ).toFixed(0)
      : 0;

  const offerRate =
    totalApplications > 0
      ? (
          (offerCount /
            totalApplications) *
          100
        ).toFixed(0)
      : 0;

  return (

    <div className="analytics-page">

      {/* HEADER */}
      <div className="analytics-header">

        <div>

          <Link
            to="/dashboard"
            className="back-link"
          >
            ← Back to Dashboard
          </Link>

          <h1>
            Job Analytics Dashboard
          </h1>

          <p>
            Track your application
            progress in realtime
          </p>

        </div>

      </div>

      {/* STAT CARDS */}
      <div className="analytics-stats">

        <div className="analytics-card applied">

          <h2>
            {appliedCount}
          </h2>

          <p>Applied</p>

        </div>

        <div className="analytics-card interview">

          <h2>
            {interviewCount}
          </h2>

          <p>Interviews</p>

        </div>

        <div className="analytics-card offer">

          <h2>
            {offerCount}
          </h2>

          <p>Offers</p>

        </div>

        <div className="analytics-card rejected">

          <h2>
            {rejectedCount}
          </h2>

          <p>Rejected</p>

        </div>

      </div>

      {/* PROGRESS SECTION */}
      <div className="progress-section">

        {/* INTERVIEW RATE */}
        <div className="progress-card">

          <h3>
            Interview Success Rate
          </h3>

          <div className="progress-bar">

            <div
              className="progress-fill interview-fill"
              style={{
                width:
                  `${interviewRate}%`,
              }}
            ></div>

          </div>

          <p>
            {interviewRate}%
          </p>

        </div>

        {/* OFFER RATE */}
        <div className="progress-card">

          <h3>
            Offer Success Rate
          </h3>

          <div className="progress-bar">

            <div
              className="progress-fill offer-fill"
              style={{
                width:
                  `${offerRate}%`,
              }}
            ></div>

          </div>

          <p>
            {offerRate}%
          </p>

        </div>

      </div>

      {/* APPLICATION TABLE */}
      <div className="status-section">

        <h2>
          Application Status
        </h2>

        {applications.length > 0 ? (

          <table>

            <thead>

              <tr>

                <th>
                  Company
                </th>

                <th>
                  Role
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {applications.map(
                (job) => (

                  <tr key={job.id}>

                    <td>
                      {job.company}
                    </td>

                    <td>
                      {job.role}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${job.status.toLowerCase()}`}
                      >
                        {job.status}
                      </span>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        ) : (

          <p className="empty-text">
            No Applications Found
          </p>

        )}

      </div>

      {/* RECENT ACTIVITY */}
      <div className="activity-section">

        <h2>
          Recent Activity
        </h2>

        {applications.length > 0 ? (

          applications.map(
            (job) => (

              <div
                className="activity-card"
                key={job.id}
              >

                ✅ Applied for{" "}

                <strong>
                  {job.role}
                </strong>

                {" "}at{" "}

                <strong>
                  {job.company}
                </strong>

              </div>
            )
          )

        ) : (

          <p className="empty-text">
            No Recent Activity
          </p>

        )}

      </div>

    </div>
  );
};

export default Analytics;