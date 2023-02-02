// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp8fEcxozKM24WUst9hxvgFk-Y_7iKbPQ",
  authDomain: "react-movie-dcf8d.firebaseapp.com",
  projectId: "react-movie-dcf8d",
  storageBucket: "react-movie-dcf8d.appspot.com",
  messagingSenderId: "486431188347",
  appId: "1:486431188347:web:9bb40b75857cf1911cc9de",
  measurementId: "G-JYK8X4FB75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);