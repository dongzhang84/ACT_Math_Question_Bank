import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const provider = new GoogleAuthProvider();
auth.languageCode = 'en';



const google = document.getElementById("google")
google.addEventListener("click", function () {

 signInWithPopup(auth, provider)
  .then((result) => {
   // This gives you a Google Access Token. You can use it to access the Google API.
   const credential = GoogleAuthProvider.credentialFromResult(result);
   const token = credential.accessToken;
   // The signed-in user info.
   const user = result.user;
   window.location.href = "session-selection.html";
  }).catch((error) => {
   // Handle Errors here.
   const errorCode = error.code;
   const errorMessage = error.message;
   // The email of the user's account used.
   const email = error.customData.email;
   // The AuthCredential type that was used.
   const credential = GoogleAuthProvider.credentialFromError(error);
   // ...
   alert(errorMessage);
  });

})



