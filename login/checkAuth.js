import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2DSXPmD4Ov5nRknkvX6hP9a48Ze1RuHw",
  authDomain: "sat-math-login-system.firebaseapp.com",
  projectId: "sat-math-login-system",
  storageBucket: "sat-math-login-system.appspot.com",
  messagingSenderId: "728012423720",
  appId: "1:728012423720:web:f4673140f2ce27fecfab1d",
  measurementId: "G-06SRVF0PRN"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If the user is not logged in, redirect to login.html
    window.location.href = "login.html";
  }
});
