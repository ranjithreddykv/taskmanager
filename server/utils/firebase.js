// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanger-610bb.firebaseapp.com",
  projectId: "taskmanger-610bb",
  storageBucket: "taskmanger-610bb.firebasestorage.app",
  messagingSenderId: "165906676652",
  appId: "1:165906676652:web:38d854c12f39cbd6f51809",
  measurementId: "G-QTC96EXMN3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
