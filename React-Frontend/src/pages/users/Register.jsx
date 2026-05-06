import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.includes("@")) err.email = "Invalid email";

    if (form.password.length < 6)
      err.password = "Min 6 characters required";
    else if (!/[A-Z]/.test(form.password))
      err.password = "Add 1 uppercase letter";
    else if (!/[0-9]/.test(form.password))
      err.password = "Add 1 number";

    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("🎉 Registration Successful!");
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {success && <div className="success">{success}</div>}

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button className="btn primary">Register</button>

        <p className="switch-link">
          Already have an account? <Link to="/log">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;