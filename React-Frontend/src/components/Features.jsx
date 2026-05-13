import React from "react";
import "../styles/Features.css";

const Features = () => {
  return (
    <section className="features-section">

      <h2 className="features-title">
        Why Choose SmartJob?
      </h2>

      <div className="features-grid">

        <div className="feature-card">
          <h3>🚀 Easy Job Apply</h3>
          <p>
            Apply to jobs in just one click and track your applications easily.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Real-time Analytics</h3>
          <p>
            Monitor your application progress with live statistics and insights.
          </p>
        </div>

        <div className="feature-card">
          <h3>💼 Smart Job Matching</h3>
          <p>
            Get job recommendations based on your skills and profile.
          </p>
        </div>

        <div className="feature-card">
          <h3>🧑‍💼 Admin Control</h3>
          <p>
            Admin can manage jobs, users, and applications efficiently.
          </p>
        </div>

        <div className="feature-card">
          <h3>📁 Profile Management</h3>
          <p>
            Maintain your resume, skills, and career information in one place.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔔 Instant Updates</h3>
          <p>
            Get updates on application status like interview, offer, or rejection.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Features;