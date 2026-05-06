import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">SmartJob Tracker</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/trackjob">Track Jobs</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="auth-buttons">
        <Link to="/log"><button className="btn outline">Login</button></Link>
        <Link to="/register"><button className="btn primary">Register</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;