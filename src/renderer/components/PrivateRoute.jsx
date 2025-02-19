import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const  PrivateRoute = ({ children }) => {
    const user = useSelector(state => state.auth.user);


    
    return user!=null ? children : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;

