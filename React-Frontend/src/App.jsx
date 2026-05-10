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
import Applications from "./pages/admin/Applications";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

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

        <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/manage-jobs" element={<ManageJobs />} />
      <Route path="/admin-applications" element={<Applications />} />
      <Route path="/admin-analytics" element={<AdminAnalytics />} />
      
      </Routes>

      <Footer />

    </>
  );
};

export default App;