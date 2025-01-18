import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RecuiterLayout = ({role}) => {
const {user,key} = useSelector(v=>v.auth)

   
  if (!key || user?.roles !== role) {
    return <Navigate to="/login"  />;
  }
    


  return (
    <>
      <Outlet/>
    </>
  )
}

export default RecuiterLayout
