import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

const Home = () => {
  return (
    <div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Track Smarter. Get Hired Faster.</h1>
          <p>
            Manage your job applications and track progress easily.
          </p>

          <div className="hero-btns">
            <Link to="/register">
              <button className="btn primary">Get Started</button>
            </Link>

            <Link to="/trackjob">
              <button className="btn outline">Track Jobs</button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Features</h2>

        <div className="cards">
          <div className="card">
            <h3>📌 Track Applications</h3>
            <p>Store all your job applications in one place.</p>
          </div>

          <div className="card">
            <h3>📊 Monitor Progress</h3>
            <p>Track interview stages easily.</p>
          </div>

          <div className="card">
            <h3>⚡ Stay Organized</h3>
            <p>Never miss deadlines again.</p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      {/* STEPS */}
<section className="steps">
  <p className="steps-subtitle">HOW IT WORKS</p>
  <h2 className="steps-title">Simple Steps to Success</h2>

  <div className="steps-container">

    {/* Step 1 */}
    <div className="step">
      <div className="icon blue">👤</div>
      <span className="step-number">1</span>
      <h3>Create Account</h3>
      <p>Sign up and create your personal account.</p>
    </div>

    <div className="line"></div>

    {/* Step 2 */}
    <div className="step">
      <div className="icon green">💼</div>
      <span className="step-number">2</span>
      <h3>Add Applications</h3>
      <p>Add job applications and details in seconds.</p>
    </div>

    <div className="line"></div>

    {/* Step 3 */}
    <div className="step">
      <div className="icon purple">📊</div>
      <span className="step-number">3</span>
      <h3>Track & Succeed</h3>
      <p>Monitor progress and move forward confidently.</p>
    </div>

  </div>
</section>

    </div>
  );
};

export default Home;