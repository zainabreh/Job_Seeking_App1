import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLayout = ({role}) => {
const {user,key} = useSelector(v=>v.auth)

// console.log("userRoles checking",user.us);

if (!key || user?.roles !== role) {
  return <Navigate to="/login" />;
}
    


  return (
    <>
    <Outlet/>
    </>
  )
}

export default AdminLayout
