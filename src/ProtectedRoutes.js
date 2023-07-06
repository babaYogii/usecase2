import React from 'react'
import {  Outlet,useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const navigate=useNavigate()
    const auth=true;

    React.useEffect(() => {
        if (!auth) {
          navigate('/signup', { replace: true });
        }
      }, [auth, navigate]);


  return auth ? <Outlet/>:null;
  
}

export default ProtectedRoute