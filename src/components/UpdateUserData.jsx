import React, { useState } from 'react';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
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

const UpdateUserData = () => {
  const [updating, setUpdating] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateData = async () => {
    const userId = localStorage.getItem('userID'); // Fetch UserID from localStorage
    if (!userId) {
      setErrorMessage("User not logged in");
      return;
    }

    try {
      setUpdating(true);
      setResponseMessage("");
      setErrorMessage("");

      const response = await axios.post('http://localhost:5000/update-cv-data', { userID: userId });

      if (response.status === 200) {
        const userData = response.data;
        setResponseMessage("Data updated successfully");

        // Update user data in Firestore
        const userDocRef = doc(db, 'Users', userData.UserID);

        const userDataToSet = {
          UserID: userData.UserID,
          Role: userData.Role,
          Email: userData.Email,
          DisplayName: userData.DisplayName,
          Gender: userData.Gender || null,
          DateOfBirth: userData.DateOfBirth ? new Date(userData.DateOfBirth) : null,
          Location: {
            City: userData.Location.City,
            Country: userData.Location.Country,
          },
        };

        await setDoc(userDocRef, userDataToSet);

        if (userData.Role === 'JobSeeker') {
          const jobSeekerDocRef = doc(db, 'Users', userData.UserID, 'JobSeekers', userData.UserID);

          const jobSeekerDataToSet = {
            UserID: userDocRef,
            Skills: userData.Skills,
            Experience: {
              Years: userData.Experience.Years,
              Details: userData.Experience.Details.map(detail => ({
                CompanyName: detail.CompanyName || null,
                Role: detail.Role,
                Duration: detail.Duration || null,
              })),
            },
            Education: userData.Education.map(edu => ({
              Degree: edu.Degree,
              Institution: edu.Institution || null,
              GraduationYear: edu.GraduationYear || null,
            })),
            AppliedJobs: userData.AppliedJobs,
          };

          await setDoc(jobSeekerDocRef, jobSeekerDataToSet);
          console.log("data updated successfully");
          console.log("Job seeker data:", jobSeekerDataToSet);
          console.log("User data:", userDataToSet);
        }
      } else {
        setErrorMessage(response.data.error || "Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setErrorMessage("Failed to update data");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <StyledBox>
      <Button variant="contained" color="secondary" onClick={handleUpdateData} disabled={updating}>
        {updating ? <CircularProgress size={24} /> : "Update My Data"}
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

export default UpdateUserData;
