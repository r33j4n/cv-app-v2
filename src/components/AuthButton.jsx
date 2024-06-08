import React from 'react';
import { Button } from '@mui/material';
import { loginWithGoogle, logout } from '../services/AuthService';

const AuthButtons = () => {
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("Logged in user:", user);
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Handle successful logout, e.g., redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login with Google
      </Button>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default AuthButtons;
