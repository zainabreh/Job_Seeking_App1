import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../Redux/auth/auth.api";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [loginUser,{data,isLoading,error}] = useLoginUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [apimsg, setApimsg] = useState("");
  const { handleChange, handleSubmit,handleReset, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup.string().required("Reqiured"),
        password: yup.string().required("Required"),
      }),
      onSubmit: async (v) => {
        try {
          const user = await loginUser(v);
          console.log(user);
          
          if (user.data.success) {
            setApimsg(user.data.message);
            
            navigate('/')
          } else {
            setApimsg({ success: false, message: user.data.message });
          }
        } catch (error) {
          console.log(error);
          
        }
        handleReset()
      },
    });

  return (
    <>
      <div className="container" style={{ width: "400px", padding: "20px" }}>
        <div className="card">
          <div className="card-body">
            <div className="logo">
              <i
                className="fa-solid fa-briefcase"
                style={{ fontSize: "30px", color: "#2962ff" }}
              ></i>
              &nbsp;&nbsp;
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "600",
                  color: "#2962ff",
                }}
              >
                Jobs
              </span>
            </div>

            <h3 className="card-title text-center">Sign In</h3>
            {apimsg && (
          <div
            className={`alert alert-${
              apimsg && apimsg.success ? "success" : "danger"
            }`}
            role="alert"
          >
            {apimsg && apimsg.message}
          </div>
        )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="email"
                  value={values.email}
                  placeholder="Email@example.com"
                />
                {touched.email && errors.email ? (
                  <div style={{ color: "red" }}>{errors.email}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Type Here"
                />
                {touched.password && errors.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : (
                  ""
                )}
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading ? true : false}>
                {isLoading ? 'isLoading....' : "LogIn"}
              </button>
            </form>
            <div className="text-center">
              <p>
                Don't have an account?{" "}
                <span style={{ cursor: "pointer", color: "#2962ff" }}>
                  <Link to={"/signup"}>Register</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
