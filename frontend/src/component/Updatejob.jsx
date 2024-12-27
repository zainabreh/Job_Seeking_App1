import {  useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useGetsingleJobQuery, useUpdateJobMutation } from "../../Redux/auth/job.api";
import { useDispatch, useSelector } from "react-redux";
import { setjob } from "../../Redux/Feature/job.slice";
import { useNavigate, useParams } from "react-router-dom";




const Updatejob = () => {

  const {id} = useParams()    

  const [updateJob, { data: createData, error: createError, isLoading }] = useUpdateJobMutation();

  const {data} =useGetsingleJobQuery(id)  

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  if (!data || !data.job) {
    return <div>Loading...</div>;
  }
  
 const initialValues =  data && data.job && {
    position: data.job.position,
    company: data.job.company,
    location: data.job.location,
    status: data.job.status,
    category: data.job.category,
    vacancy: data.job.vacancy,
    deadline: data.job.deadline,
    salary: data.job.salary,
    email: data.job.email,
    facilities: data.job.facilities.toString(),
    requiredSkill: data.job.requiredSkill.toString(),
    description: data.job.description,
  }

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
    setFieldValue,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      position: yup.string().required("Position is required"),
      company: yup.string().required("Company is required"),
      location: yup.string().required("Location is required"),
      status: yup.string().required("Job Status is required"),
      category: yup.string().required("Job category is required"),
      vacancy: yup.number().required("Vacancy is required"),
      salary: yup.string().required("Salary is required"),
      deadline: yup.date().required("Deadline is required"),
      email: yup
        .string()
        .email("Invalid email")
        .required("Contact Mail is required"),
      facilities: yup.string(),
      requiredSkill: yup.string().required("Skill is required"),
      description: yup.string().required("Job Description is required"),
    }),
    onSubmit: async (v) => {
      const facilitiesArray = v.facilities.split(",");
      const requiredSkillsArray = v.requiredSkill.split(",");

      const formData = {
        ...v,
        facilities: facilitiesArray.map((facility) => facility.trim()),
        requiredSkill: requiredSkillsArray.map((skill) => skill.trim()),
      };
        const newJob = await updateJob({_id:id,formData:formData}).unwrap();
        
        dispatch(setjob(newJob.job));        
        if (newJob.success === true) {
          toast.success(newJob.message);
        } else {
          toast.error(newJob.message);
        }
        navigate("/");
      }
     
  });
  

  return (
    <>
       <ToastContainer />
      <div className="container">
     <h2
          style={{
            textAlign: "center",
            marginBlock: "20px",
            fontWeight: "600",
            color: "white",
          }}
        >Update Job</h2>
        <form className="row g-3" onSubmit={handleSubmit} style={{ color: "white" }}>
          <div className="col-md-4">
            <label for="inputEmail4" className="form-label">
              Position
            </label>
            <input
              type="text"
              name="position"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.position}
              className="form-control"
              id="inputEmail4"
              placeholder="Job Position"
            />
            {touched.position && errors.position ? (
              <div style={{ color: "red" }}>{errors.position}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-4">
            <label for="inputPassword4" className="form-label">
              Company
            </label>
            <input
              name="company"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company}
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Company Name"
            />
            {touched.company && errors.company ? (
              <div style={{ color: "red" }}>{errors.company}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-4">
            <label for="inputAddress" className="form-label">
              Location
            </label>
            <input
              name="location"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Job Location"
            />
            {touched.location && errors.location ? (
              <div style={{ color: "red" }}>{errors.location}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-4">
            <label for="inputEmail4" className="form-label">
              Job Status
            </label>
            <select
              id="inputState"
              className="form-select"
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
            >
              <option selected>Select a Job Status</option>
              <option value={"full-time"}>Full-Time</option>
              <option value={"part-time"}>Part-Time</option>
              <option value={"internship"}>Internship</option>
            </select>
            {touched.status && errors.status ? (
              <div style={{ color: "red" }}>{errors.status}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-4">
            <label for="inputPassword4" className="form-label">
            Category
            </label>
            <select
              id="inputState"
              className="form-select"
              name="category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.category}
            >
              <option selected>Select a Job category</option>

              <option value="Software Engineer">Software Engineer</option>
              <option value="Mobile App Developer">Mobile App Developer</option>
              <option value="Web Developer">Web Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Quality Assurance (QA) Engineer">
                Quality Assurance (QA) Engineer
              </option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Business Intelligence Developer">
                Business Intelligence Developer
              </option>
              <option value="Machine Learning Engineer">
                Machine Learning Engineer
              </option>
              <option value="Data Visualization Specialist">
                Data Visualization Specialist
              </option>
              <option value="Network Administrator">
                Network Administrator
              </option>
              <option value="Network Architect">Network Architect</option>
              <option value="Cybersecurity Engineer">
                Cybersecurity Engineer
              </option>
              <option value="Penetration Tester">Penetration Tester</option>
              <option value="Information Security Manager">
                Information Security Manager
              </option>
              <option value="Database Administrator (DBA)">
                Database Administrator (DBA)
              </option>
              <option value="Database Developer">Database Developer</option>
              <option value="Data Architect">Data Architect</option>
              <option value="Database Performance Tuner">
                Database Performance Tuner
              </option>
              <option value="Data Warehouse Architect">
                Data Warehouse Architect
              </option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="Natural Language Processing (NLP) Engineer">
                Natural Language Processing (NLP) Engineer
              </option>
              <option value="Computer Vision Engineer">
                Computer Vision Engineer
              </option>
              <option value="Robotics Engineer">Robotics Engineer</option>
              <option value="AI Researcher">AI Researcher</option>
              <option value="Help Desk Technician">Help Desk Technician</option>
              <option value="Technical Support Specialist">
                Technical Support Specialist
              </option>
              <option value="IT Project Manager">IT Project Manager</option>
              <option value="System Administrator">System Administrator</option>
              <option value="Desktop Support Technician">
                Desktop Support Technician
              </option>
              <option value="Web Designer">Web Designer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Mobile App Designer">Mobile App Designer</option>
              <option value="Front-end Developer">Front-end Developer</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Computer Hardware Engineer">
                Computer Hardware Engineer
              </option>
              <option value="Embedded Systems Engineer">
                Embedded Systems Engineer
              </option>
              <option value="System Administrator">System Administrator</option>
              <option value="IT Consultant">IT Consultant</option>
              <option value="Technical Sales Representative">
                Technical Sales Representative
              </option>
            </select>
            {touched.category && errors.category ? (
              <div style={{ color: "red" }}>{errors.category}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-4">
            <label for="inputAddress" className="form-label">
              Vacancy
            </label>
            <input
            name="vacancy"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.vacancy}
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Job Vacancy"
            />
            {touched.vacancy && errors.vacancy ? (
              <div style={{ color: "red" }}>{errors.vacancy}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-4">
            <label for="inputEmail4" className="form-label">
              Salary
            </label>
            <input
            name="salary"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.salary}
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Job Salary"
            />
            {touched.salary && errors.salary ? (
              <div style={{ color: "red" }}>{errors.salary}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-4">
            <label for="inputPassword4" className="form-label">
              Deadline
            </label>
            <input
            name="deadline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.deadline}
              type="date"
              className="form-control"
              id="inputPassword4"
              placeholder="Company Name"
            />
             {touched.deadline && errors.deadline ? (
              <div style={{ color: "red" }}>{errors.deadline}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-4">
            <label for="inputAddress" className="form-label">
              Contact Mail
            </label>
            <input
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
              type="email"
              className="form-control"
              id="inputAddress"
              placeholder="Job Contact"
            />
             {touched.email && errors.email ? (
              <div style={{ color: "red" }}>{errors.email}</div>
            ) : (
              ""
            )}
          </div>

          <div className="col-md-6">
            <label for="inputCity" className="form-label">
              Job Facilities
            </label>
            <input
            name="facilities"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.facilities}
              type="text"
              className="form-control"
              id="inputCity"
              placeholder="Type Here"
            />
            {touched.facilities && errors.facilities ? (
              <div style={{ color: "red" }}>{errors.facilities}</div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-6">
            <label for="inputState" className="form-label">
              Required Skill
            </label>
            <input
            name="requiredSkill"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.requiredSkill}
              type="text"
              className="form-control"
              id="inputCity"
              placeholder="HTML,CSS"
            />
            {touched.requiredSkill && errors.requiredSkill ? (
              <div style={{ color: "red" }}>{errors.requiredSkill}</div>
            ) : (
              ""
            )}
          </div>

          <div className="col-12">
            <label for="inputState" className="form-label">
              Job Description
            </label>
            <textarea
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
              type="text"
              rows="50"
              className="form-control"
              id="inputCity"
            ></textarea>
             {touched.description && errors.description ? (
              <div style={{ color: "red" }}>{errors.description}</div>
            ) : (
              ""
            )}
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn"
              style={{ marginTop: "20px", backgroundColor: "white" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updatejob;
