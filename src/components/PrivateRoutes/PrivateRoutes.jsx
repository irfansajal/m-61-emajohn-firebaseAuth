import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location);


    if(loading){
        return <div>Lding....</div>
    }
    
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace ></Navigate>;
   /*  return <Navigate to ='/login' state={{from:location}} replace ></Navigate> */
};

export default PrivateRoutes;