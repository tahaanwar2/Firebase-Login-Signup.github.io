import { useContext, createContext, useState } from "react";
import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase.js";
import { addDoc, collection } from "firebase/firestore";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

const UserAuthContext = ({ children }) => {
  const [currentuser, setuser] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setuser(user);
    }
  });

  const profileInformation = (profile) => {
    return addDoc(collection(db, "profile"), profile);
  };

  const UserLogin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const SignUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const value = {
    SignUp,
    UserLogin,
    profileInformation,
    currentuser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserAuthContext;

// import { createContext, useContext, useState, useEffect } from "react";
// import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from "../firebase";
// import { addDoc, collection } from "firebase/firestore";
// import React from "react";
// // Create a context
// const UserContext = createContext();

// // Custom hook to access the context
// export const useAuth = () => {
//     return useContext(UserContext);
// };

// // Context Provider component
// const UserAuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, user => {
//             if (user) {
//                 setCurrentUser(user);
//             } else {
//                 setCurrentUser(null);
//             }
//         });

//         return unsubscribe;
//     }, []);

//     const signUp = (email, password) => {
//         return createUserWithEmailAndPassword(auth, email, password);
//     };

//     const userLogin = (email, password) => {
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     const profileInformation = (profile) => {
//         return addDoc(collection(db, "profiles"), profile);
//     };

//     const contextValue = {
//         signUp,
//         userLogin,
//         profileInformation,
//         currentUser
//     };

//     return (
//         <UserContext.Provider value={contextValue}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export default UserAuthProvider;
