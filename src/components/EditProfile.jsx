import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, TextField, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
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

const EditProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  const userId = localStorage.getItem('userID'); // Assume userID is stored in localStorage

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'Users', userId));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          setErrorMessage("User not found");
        }
      } catch (error) {
        setErrorMessage("Error fetching user details");
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [db, userId]);

  const handleEditToggle = () => {
    setEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setResponseMessage("");
      setErrorMessage("");

      await setDoc(doc(db, 'Users', userId), userDetails);
      setResponseMessage("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      setErrorMessage("Error updating profile");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>Edit Profile</Typography>
      {userDetails && (
        <>
          <TextField
            label="Name"
            name="name"
            value={userDetails.name || ''}
            onChange={handleChange}
            margin="normal"
            fullWidth
            disabled={!editing}
          />
          <TextField
            label="Email"
            name="email"
            value={userDetails.email || ''}
            onChange={handleChange}
            margin="normal"
            fullWidth
            disabled={!editing}
          />
          <TextField
            label="Phone"
            name="phone"
            value={userDetails.phone || ''}
            onChange={handleChange}
            margin="normal"
            fullWidth
            disabled={!editing}
          />
          <Button variant="contained" color="primary" onClick={handleEditToggle} sx={{ mt: 2 }}>
            {editing ? 'Cancel' : 'Edit'}
          </Button>
          {editing && (
            <Button variant="contained" color="secondary" onClick={handleSave} sx={{ mt: 2 }}>
              Save
            </Button>
          )}
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
        </>
      )}
    </StyledBox>
  );
};

export default EditProfile;
