import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/RecruiterLogin.css";

const RecruiterLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await API.post(
        "users/login/",
        {
          username: email,
          password: password,
        }
      );

      localStorage.setItem(
        "access",
        res.data.access
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // ROLE CHECK
      if (res.data.user.role !== "recruiter") {

        alert("Not a recruiter");

        return;
      }

      navigate("/recruiter/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login failed");
    }
  };

  return (

    <div className="recruiter-login-page">

      <div className="recruiter-login-card">

        <h1>Recruiter Login</h1>

        <p>
          Login to manage jobs and applications
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="recruiter-login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="recruiter-register-link">

          Don't have an account?

          <Link to="/recruiter/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
};

export default RecruiterLogin;