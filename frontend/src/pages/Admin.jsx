import React, { useEffect, useState } from 'react'
import { useAllUserQuery } from '../../Redux/auth/auth.api'
import { useGetAllJobsQuery } from '../../Redux/auth/job.api'
import { useGetAllApplicationQuery } from '../../Redux/auth/application.api'

const Admin = () => {
    const {data:users} = useAllUserQuery()
    const {data:jobs} = useGetAllJobsQuery()
    const {data,error} = useGetAllApplicationQuery()
    console.log("applications........",data && data);
    
    const [appCount,setAppCount] = useState({
        pending: 0,
        reject: 0,
        accept: 0
    })
    
    const [count,setCount] = useState({
        adminCount:0,
        recuitersCount:0,
        applicantsCount:0
    })

    useEffect(()=>{

        if(users?.users){
            const admins = users.users.filter((a)=>a.roles.includes("admin")).length
            const applicants = users.users.filter((a)=>a.roles.includes("user")).length
            const recuiters = users.users.filter((a)=>a.roles.includes("recuiter")).length

            setCount({
                adminCount:admins,
                recuitersCount:recuiters,
                applicantsCount:applicants
            })
        }

        if(jobs?.job){
            const pend = jobs?.job.filter((stat)=>stat.status.includes('pending')).length
            const accep = jobs?.job.filter((stat)=>stat.status.includes('accept')).length
            const rejec = jobs?.job.filter((stat)=>stat.status.includes('reject')).length

            setAppCount({
                pending: pend,
                reject: accep,
                accept: rejec
            })
        }




        if (data) {
            if (data.success) {
              console.log("Applications fetched successfully:", data.applications);
            } else {
              console.error("Error fetching applications:", data.message);
            }
          }
        
          if (error) {
            console.error("API error:", error);
          }





    },[users,jobs,data,error])

  return (
    <>
      <div className="container mt-5">
        <div className="info-section">
            <h4 style={{fontWeight:"600",color:"white",marginBlock:"25px"}}>User Info</h4>
            <div className="row">
                <div className="col-md-3">
                    <div className="info-card bg-blue">
                        <span>{users?.users.length || 0}</span>
                        Total Members
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-cyan">
                        <span>{count.adminCount}</span>
                        Admins
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-cyan">
                        <span>{count.recuitersCount}</span>
                        Recruiters
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-blue">
                        <span>{count.applicantsCount}</span>
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
                        <span>{jobs?.job.length || 0}</span>
                        Total Jobs
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-green">
                        <span>{appCount.pending}</span>
                        Pending Applications
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-purple">
                        <span>{appCount.reject}</span>
                        Reject Applications
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="info-card bg-red">
                        <span>{appCount.accept}</span>
                        Accept Applications
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Admin
