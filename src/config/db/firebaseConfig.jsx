import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCu291fsKZbwZj3XAAJRDi2TYxUi_4Klxk",
  authDomain: "cv-app-dev.firebaseapp.com",
  projectId: "cv-app-dev",
  storageBucket: "cv-app-dev.appspot.com",
  messagingSenderId: "177511226442",
  appId: "1:177511226442:web:7e9d5d4e0d45e721c35ab3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);