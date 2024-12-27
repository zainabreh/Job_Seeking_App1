import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RecuiterLayout = ({role}) => {
const {user,isAuthenticated} = useSelector(v=>v.auth)

   
  if (!isAuthenticated || user.user.roles !== role) {
    return <Navigate to="/login"  />;
  }
    


  return (
    <>
      <Outlet/>
    </>
  )
}

export default RecuiterLayout
