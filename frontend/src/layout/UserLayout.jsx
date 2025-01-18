import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserLayout = () => {
const {key} = useSelector(v=>v.auth)

if (!key) {
  return <Navigate to="/login" />;
}
    


  return (
    <>
      <Outlet/>
    </>
  )
}

export default UserLayout
