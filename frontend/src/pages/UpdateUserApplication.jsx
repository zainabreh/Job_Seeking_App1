import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
// import { useGetSingleJobQuery } from "../../Redux/auth/job.api";
import { useDispatch, useSelector } from "react-redux";
import { useCreateApplicationMutation, useGetSingleApplicationQuery, useUpdateApplicationMutation } from "../../Redux/auth/application.api";
import { addApplication } from "../../Redux/Feature/application.slice";
import { useSingleUserQuery } from "../../Redux/auth/auth.api";
import { toast } from "react-toastify";

const UpdateUserApplication = () => {

  
  const navigate = useNavigate()
  const {id} = useParams()  
  const dispatch = useDispatch()    

  const [updateApplication,{isLoading}]= useUpdateApplicationMutation()

  const {data,refetch} = useGetSingleApplicationQuery(id) 
   
useEffect(()=>{
  if(data && data.applications){
    refetch()
  }
},[data])
  const {user} = useSelector((v)=>v.auth)

    const Uid = user?._id
  
    const {data:logUser,refetch:refec}= useSingleUserQuery(Uid)  
  
  useEffect(()=>{
    if(logUser && logUser.user){      
      refec()
      }
    },[logUser])
  

  const formik = useFormik({
    initialValues: {
      name:logUser && logUser.user ? `${ logUser.user.firstname} ${ logUser.user.lastname} ` : "",
      companyName: data && data.applications.companyName,
      userEmail: logUser && logUser.user ? logUser.user.email : "",
      phone: logUser && logUser.user ? logUser.user.phoneNumber : "",
      position: data && data.applications.position,
      coverLetter: data && data.applications.coverLetter,
      resume: data && data.applications.resume,
      companyEmail: data && data.applications.companyEmail
    },
    validationSchema: yup.object({
      coverLetter: yup.string(),
      resume: yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {  
      
      const application = await updateApplication({values,id}).unwrap()

      if (application.success) {
        dispatch(addApplication(application))
        // setSubmitting(false);
        navigate("/userapplication")
        toast.success(application.message, { toastId: "update-application-success"});
      }else{
        toast.error(application.message);

      }
      
    },
  });

  const handleImgChange = (e) => {
    const read = new FileReader();
    read.onload = () => {
      if (read.readyState === 2) {
        formik.setFieldValue("resume", read.result);
      }
    };
    read.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="container" style={{ width: "800px", padding: "20px" }}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Update Job Application Form</h3>
          <form className="row g-3" onSubmit={formik.handleSubmit}>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Job Position
              </label>
              <input type="text" name="position" readOnly  value={formik.values.position} className="form-control" id="inputEmail4" placeholder="job position"/>
            </div>
            <div className="col-md-6">
              <label for="inputUsername4" className="form-label">
                Company Name
              </label>
              <input
                type="Username"
                className="form-control"
                id="inputUsername4"
                name="companyName"
                readOnly
                value={formik.values.companyName}
              />
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="email">Company Email</label>
                <input
                  type="email"
                  readOnly
                  name="companyEmail"
                  className="form-control"
                  id="companyEmail"
                  value={formik.values.companyEmail}
                />
                
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="userEmail"
                  className="form-control"
                  id="email"
                  value={formik.values.userEmail}
                />
                {formik.touched.userEmail && formik.errors.userEmail ? (
                  <div style={{ color: "red" }}>{formik.errors.userEmail}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  id="phone"
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div style={{ color: "red" }}>{formik.errors.phone}</div>
                ) : (
                  ""
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="resume">Resume</label>
                <input
                  type="file"
                  name="resume"
                  className="form-control"
                  id="resume"
                  onChange={(e) => handleImgChange(e)}
                />
                {formik.touched.resume && formik.errors.resume ? (
                  <div style={{ color: "red" }}>{formik.errors.resume}</div>
                ) : (
                  ""
                )}
              </div>
  
              <div className="form-group ">
                <label htmlFor="coverLetter">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  className="form-control"
                  id="coverLetter"
                  value={formik.values.coverLetter}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your cover letter"
                />
                {formik.touched.coverLetter && formik.errors.coverLetter ? (
                  <div style={{ color: "red" }}>{formik.errors.coverLetter}</div>
                ) : (
                  ""
                )}
              </div>
              
              <div className="col-md-12 text-center">
                {
                  isLoading ? <button type="submit" disabled className="btn btn-primary ">
                  updating...
                </button> : <button type="submit" className="btn btn-primary ">
                Update Application
              </button>
                }
              
              
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default UpdateUserApplication;
