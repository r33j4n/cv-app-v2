// src/services/AuthService.js
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/db/firebaseConfig";

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // Save user ID to local storage
    localStorage.setItem('userID', user.uid);
    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    // Remove user ID from local storage
    localStorage.removeItem('userID');
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export { loginWithGoogle, logout };
