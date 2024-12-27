import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLayout = ({role}) => {
const {user,isAuthenticated} = useSelector(v=>v.auth)

// console.log("userRoles checking",user.us);

if (!isAuthenticated || user.user.roles !== role) {
  return <Navigate to="/login" />;
}
    


  return (
    <>
    <Outlet/>
    </>
  )
}

export default AdminLayout
