// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Config
const firebaseConfig = {
  apiKey: "[REMOVED_API_KEY]",
  authDomain: "[REMOVED_AUTH_DOMAIN]",
  projectId: "[REMOVED_PROJECT_ID]",
  storageBucket: "[REMOVED_PROJECT_ID].appspot.com",
  messagingSenderId: "[REMOVED_SENDER_ID]",
  appId: "1:[REMOVED_SENDER_ID]:web:ce9ca22824ca33e8ec4b28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);


