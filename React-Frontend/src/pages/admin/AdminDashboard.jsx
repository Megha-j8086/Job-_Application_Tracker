import React, {
  useEffect,
  useState,
} from "react";

import "../../styles/AdminDashboard.css";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../../api/api";

const AdminDashboard = () => {

  // =========================
  // NAVIGATE
  // =========================
  const navigate =
    useNavigate();

  // =========================
  // STATE
  // =========================
  const [applications,
    setApplications] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {

    const token =
      localStorage.getItem(
        "access"
      );

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    // CHECK LOGIN
    if (!token) {

      navigate("/log");
      return;

    }

    // CHECK ADMIN
    if (!user?.is_staff) {

      alert(
        "Admin Access Only"
      );

      navigate("/dashboard");

      return;

    }

    fetchApplications();

  }, []);

  // =========================
  // FETCH APPLICATIONS
  // =========================
  const fetchApplications =
    async () => {

      try {

        const res =
          await API.get(
            "/admin/applications/"
          );

        console.log(
          "ADMIN APPLICATIONS:",
          res.data
        );

        setApplications(
          res.data
        );

      }

      catch (error) {

        console.log(
          error.response?.data
        );

      }

      finally {

        setLoading(false);

      }
    };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout =
    () => {

      localStorage.removeItem(
        "access"
      );

      localStorage.removeItem(
        "refresh"
      );

      localStorage.removeItem(
        "user"
      );

      alert(
        "Logged Out"
      );

      navigate("/");

    };

  // =========================
  // COUNTS
  // =========================
  const totalApplications =
    applications.length;

  const appliedCount =
    applications.filter(
      (app) =>
        app.status ===
        "Applied"
    ).length;

  const interviewCount =
    applications.filter(
      (app) =>
        app.status ===
        "Interview"
    ).length;

  const offerCount =
    applications.filter(
      (app) =>
        app.status ===
        "Offer"
    ).length;

  const rejectedCount =
    applications.filter(
      (app) =>
        app.status ===
        "Rejected"
    ).length;

  return (

    <div className="admin-page">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <h2>
          Admin Panel
        </h2>

        <ul>

          <li>
            <Link to="/admin-dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/manage-users">
              Manage Users
            </Link>
          </li>

          <li>
            <Link to="/manage-jobs">
              Manage Jobs
            </Link>
          </li>

          <li>
            <Link to="/admin-applications">
              Applications
            </Link>
          </li>

          <li>
            <Link to="/admin-analytics">
              Analytics
            </Link>
          </li>

          <li>

            <button
              className="logout-btn"
              onClick={
                handleLogout
              }
            >
              Logout
            </button>

          </li>

        </ul>

      </aside>

      {/* MAIN */}
      <main className="admin-main">

        <h1>
          Admin Dashboard
        </h1>

        {loading ? (

          <h2>
            Loading...
          </h2>

        ) : (

          <div className="admin-cards">

            {/* TOTAL */}
            <div className="admin-card blue">

              <h2>
                {totalApplications}
              </h2>

              <p>
                Total Applications
              </p>

            </div>

            {/* APPLIED */}
            <div className="admin-card green">

              <h2>
                {appliedCount}
              </h2>

              <p>
                Applied
              </p>

            </div>

            {/* INTERVIEW */}
            <div className="admin-card purple">

              <h2>
                {interviewCount}
              </h2>

              <p>
                Interviews
              </p>

            </div>

            {/* OFFER */}
            <div className="admin-card orange">

              <h2>
                {offerCount}
              </h2>

              <p>
                Offers
              </p>

            </div>

            {/* REJECTED */}
            <div className="admin-card red">

              <h2>
                {rejectedCount}
              </h2>

              <p>
                Rejected
              </p>

            </div>

          </div>

        )}

      </main>

    </div>
  );
};

export default AdminDashboard;