import React from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import "../styles/RecruiterSidebar.css";

const RecruiterSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/log");
  };

  return (

    <div className="sidebar">

      <h2 className="sidebar-logo">
        Recruiter Panel
      </h2>

      <ul>

        <li>
          <Link to="/recruiter-dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/addjob">
            Add Job
          </Link>
        </li>

        <li>
          <Link to="/managejobs">
            Manage Jobs
          </Link>
        </li>

        <li>
          <Link to="/applicants">
            Applicants
          </Link>
        </li>

        <li>
          <Link to="/interviews">
            Interviews
          </Link>
        </li>

      </ul>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
};

export default RecruiterSidebar;