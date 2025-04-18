"use client"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {  createContext } from "react";
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
    const GoogleProvider=new GoogleAuthProvider(auth);

    const googleLoginHandler=async()=>{
        try {
            await signInWithPopup(auth,GoogleProvider)
        } catch (error) {
            throw error; 
        }

    }

    const logout=()=>{
        signOut(auth)
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
