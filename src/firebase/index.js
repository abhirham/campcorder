// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5b3DH-CgGLfD6cRQlHOXG5ZUGNoHVU-o",
    authDomain: "yelpcamp-371ab.firebaseapp.com",
    projectId: "yelpcamp-371ab",
    storageBucket: "yelpcamp-371ab.appspot.com",
    messagingSenderId: "1897633822",
    appId: "1:1897633822:web:6dbbb319ea0d08428ff60f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
