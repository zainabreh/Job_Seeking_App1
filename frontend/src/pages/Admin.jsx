import React from 'react'

const Admin = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="info-section">
            <h4 style={{fontWeight:"600",color:"white",marginBlock:"25px"}}>User Info</h4>
            <div className="row">
                <div className="col-md-3">
                    <div className="info-card bg-blue">
                        <span>20</span>
                        Total Members
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-cyan">
                        <span>1</span>
                        Admins
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-cyan">
                        <span>2</span>
                        Recruiters
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-blue">
                        <span>17</span>
                        Applicants
                    </div>
                </div>
            </div>
        </div>
        <div className="info-section">
            <h4 style={{fontWeight:"600",color:"white",marginBlock:"25px"}}>Job Info</h4>
            <div className="row">
                <div className="col-md-3">
                    <div className="info-card bg-red">
                        <span>6</span>
                        Total Jobs
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-green">
                        <span>4</span>
                        Pending
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-purple">
                        <span>2</span>
                        Interview
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-red">
                        <span>0</span>
                        Declined
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Admin
