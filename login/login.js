import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const submit = document.getElementById("submit");
const forgotPassword = document.getElementById("forgot-password");

submit.addEventListener("click", function (event) {
    event.preventDefault();

    // Get email and password values after clicking the submit button
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if email and password are not empty
    if (email.trim() === "" || password.trim() === "") {
        alert("Email and password cannot be empty");
        return;
    }

    // Check if the email is in the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return;
    }

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }

    // Create user with email and password
    signInWithEmailAndPassword (auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // alert("logging in...");
            setTimeout(() => {
                window.location.href = "quiz-selection.html";
            }, 300); // 300ms delay
            // ...
        })
        .catch((error) => {
        // Always show the same generic error message
        alert("The email or password you entered is incorrect.");
    });

});


// Forgot password functionality
forgotPassword.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    if (email.trim() === "") {
        alert("Please enter your email to reset password");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent. Please check your inbox.");
        })
        .catch((error) => {
            alert(error.message);
        });
});
