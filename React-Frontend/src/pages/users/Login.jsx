import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // GET REGISTERED USER
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    // CHECK LOGIN
    if (
      savedUser &&
      savedUser.email === form.email &&
      savedUser.password === form.password
    ) {
      // SAVE LOGGED USER
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(savedUser)
      );

      alert("✅ Login Successful");

      navigate("/dashboard");
    } else {
      setError("❌ Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>

        {error && (
          <p className="error">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          required
        />

        <button className="btn primary">
          Login
        </button>

        <p className="switch-link">
          Don’t have an account?
          <Link to="/register">
            {" "}Register
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Login;