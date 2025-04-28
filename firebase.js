// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsgredqEPqUJeqNoO7z7LTMDltJstVRbE",
  authDomain: "rapfo-7478e.firebaseapp.com",
  projectId: "rapfo-7478e",
  storageBucket: "rapfo-7478e.firebasestorage.app",
  messagingSenderId: "742279310622",
  appId: "1:742279310622:web:d8303f666f7bf7ac8e6d0f",
  measurementId: "G-82CPFGS54M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app, analytics};