import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/users/Home";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Dashboard from "./pages/users/Dashboard";
import Profile from "./pages/users/Profile";
import Analytics from "./pages/users/Analytics";
import MyApplications from "./pages/users/MyApplications";
import About from "./pages/users/About";
import TrackJobs from "./pages/users/TrackJobs";



import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageJobs from "./pages/admin/ManageJobs";
import ManageApplications from "./pages/admin/ManageApplications";
import AdminAnalytics from "./pages/admin/AdminAnalytics";



import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterLogin from "./pages/recruiter/RecruiterLogin";
import AddJob from "./pages/recruiter/AddJob";
import RecruiterManageJobs from "./pages/recruiter/RecruiterManageJobs";
import Applicants from "./pages/recruiter/Applicants";
import Interviews from "./pages/recruiter/Interviews";
import RecruiterApplications from "./pages/recruiter/RecruiterApplications";
import CandidateProfile from "./pages/recruiter/CandidateProfile";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>

      <Navbar />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/log" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* PROFILE */}
        <Route path="/profile" element={<Profile />} />

        {/* ANALYTICS */}
        <Route path="/analytics" element={<Analytics />} />

        {/* APPLICATIONS */}
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/about" element={<About />} />
        <Route path="/trackjobs" element={<TrackJobs />} />



        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
        <Route path="/admin-applications" element={<ManageApplications />}/>

        <Route
          path="/recruiter/login"
          element={<RecruiterLogin />}
        />
           <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/addjob"
          element={<AddJob />}
        />

        <Route
          path="/managejobs"
          element={<RecruiterManageJobs />}
        />

        <Route
          path="/applicants"
          element={<Applicants />}
        />
          <Route
          path="/recruiter-applications"
          element={<RecruiterApplications/>}
        />
        <Route
          path="/interviews"
          element={<Interviews />}
        />

        <Route path="/candidate/:id" element={ <CandidateProfile/> }/>

      </Routes>
      
      <Footer />

    </>
  );
};

export default App;