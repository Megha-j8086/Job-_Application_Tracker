import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const skillOptions = [
    "React",
    "Python",
    "Java",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "UI/UX",
    "Machine Learning",
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile) {
      setSelectedSkills(profile.skills || []);
      setResume(profile.resume || null);
    }
  }, []);

  // HANDLE CHECKBOX
  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((item) => item !== skill)
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // HANDLE FILE UPLOAD
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResume(file.name);
    }
  };

  // SAVE PROFILE
  const handleSave = () => {
    const profileData = {
      skills: selectedSkills,
      resume,
    };

    localStorage.setItem("profile", JSON.stringify(profileData));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* LEFT SIDE */}
        <div className="profile-left">
          <div className="profile-image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
            />
          </div>

          <h2>{user?.name || "User Name"}</h2>
          <p>{user?.email || "user@gmail.com"}</p>

          <div className="profile-badge">
            Job Seeker
          </div>
          
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>


          <h1>Update Profile</h1>

          {/* SKILLS */}
          <div className="section">
            <label>Select Skills</label>

            <div className="skills-grid">
              {skillOptions.map((skill, index) => (
                <label key={index} className="skill-item">

                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />

                  {skill}
                </label>
              ))}
            </div>
          </div>

          {/* RESUME */}
          <div className="section">
            <label>Upload Resume</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="file-input"
            />

            {resume && (
              <p className="resume-name">
                📄 {resume}
              </p>
            )}
          </div>

          {/* SAVE BUTTON */}
          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Profile
          </button>

          {/* SUCCESS */}
          {saved && (
            <div className="success-message">
              ✅ Profile Updated Successfully
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;