import React from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();

  // Check login status
  const isLoggedIn =
    localStorage.getItem("access");

  // Logout function
  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/log");
  };

  return (

    <nav className="navbar">

      <h2 className="logo">
        SmartJob Tracker
      </h2>

      {/* Always Visible Nav Links */}
      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/trackjobs">
            Track Jobs
          </Link>
        </li>

        <li>
          <a href="#features">
            Features
          </a>
        </li>

        <li>
          <Link to="/about">
            About
          </Link>
        </li>

      </ul>

      {/* Auth Buttons */}
      <div className="auth-buttons">

        {isLoggedIn ? (

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        ) : (

          <>
            <Link to="/log">
              <button className="login-btn">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="register-btn">
                Register
              </button>
            </Link>
          </>

        )}

      </div>

    </nav>
  );
};

export default Navbar;