import React, { useState } from 'react';
import { Typography, Box, Button, TextField, CircularProgress, Alert, Input } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

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

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!title || !description || !selectedFile) {
      setErrorMessage("Please fill in all fields and select a file");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);
    formData.append('description', description);

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

      const response = await axios.post('http://localhost:5000/upload-job', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setResponseMessage(response.data.db_message);
        setTitle('');
        setDescription('');
        setSelectedFile(null);
      } else {
        setErrorMessage(response.data.error || "Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setErrorMessage("Failed to post job");
    } finally {
      setUploading(false);
    }
  };

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>Post Job</Typography>
      <TextField
        label="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        fullWidth
        multiline
        rows={4}
      />
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Select Job Poster
        <Input type="file" hidden onChange={handleFileChange} />
      </Button>
      {selectedFile && <Typography variant="body1">{selectedFile.name}</Typography>}
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={uploading}>
        {uploading ? <CircularProgress size={24} /> : "Post Job"}
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

export default PostJob;
