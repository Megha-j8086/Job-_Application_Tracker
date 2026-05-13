import React, {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../../api/api";

import "../../styles/Login.css";

const Register = () => {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({

      name: "",
      email: "",
      password: "",

    });

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

            "/users/register/",

            form

          );

        alert(
          res.data.message
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert(
          "Registration Failed"
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
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn primary"
        >
          Register
        </button>

        <p className="switch-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Register;