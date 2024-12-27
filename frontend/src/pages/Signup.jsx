import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../../Redux/auth/auth.api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../Redux/Feature/auth.slice.js";

const Signup = () => {
  const [preview, setPreview] = useState(undefined);
  const [apimsg, setApimsg] = useState("");
  const dispatch = useDispatch();
  const [registerUser, { isLoading, error, data }] = useRegisterUserMutation();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
    touched,
    values,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phoneNumber: "",
      roles: "user",
      password: "",
      cpassword: "",
      gender: "",
      avatar: "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required("Required"),
      lastname: yup.string().required("Required"),
      roles: yup.string().required("Required"),
      gender: yup.string().required("Required"),
      avatar: yup.string(),
      username: yup.string().required("Required"),
      email: yup.string().required("Reqiured"),
      phoneNumber: yup.string().required("Reqiured"),
      password: yup.string().required("Password is required"),
      cpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Check for correction"),
    }),
    onSubmit: async (v) => {
      delete v.cpassword;

      const user = await registerUser(v).unwrap();
      dispatch(setUserInfo(user));      
      // toast.success("User Registered Successfully");

      if (user) {
        setApimsg(user);
      } else {
        setApimsg({
          success: false,
          error: "Something went wrong",
        });
      }

      handleReset();
      setPreview(undefined);
      document.getElementById("preview-reset").value = "";
    },
  });

  const handleImgChange = (e) => {
    const read = new FileReader();
    read.onload = () => {
      if (read.readyState === 2) {
        console.log("inside ready state");
        setFieldValue("avatar", read.result);
        setPreview(read.result);
      }
    };
    read.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <ToastContainer />
      <div className="container" style={{ width: "800px", padding: "20px" }}>
        
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

            <h3 className="card-title text-center">Register</h3>
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
            <form onSubmit={handleSubmit} className="row g-3 mt-3">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="firstname"
                  value={values.firstname}
                  placeholder="Enter First name"
                />
                {touched.firstname && errors.firstname ? (
                  <div style={{ color: "red" }}>{errors.firstname}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="lastname"
                  value={values.lastname}
                  placeholder="Enter Last name"
                />
                {touched.lastname && errors.lastname ? (
                  <div style={{ color: "red" }}>{errors.lastname}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="username"
                  value={values.username}
                  placeholder="Enter Username"
                />
                {touched.username && errors.username ? (
                  <div style={{ color: "red" }}>{errors.username}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-6">
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

              {/* <div className="col-md-6">
                <select
                  id="inputState"
                  className="form-select"
                  type="text"
                  name="roles"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.roles}
                >
                  <option selected>Choose...</option>
                  <option value="user">User</option>
                  <option value="recuiter">Recuiter</option>
                  <option value="admin">Admin</option>
                </select>
                {touched.roles && errors.roles ? (
                  <div style={{ color: "red" }}>{errors.roles}</div>
                ) : (
                  ""
                )}
              </div> */}

              <div className="col-md-6">
                <select
                  id="inputState"
                  className="form-select"
                  type="text"
                  name="gender"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                >
                  <option selected>gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {touched.gender && errors.gender ? (
                  <div style={{ color: "red" }}>{errors.gender}</div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group col-md-6">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                {touched.password && errors.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-6">
                <input
                  type="password"
                  name="cpassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cpassword}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
                {touched.cpassword && errors.cpassword ? (
                  <div style={{ color: "red" }}>{errors.cpassword}</div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  className="form-control"
                  id="phoneNumber"
                  placeholder="PhoneNumber"
                />
                {touched.phoneNumber && errors.phoneNumber ? (
                  <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group col-md-6">
                <input
                  className="form-control pt-2 "
                  type="file"
                  name="avatar"
                  id="preview-reset"
                  onChange={(e) => handleImgChange(e)}
                />
              </div>
              <div className="text-center ">
                <img
                  src={
                    preview
                      ? preview
                      : "https://www.w3schools.com/howto/img_avatar.png "
                  }
                  className="rounded mx-auto mt-3"
                  width={100}
                  alt="..."
                />
              </div>
              <div className="text-center ">
                <button
                  type="submit"
                  className="btn btn-primary col-md-3 text-center" disabled={isLoading ? true : false}
                >
                  {isLoading ? 'isLoading....' : "Register"}
                </button>
              </div>
            </form>
            <div className="text-center">
              <p>
                Already have an account?{" "}
                <span style={{ cursor: "pointer", color: "#2962ff" }}>
                  <Link to={"/login"}>LogIn</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
