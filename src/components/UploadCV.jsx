// src/components/UploadCV.jsx
import React from 'react';
import { Typography, Box, Button, Input } from '@mui/material';

const UploadCV = () => {
  return (
    <Box>
      <Typography variant="h4">Upload CV</Typography>
      <Button variant="contained" component="label">
        Upload File
        <Input type="file" hidden />
      </Button>
    </Box>
  );
};

export default UploadCV;
