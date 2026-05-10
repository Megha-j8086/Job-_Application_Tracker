import React from "react";
import "../../styles/AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-page">

      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <ul>
          <li>
            <Link to="/admin">
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
              Admin Analytics
            </Link>
          </li>
         
        </ul>
      </aside>

      <main className="admin-main">

        <h1>Admin Dashboard</h1>

        <div className="admin-cards">

          <div className="admin-card blue">
            <h2>120</h2>
            <p>Total Users</p>
          </div>

          <div className="admin-card green">
            <h2>45</h2>
            <p>Total Jobs</p>
          </div>

          <div className="admin-card purple">
            <h2>230</h2>
            <p>Applications</p>
          </div>

          <div className="admin-card orange">
            <h2>18</h2>
            <p>Offers</p>
          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;