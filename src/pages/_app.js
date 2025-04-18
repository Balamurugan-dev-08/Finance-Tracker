"use client"
import AuthContextProvider from "@/lib/Store/auth-context";
import FinanceContextProvider from "@/lib/Store/Fiance-Tracker";
import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
  
     <AuthContextProvider>
       <FinanceContextProvider>
        <Component {...pageProps} />
      </FinanceContextProvider>
     </AuthContextProvider>
   
  );
}
