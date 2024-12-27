import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {useGetsingleJobQuery } from "../../Redux/auth/job.api";

const JobDetail = () => {
  const {user,isAuthenticated} = useSelector(v=>v.auth)
  const [singleJob,setSingleJob] = useState()
  const {id} = useParams()
  const {data,error,isLoading,refetch} = useGetsingleJobQuery(id)   

  useEffect(() => {
    if (data) {
      refetch()
      setSingleJob(data.job);
    }
  }, [data]);
    
  const deadline = singleJob && new Date(singleJob.deadline)
  const formattedDeadline = deadline && deadline.toLocaleString('en-US',{
    month:'long',
    year:"numeric",
    day:"numeric"
  })
  const createdAt = singleJob && new Date(singleJob.createdAt)
  const formattedCreatedAt = createdAt && createdAt.toLocaleString('en-US',{
    month:'long',
    year:"numeric",
    day:"numeric"
  })


  return (
    <>{
      singleJob && ( <div style={{width:"800px",color:"black",padding:"1px",backgroundColor:"white",margin:"20px auto", borderRadius:"10px"}}>
        <div className="row mt-5" key={singleJob._id}>
          <div className="col-md-8 offset-md-2">
            <h2 className="text-center">Job Title: {singleJob.position}</h2>
            <div className="text-center mb-3">
              <span className="badge bg-primary" style={{ padding: "10px" }}>
                Posted By: {singleJob.company}
              </span>
              <span className="ms-2">{formattedCreatedAt}</span> <br/><br/>
              <span className="ms-2">Location: {singleJob.location}</span>
            </div>
            <h5
              className="mb-2"
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              Description
            </h5>
            <p>
              {singleJob.description}
            </p>
            <h6 className="mb-2" style={{ fontWeight: "bolder" }}>
              Deadline: {formattedDeadline}
            </h6>
            <p className="mb-3">Job Vacancy: {singleJob.vacancy} </p>
            <h5
              className="mb-2"
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              Requirements
            </h5>
            <ul style={{listStyle:"initial"}}>
            {singleJob.requiredSkill.map((req)=>(
              <li>{req}</li>
            ))}
            </ul>
            
            <h5
              className="mb-2"
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              Facilities
            </h5>
            <ul style={{listStyle:"initial"}}>
            {singleJob.facilities.map((fac)=>(
              <li>{fac}</li>
            ))}
            </ul>
            
            <h6 className="mb-2">Salary:{singleJob.salary} TK</h6>
            <h6 className="mt-3" style={{ fontWeight: "bolder" }}>
              To Apply
            </h6>
            <p>
              Send Your CV/Resume <br />{" "}
              <span style={{ fontWeight: "500" }}>Email: </span>{singleJob.email}
            </p>
            <br />

            {
              isAuthenticated && user?.user?.roles === 'user' ? <><Link to={`/apply/${singleJob._id}`}><button type="button" className="btn" style={{marginBottom:"30px",backgroundColor:"white"}}>Apply</button></Link></> : isAuthenticated && user?.user?.roles === 'recuiter' || 'admin' ? "" : <div class="alert alert-danger" role="alert" style={{marginBottom:"30px",}}>
              LogIn or Register to apply for the Job
            </div>
            }
            

          </div>
        </div>
      </div>)
    }
     
    </>
  );
};

export default JobDetail;
