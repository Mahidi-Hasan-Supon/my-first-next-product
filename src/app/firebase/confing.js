// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAhLW3hkEDntQt-gy4GeElJG2WEiDi_4U",
  authDomain: "nextjs-auth-a8490.firebaseapp.com",
  projectId: "nextjs-auth-a8490",
  storageBucket: "nextjs-auth-a8490.firebasestorage.app",
  messagingSenderId: "717631499502",
  appId: "1:717631499502:web:fd2e796947ed4bad95d7ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);