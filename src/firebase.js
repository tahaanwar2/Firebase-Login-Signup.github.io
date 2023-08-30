// Import the functions you need from the SDKs you need
// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration object

const firebaseConfig = {
    apiKey: "AIzaSyBvD-QWQvLTs11kj-0zNWNpeK7P8ClaQmk",
    authDomain: "fir-auth-1132-147c1.firebaseapp.com",
    projectId: "fir-auth-1132-147c1",
    storageBucket: "fir-auth-1132-147c1.appspot.com",
    messagingSenderId: "361782191473",
    appId: "1:361782191473:web:25353d7baf02493c7202d0",
    measurementId: "G-HDE8DKNZ1Y",
};

// Your Firebase configuration options here

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase services you need
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Export the Firebase services
export { auth, firestore, storage };

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

const db = getFirestore(app);

export { db };

