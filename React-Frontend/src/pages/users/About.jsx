import React from "react";
import { Link } from "react-router-dom";
import "../../styles/About.css";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">

        <div className="about-content">

          <h1>About SmartJob</h1>

          <p>
            SmartJob is a modern platform that helps
            job seekers manage applications,
            track progress, and discover jobs
            based on their skills.
          </p>

          <Link to="/register">
            <button className="about-btn">
              Get Started
            </button>
          </Link>

        </div>

        <div className="about-image">

          <img
            src="/dashboard.png"
            alt="about"
          />

        </div>

      </section>

      {/* FEATURES */}
      <section className="about-features">

        <h2>Why Choose SmartJob?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>📌 Job Tracking</h3>

            <p>
              Keep all applications
              organized in one place.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Analytics</h3>

            <p>
              Monitor interviews,
              offers, and success rate.
            </p>
          </div>

          <div className="feature-card">
            <h3>💼 Skill Matching</h3>

            <p>
              Get jobs based on
              your skills and resume.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default About;