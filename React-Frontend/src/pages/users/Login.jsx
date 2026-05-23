import React, { useState } from "react";

import "../../styles/Login.css";

import API from "../../api/api";

import {
  useNavigate,
  Link
} from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      username: "",
      password: ""
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setForm((prev) => ({

      ...prev,

      [e.target.name]:
      e.target.value

    }));

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      try {

        setLoading(true);

        const res =
          await API.post(
            "/users/login/",
            form
          );

        const {
          access,
          refresh,
          user
        } =
        res.data;

        // clear auth only
        localStorage.removeItem(
          "access"
        );

        localStorage.removeItem(
          "refresh"
        );

        localStorage.removeItem(
          "user"
        );

        // save new login
        localStorage.setItem(
          "access",
          access
        );

        localStorage.setItem(
          "refresh",
          refresh
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            name:
              user.name
              ||
              user.username,

            email:
              user.email,

            role:
              user.role
          })
        );

        // redirect

        if (
          user.role ===
          "recruiter"
        ) {

          navigate(
            "/recruiter-dashboard",
            {
              replace:
              true
            }
          );

        }

        else {

          navigate(
            "/dashboard",
            {
              replace:
              true
            }
          );

        }

      }

      catch (err) {

        console.log(
          err
        );

        setError(

          err.response
          ?.data
          ?.error

          ||

          "Invalid email or password"

        );

      }

      finally {

        setLoading(false);

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

        {

          error

          &&

          <p
            style={{
              color:
              "red"
            }}
          >

            {error}

          </p>

        }

        <input
          type="email"
          name="username"
          placeholder="Enter Email"
          value={
            form.username
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={
            form.password
          }
          onChange={
            handleChange
          }
          required
        />

        <button
          type="submit"
          className="btn primary"
          disabled={
            loading
          }
        >

          {

            loading

            ?

            "Logging in..."

            :

            "Login"

          }

        </button>

        <p className="switch-link">

          Don’t have account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </form>

    </div>

  );

};

export default Login;