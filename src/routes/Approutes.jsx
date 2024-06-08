// src/routes/Approutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import JobSeekerDashboard from '../pages/JobSeekerDashboard';

const Approutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/job-seeker-dashboard/*" element={<JobSeekerDashboard />} />
      </Routes>
    </Router>
  );
}

export default Approutes;
