// src/pages/JobSeekerDashboard.jsx
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import ViewProfile from '../components/ViewProfile';
import EditProfile from '../components/EditProfile';
import UploadCV from '../components/UploadCV';
import FindJobs from '../components/FindJobs';
import GetFeedback from '../components/GetFeedback';
import { Routes, Route } from 'react-router-dom';

const JobSeekerDashboard = () => {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Routes>
          <Route path="view-profile" element={<ViewProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="upload-cv" element={<UploadCV />} />
          <Route path="find-jobs" element={<FindJobs />} />
          <Route path="get-feedback" element={<GetFeedback />} />
          <Route path="logout" element={<div>Logout</div>} />

        </Routes>
      </Box>
    </Box>
  );
};

export default JobSeekerDashboard;
