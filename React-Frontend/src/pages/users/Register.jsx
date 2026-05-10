import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(form)
    );

    setSuccess("✅ Registration Successful!");

    setTimeout(() => {
      navigate("/log");
    }, 1500);
  };

  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>

        {success && (
          <div className="success">
            {success}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />

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
          Register
        </button>

        <p className="switch-link">
          Already have an account?
          <Link to="/log"> Login</Link>
        </p>

      </form>

    </div>
  );
};

export default Register;