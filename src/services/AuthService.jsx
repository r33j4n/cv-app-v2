import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/db/firebaseConfig";

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // User info
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export { loginWithGoogle, logout };
