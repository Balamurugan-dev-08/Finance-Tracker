"use client";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {  createContext, useState } from "react";
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from "../firebase";

export const authContext=createContext(
    {
        user:null,
        loading:false,
        googleLoginHandler:async()=>{},
        logout:async()=>{},       
    }
)

export default function AuthContextProvider({children}){

    //user and Loading
    const [user,loading]=useAuthState(auth);
    //GoogleLoginHandler
    const GoogleProvider=new GoogleAuthProvider();

    const [isSigningIn, setIsSigningIn] = useState(false);

const googleLoginHandler = async () => {
  if (isSigningIn) return; // Prevent spamming

  setIsSigningIn(true);
  try {
    await signInWithPopup(auth, GoogleProvider);
  } catch (error) {
    if (error.code === "auth/cancelled-popup-request") {
      console.warn("Popup request was cancelled.");
    } else if (error.code === "auth/popup-closed-by-user") {
      console.warn("User closed the sign-in popup.");
    } else {
      console.error("Login error:", error);
    }
  } finally {
    setIsSigningIn(false);
  }
};

    const logout=async()=>{
        try {
            await signOut(auth);
            
        } catch (error) {
            console.error("Logout failed:", error);
        }

    }

    const values={
        user,
        loading,
        googleLoginHandler,
        logout,
    }
    
    return<authContext.Provider value={values}>
        {children}
    </authContext.Provider> 
}
