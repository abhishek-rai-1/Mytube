// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "mytubeauth-260ca.firebaseapp.com",
    projectId: "mytubeauth-260ca",
    storageBucket: "mytubeauth-260ca.firebasestorage.app",
    messagingSenderId: "397159362355",
    appId: "1:397159362355:web:652637c30e33bb4628d846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};