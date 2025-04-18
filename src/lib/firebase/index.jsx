// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChIEOWuc3doNBCvvajWw0lwygGYb338RM",
  authDomain: "finance-tracker-d8b2f.firebaseapp.com",
  projectId: "finance-tracker-d8b2f",
  storageBucket: "finance-tracker-d8b2f.firebasestorage.app",
  messagingSenderId: "23838047567",
  appId: "1:23838047567:web:2970dc1d5f99cab732d93a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);

export {app,db,auth};