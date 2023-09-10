import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({children}) {

    const { user } = useContext(AuthContext);
    console.log(user);
    
    return user ? children : <Navigate to="/login" />
}

export default PrivateRoute