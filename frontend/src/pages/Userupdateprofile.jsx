import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setUserInfo } from "../../Redux/Feature/auth.slice.js";
import {
  useSingleUserQuery,
  useUpdateUserMutation,
} from "../../Redux/auth/auth.api";
import { toast } from "react-toastify";

const Userupdateprofile = () => {
  const { id } = useParams();
  const { user } = useSelector((v) => v.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const { data, refetch } = useSingleUserQuery(id);

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    username: "",
    niches:[]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();    

    try {
      const res = await updateUser({ _id: id, formData }).unwrap();
      
      if (res?.success) {
        dispatch(setUserInfo({ user: res.user }));
        navigate("/usepProfileCard");
        toast.success("Profile Updated successfully!", {
          toastId: "profile-updated-success",
        });
      } else {
        toast.error(res?.message || "Failed to Update Profile.");
      }
    } catch (error) {
      toast.error("updation error");
    }
  };

  useEffect(() => {
    if (data && data) {
      setFormData({
        email: data && data.user.email,
        firstname: data && data.user.firstname,
        lastname: data && data.user.lastname,
        phoneNumber: data && data.user.phoneNumber,
        username: data && data.user.username,
        niches:data && data.user.niches
      });
      refetch();
    }
  }, [data]);

  return (
    <>
      <div className="container" style={{ color: "white" }}>
        <h3 style={{ marginBlock: "15px" }}>
          <span
            style={{
              textDecoration: "underline",
              textDecorationColor: "white",
              textDecorationThickness: "3px",
            }}
          >
            Upd
          </span>
          ate Profile
        </h3>
        <form className="row g-3" onSubmit={updateProfile}>
          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
              id="inputEmail4"
              placeholder="Enter Email"
              value={formData.email}
            />
            
          </div>
          <div className="col-md-6">
            <label for="inputUsername4" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUsername4"
              placeholder="Enter First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label for="inputUsername4" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUsername4"
              placeholder="Enter Last Name"
              name="lastname"
              onChange={handleChange}
              value={formData.lastname}
            />
          </div>
          <div className="col-md-6">
            <label for="inputUsername4" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUsername4"
              placeholder="Enter User Name"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>

          <div className="col-md-6">
            <label for="inputGender" className="form-label">
              PhoneNumber
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-control"
              id="inputGender"
              placeholder="phone Number"
            />
          </div>

          <div className="col-md-6">
            <label for="inputGender" className="form-label">
              Skills
            </label>
            <input
              type="text"
              name="niches"
              value={formData.niches}
              onChange={handleChange}
              className="form-control"
              id="inputGender"
              placeholder="Web Development, Data Science"
            />
          </div>

          <div
            className="col-12"
            style={{ textAlign: "center", marginTop: "40px" }}
          >
            <button
              type="submit"
              className="btn"
              style={{ fontSize: "16.5px", backgroundColor: "white" }}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Userupdateprofile;
