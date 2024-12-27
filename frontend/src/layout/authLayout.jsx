import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
const {isAuthenticated} = useSelector(v=>v.auth)

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
    


  return (
    <>
      <Outlet/>
    </>
  )
}

export default AuthLayout
