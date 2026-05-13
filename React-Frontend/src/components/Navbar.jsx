import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {

  return (
    <nav className="navbar">
      <h2 className="logo">SmartJob Tracker</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/trackjobs">Track Jobs</Link></li>
        <li>
        <a href="#features">Features</a></li>
        
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="auth-buttons">
        <Link to="/log"><button className="login-btn">Login</button></Link>
        <Link to="/register"><button className="register-btn">Register</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;