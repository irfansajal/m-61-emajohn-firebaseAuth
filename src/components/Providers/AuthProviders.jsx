import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';

/* this part works like a brain */
 export const AuthContext = createContext(null);

 const auth = getAuth(app);

const AuthProviders = ({children}) => {
   /*  const user = {displayName: 'claus'} */
   const [user,setUser] = useState(null);
   const [loading, setLoading] = useState(true);


   const createUser = (email,password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
   }

   const signIn = (email,password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
   }
   const logOut = () =>{
    return signOut(auth);
   }

   // observe user auth state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        // stop observing while unmounting
       return () =>{
        return unsubscribe();
       }

    },[])
        
    const AuthInfos ={
        user,
        loading,
        createUser,
        signIn,
        logOut
    }




    return (
        <AuthContext.Provider value={AuthInfos}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;