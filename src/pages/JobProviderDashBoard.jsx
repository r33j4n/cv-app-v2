// src/pages/JobProviderDashboard.jsx
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components-job-poster/SideBar';
import ViewJobs from '../components-job-poster/ViewJobs';
import PostJob from '../components-job-poster/PostJob';
import EditJob from '../components-job-poster/EditJob';
import { Routes, Route } from 'react-router-dom';

const JobProviderDashboard = () => {
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
          <Route path="view-jobs" element={<ViewJobs />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="edit-job" element={<EditJob />} />
          <Route path="logout" element={<div>Logout</div>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default JobProviderDashboard;
