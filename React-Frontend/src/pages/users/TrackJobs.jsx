import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Trackjob.css";

const TrackJobs = () => {
  return (

    <div className="track-page">

      <div className="track-container">

        {/* LEFT CONTENT */}
        <div className="track-content">

          <h1>
            Track Your Job Applications Easily
          </h1>

          <p>
            SmartJob helps you organize,
            monitor, and manage all your
            job applications in one place.
          </p>

          <div className="track-buttons">

            <Link to="/register">
              <button className="create-btn">
                Create Account
              </button>
            </Link>

            <Link to="/log">
              <button className="login-btn">
                Login
              </button>
            </Link>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="track-image">

          <img
            src="/dashboard.png"
            alt="track jobs"
          />

        </div>

      </div>

    </div>
  );
};

export default TrackJobs;