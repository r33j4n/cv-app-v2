// src/components/ViewProfile.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const ViewProfile = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        my: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        View Profile
      </Typography>
      <Typography variant="body1">
        This is the View Profile section. Here you can see the user's profile details.
      </Typography>
    </Box>
  );
};

export default ViewProfile;
