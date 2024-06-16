// src/pages/LoginPage.jsx
import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { loginWithGoogle } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file for custom styles

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    try {
      const user = await loginWithGoogle();
      // Save user info and role in localStorage or state/context as needed
      localStorage.setItem("userRole", role); // Save user role for later use
  
      // Redirect to the appropriate dashboard based on role
      if (role === "JobSeeker") {
        navigate("/job-seeker-dashboard");
      } else if (role === "JobProvider") {
        navigate("/job-provider-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container className="login-container" maxWidth="sm">
      <Box className="login-box">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to CV Application
        </Typography>
        <Typography variant="body1" gutterBottom>
          This application allows you to create and manage job postings as a Job Provider,
          or search and apply for jobs as a Job Seeker. Please choose your role and log in
          with Google to proceed.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogin("JobSeeker")}
          className="login-button"
        >
          Login as Job Seeker
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleLogin("JobProvider")}
          className="login-button"
        >
          Login as Job Provider
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
