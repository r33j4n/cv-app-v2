// src/components/EditJob.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Button, TextField, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

const EditJob = () => {
  const { jobId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const db = getFirestore();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobDoc = await getDoc(doc(db, 'Jobs', jobId));
        if (jobDoc.exists()) {
          const jobData = jobDoc.data();
          setTitle(jobData.title);
          setDescription(jobData.description);
        } else {
          setErrorMessage("Job not found");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch job details");
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [db, jobId]);

  const handleUpdate = async () => {
    if (!title || !description) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      setUpdating(true);
      setResponseMessage("");
      setErrorMessage("");

      await updateDoc(doc(db, 'Jobs', jobId), {
        title,
        description,
      });

      setResponseMessage("Job updated successfully");
    } catch (error) {
      setErrorMessage("Failed to update job");
      console.error("Error updating job:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>Edit Job</Typography>
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
      <Button variant="contained" color="primary" onClick={handleUpdate} disabled={updating}>
        {updating ? <CircularProgress size={24} /> : "Update Job"}
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

export default EditJob;
