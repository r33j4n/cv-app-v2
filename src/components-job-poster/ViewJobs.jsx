// src/components/ViewJobs.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, List, ListItem, ListItemText } from '@mui/material';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const db = getFirestore();
  const userId = localStorage.getItem('userID'); // Assume userID is stored in localStorage

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'Jobs'), where('providerId', '==', userId));
        const querySnapshot = await getDocs(q);
        const jobsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsList);
      } catch (error) {
        setError("Failed to fetch jobs");
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [db, userId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>View Jobs</Typography>
      <List>
        {jobs.map(job => (
          <ListItem key={job.id}>
            <ListItemText primary={job.title} secondary={job.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ViewJobs;
