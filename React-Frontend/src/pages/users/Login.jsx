import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

const navigate = useNavigate();
  const validate = () => {
    let err = {};
    if (!form.email.includes("@")) err.email = "Invalid email";
    if (!form.password) err.password = "Password required";
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
    setSuccess("✅ Login Successful!");

    setForm({ email: "", password: "" });

    // 🚀 Redirect after 1.5 sec
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }
};



  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {success && <div className="success">{success}</div>}
        
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

        <button className="btn primary">Login</button>

        <p className="switch-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;