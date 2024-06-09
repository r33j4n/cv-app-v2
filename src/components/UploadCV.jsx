import React, { useState } from 'react';
import { Typography, Box, Button, Input, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import UpdateUserData from './UpdateUserData';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  maxWidth: 500,
  margin: 'auto',
  marginTop: theme.spacing(5),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const UploadCV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
        setErrorMessage("Please select a file first");
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    
    const userId = localStorage.getItem('userID'); // Fetch UserID from localStorage
    if (!userId) {
        setErrorMessage("User not logged in");
        return;
    }
    formData.append('userID', userId); // Append UserID to formData

    try {
        setUploading(true);
        setResponseMessage("");
        setErrorMessage("");

        const response = await axios.post('http://localhost:5000/upload-cv', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            setResponseMessage(response.data.db_message);
            setSelectedFile(null);
        } else {
            setErrorMessage(response.data.error || "Failed to upload file");
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMessage("Failed to upload file");
    } finally {
        setUploading(false);
    }
};

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>Upload CV</Typography>
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Select File
        <Input type="file" hidden onChange={handleFileChange} />
      </Button>
      {selectedFile && <Typography variant="body1">{selectedFile.name}</Typography>}
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={uploading}>
        {uploading ? <CircularProgress size={24} /> : "Upload"}
      </Button>
      {responseMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {responseMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <UpdateUserData />
    </StyledBox>
  );
};

export default UploadCV;
