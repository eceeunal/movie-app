import React, { createContext, useContext, useState } from "react";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify, toastWarnNotify } from "../helper/ToastNotify";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  const createUser = async(email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }

  };

  const signIn = async(email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/");
      toastSuccessNotify("Registered successfully")
    } catch (error) {
      console.log(error);
      toastWarnNotify(error.message);
    }

  };

  const logOut = () => {
    signOut(auth).then(() => {
      toastSuccessNotify("Logged out successfully")
    })
    .catch((error) => {

    });
  }


  const values = { currentUser, createUser, signIn, logOut };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
