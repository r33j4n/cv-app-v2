import React, { useState } from 'react';
import { Box, Button, Input, CircularProgress, Alert, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../config/db/firebaseConfig'; // Import Firestore instance

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

const UploadJobPoster = () => {
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

    const providerId = localStorage.getItem('userID'); // Fetch UserID from localStorage
    if (!providerId) {
      setErrorMessage("User not logged in");
      return;
    }
    formData.append('providerID', providerId); // Append ProviderID to formData

    try {
      setUploading(true);
      setResponseMessage("");
      setErrorMessage("");

      const response = await axios.post('http://localhost:5000/upload-job', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const jobData = response.data;
        setResponseMessage("Job poster uploaded successfully");

        // Save job data to Firestore
        const jobCollectionRef = collection(db, 'JobProviders', providerId, 'Jobs');
        const jobDocRef = await addDoc(jobCollectionRef, {
          Title: jobData.Title,
          Description: jobData.Description,
          Location: {
            City: jobData.Location.City,
            Country: jobData.Location.Country,
          },
          Requirements: {
            Education: jobData.Requirements.Education,
            Skills: jobData.Requirements.Skills,
            Experience: jobData.Requirements.Experience,
          },
          PostedDate: new Date(jobData.PostedDate),
          Applications: [],
        });

        console.log("Job poster data:", jobData);
        console.log("Saved to Firestore with ID:", jobDocRef.id);
        setSelectedFile(null);
      } else {
        setErrorMessage(response.data.error || "Failed to upload job poster");
      }
    } catch (error) {
      console.error("Error uploading job poster:", error);
      setErrorMessage("Failed to upload job poster");
    } finally {
      setUploading(false);
    }
  };

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>Upload Job Poster</Typography>
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
    </StyledBox>
  );
};

export default UploadJobPoster;
