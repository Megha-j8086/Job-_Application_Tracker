import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import { Link } from "react-router-dom";
import API from "../../api/api";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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
  const [projects, setProjects] = useState("");
  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [resume, setResume] = useState(null);
  const [saved, setSaved] = useState(false);

  // ================= FETCH PROFILE =================
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile/me/");
      const data = res.data;

      if (data.skills) {
        setSelectedSkills(data.skills.split(","));
      }

      setProjects(data.projects || "");
      setBio(data.bio || "");
      setGithub(data.github || "");
      setLinkedin(data.linkedin || "");
    } catch (error) {
      console.log("Fetch Profile Error:", error);
    }
  };

  // ================= SKILLS =================
  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // ================= RESUME =================
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file);
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    const formData = new FormData();

    formData.append("skills", selectedSkills.join(","));
    formData.append("projects", projects);
    formData.append("bio", bio);
    formData.append("github", github);
    formData.append("linkedin", linkedin);

    if (resume) {
      formData.append("resume", resume);
    }

    try {
      await API.post("/users/profile/save/", formData);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.log("Save Profile Error:", error);
      alert("Profile Update Failed");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* LEFT */}
        <div className="profile-left">
          <div className="profile-image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
            />
          </div>

          <h2>{user?.name || "User"}</h2>
          <p>{user?.email || "user@gmail.com"}</p>

          <div className="profile-badge">Job Seeker</div>
        </div>

        {/* RIGHT */}
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

          {/* PROJECTS */}
          <div className="section">
            <label>Projects</label>
            <textarea
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
            />
          </div>

          {/* BIO */}
          <div className="section">
            <label>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* GITHUB */}
          <div className="section">
            <label>Github</label>
            <input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          {/* LINKEDIN */}
          <div className="section">
            <label>LinkedIn</label>
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          {/* RESUME */}
          <div className="section">
            <label>Upload Resume</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />

            {resume && <p>📄 {resume.name}</p>}
          </div>

          {/* SAVE */}
          <button className="save-btn" onClick={handleSave}>
            Save Profile
          </button>

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