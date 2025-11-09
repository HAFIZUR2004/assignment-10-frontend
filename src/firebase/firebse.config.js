// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGSp9l3IONzR5h001ZmS4idzGsPxFF06Y",
  authDomain: "assignment-10-2ca2d.firebaseapp.com",
  projectId: "assignment-10-2ca2d",
  storageBucket: "assignment-10-2ca2d.appspot.com",
  messagingSenderId: "42345037533",
  appId: "1:42345037533:web:f451fc50c3bfae7ac36534"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
