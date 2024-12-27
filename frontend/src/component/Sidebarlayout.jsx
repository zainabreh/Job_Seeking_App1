import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Sidebarlayout = () => {
  return (
    <>
      <div className="dashBoardContainer">
    <Sidebar/>
    <div className="dashboard-container">

      <Outlet/>
    </div>
</div>
    </>
  )
}

export default Sidebarlayout
