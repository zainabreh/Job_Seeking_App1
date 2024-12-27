import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleApplicationQuery } from '../../Redux/auth/application.api'

const ApplicationView = () => {
    const {id} = useParams
    const {data} = useGetSingleApplicationQuery(id)
    console.log("DATA>>>>>>>>>>>>>>>>",data);
    
  return (
    <>
       <div class="container" style={{color:"white"}}>
        <div class="row">
            <div class="col-md-12">
                <h1>Application Details</h1>
                <hr/>
            </div>
        </div>
        <div class="row flex" style={{border:"2px solid black"}}>
            <div class="col-md-6" >
                <ul>
                    <li><strong style={{fontSize:"20px",fontStyle:"italic"}}>Name:</strong> Cyber Security Specialist</li>
                    <li><strong style={{fontSize:"20px",fontStyle:"italic"}}>Email:</strong> cover letter</li>
                    <li><strong style={{fontSize:"20px",fontStyle:"italic"}}>Phone:</strong> cover letter</li>
                    <li><strong style={{fontSize:"20px",fontStyle:"italic"}}>Status:</strong> pending</li>
                    <li><strong style={{fontSize:"20px",fontStyle:"italic"}}>Cover Letter:</strong> cover letter</li>
                </ul>
            </div>
        <div class="col-md-6">
                <h4>Resume</h4>
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAA" alt="Resume" class="img-fluid"/>
            </div>
        </div>
        </div>     
    
    </>
  )
}

export default ApplicationView
