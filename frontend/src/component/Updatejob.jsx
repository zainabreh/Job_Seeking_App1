import {  useFormik } from "formik";
import * as yup from "yup";
import "react-toastify/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useGetAllCategoryQuery} from "../../Redux/auth/category.api.js"
import { useNavigate, useParams } from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useGetSingleJobQuery, useUpdateJobMutation } from "../../Redux/auth/job.api.js";
import { setjob } from "../../Redux/Feature/job.slice.js";



const Updatejob = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateJob] = useUpdateJobMutation();
  const { data: categ } = useGetAllCategoryQuery();
  const { data } = useGetSingleJobQuery(id);

  const [formValues, setFormValues] = useState({
    position: "",
    company: "",
    location: "",
    status: "",
    category: "",
    vacancy: "",
    deadline: "",
    salary: "",
    email: "",
    facilities: [],
    requiredSkill: [],
    description: "",
  });

  useEffect(() => {
    if (data?.job) {
      setFormValues({
        position: data.job.position || "",
        company: data.job.company || "",
        location: data.job.location || "",
        status: data.job.status || "",
        category: data.job.category || "",
        vacancy: data.job.vacancy || "",
        deadline: data.job.deadline || "",
        salary: data.job.salary || "",
        email: data.job.email || "",
        facilities: Array.isArray(data.job.facilities) ? data.job.facilities.join(", ") : "",
        requiredSkill: Array.isArray(data.job.requiredSkill) ? data.job.requiredSkill.join(", ") : "",
        description: data.job.description || "",
      });
    }
  }, [data]);
  

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
    initialValues: formValues,
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
    onSubmit: async (values) => {
      const formData = {
        ...values,
        facilities: values.facilities.split(",").map((facility) => facility.trim()),
        requiredSkill: values.requiredSkill.split(",").map((skill) => skill.trim()),
      };

      try {
        const newJob = await updateJob({ _id: id, formData }).unwrap();
        dispatch(setjob(newJob.job));

        if (newJob.success) {
          toast.success(newJob.message);
          navigate("/");
        } else {
          toast.error(newJob.message);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
     
  });

  return (
    <>
      <div className="container">
     <h2
          style={{
            textAlign: "center",
            marginBlock: "20px",
            fontWeight: "600",
            color: "white",
          }}
        >Update Job</h2>
        {/* <button onClick={clear}>clear</button> */}
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
              {
                categ && categ.categories.map((cat)=>(
                  <option value={cat._id}>{cat.categoryName}</option>
                ))
              }
              
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
              Update Job
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updatejob;
