// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "[REMOVED_API_KEY]",
  authDomain: "[REMOVED_AUTH_DOMAIN]",
  projectId: "[REMOVED_PROJECT_ID]",
  storageBucket: "[REMOVED_PROJECT_ID].firebasestorage.app",
  messagingSenderId: "[REMOVED_SENDER_ID]",
  appId: "1:[REMOVED_SENDER_ID]:web:ce9ca22824ca33e8ec4b28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);