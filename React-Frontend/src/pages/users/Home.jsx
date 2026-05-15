import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "../../styles/Home.css";

import Features from "../../components/Features";

const Home = () => {

  const navigate =
    useNavigate();

  return (

    <div>

      {/* HERO */}
      <section className="hero">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <h1 className="hero-text">

            Track Smarter,
            <br />

            Get Hired

            <span>
              {" "}Faster
            </span>

          </h1>

          <p>

            SmartJob helps you discover jobs
            based on your skills, track your
            applications, and manage your
            career journey professionally.

          </p>

          <div className="hero-btns">

            {/* GET STARTED BUTTON */}
            <button
              className="btn primary"
              onClick={() =>
                navigate("/register")
              }
            >

              Get Started

            </button>

            {/* TRACK JOBS BUTTON */}
            <button
              className="outline"
              onClick={() =>
                navigate("/log")
              }
            >

              Track Jobs

            </button>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">

          <img
            src="/dashboard.png"
            alt="dashboard"
          />

        </div>

      </section>

      {/* FEATURES */}
      <section id="features">

        <Features />

      </section>

      {/* STEPS */}
      <section className="steps">

        <p className="steps-subtitle">

          HOW IT WORKS

        </p>

        <h2 className="steps-title">

          Simple Steps to Success

        </h2>

        <div className="steps-container">

          {/* STEP 1 */}
          <div className="step">

            <div className="icon blue">
              👤
            </div>

            <span className="step-number">
              1
            </span>

            <h3>
              Create Account
            </h3>

            <p>
              Sign up and create your
              personal account.
            </p>

          </div>

          <div className="line"></div>

          {/* STEP 2 */}
          <div className="step">

            <div className="icon green">
              💼
            </div>

            <span className="step-number">
              2
            </span>

            <h3>
              Add Applications
            </h3>

            <p>
              Add job applications and
              details in seconds.
            </p>

          </div>

          <div className="line"></div>

          {/* STEP 3 */}
          <div className="step">

            <div className="icon purple">
              📊
            </div>

            <span className="step-number">
              3
            </span>

            <h3>
              Track & Succeed
            </h3>

            <p>
              Monitor progress and move
              forward confidently.
            </p>

          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <div className="container">

        <h2>

          Ready To Take Control of
          your Career?

        </h2>

        <p>

          Join thousands of job seekers
          who are tracking smarter and
          getting hired faster.

        </p>

        {/* CREATE ACCOUNT BUTTON */}
        <button
          className="outline"
          onClick={() =>
            navigate("/register")
          }
        >

          Create Your Account

        </button>

      </div>

    </div>
  );
};

export default Home;