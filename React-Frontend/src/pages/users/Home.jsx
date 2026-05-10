import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";


const Home = () => {
  return (
    <div>
       {/* HERO */}
<section className="hero">

  {/* LEFT CONTENT */}
  <div className="hero-content">

    <h1 className="hero-text">
      Track Smarter,<br />
      Get Hired
      <span> Faster</span>
    </h1>

    <p>
      SmartJob helps you discover jobs
      based on your skills, track your
      applications, and manage your
      career journey professionally.
    </p>

    <div className="hero-btns">

      <button className="btn primary">
        
        Get Started 
      </button>

      <button className="btn outline">
         
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
      <section className="features">
        <h2>Features</h2>
        <h3>Everything You Need to Stay Ahead</h3>
        <p>Powerful features to help you track,manage and land your dream job</p>
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
  
<div className="container">
  <h2>Ready To Take Control of your Career?</h2>
  <p>Join thousands of job seekers who are tracking smarter and getting hired faster.</p>


  <button className="outline">
     <Link to="/register" className="back-link">
    Create Your Account </Link></button>
</div>
    </div>
  );
};

export default Home;