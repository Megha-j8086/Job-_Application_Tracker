import React, {
  useState
} from "react";

import "../../styles/Login.css";

import API from "../../api/api";

import {
  useNavigate,
  Link
} from "react-router-dom";

const Login = () => {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({

      email: "",
      password: ""

    });

  const [error, setError] =
    useState("");

  const handleChange =
    (e) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.post(

            "/users/login/",

            form

          );

        // SAVE TOKENS
        localStorage.setItem(

          "access",

          res.data.access

        );

        localStorage.setItem(

          "refresh",

          res.data.refresh

        );

        // SAVE USER
        localStorage.setItem(

          "user",

          JSON.stringify(
            res.data.user
          )

        );
      
        alert(
          "Login Successful"
        );

        // NAVIGATE
        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        setError(
          "Invalid Email or Password"
        );

      }
    };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>
          Login
        </h2>

        {error && (

          <p
            style={{
              color: "red"
            }}
          >
            {error}
          </p>

        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn primary"
        >
          Login
        </button>

        <p className="switch-link">

          Don’t have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;