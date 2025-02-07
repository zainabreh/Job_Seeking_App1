import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useSingleUserQuery,
  useUpdateUserMutation,
} from "../../Redux/auth/auth.api";
import { setUserInfo } from "../../Redux/Feature/auth.slice";
import { toast } from "react-toastify";

const AdminUpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const { data, refetch } = useSingleUserQuery(id);

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    username: "",
  });

  useEffect(() => {
    if (data && data) {
      setFormData({
        email: data && data.user.email,
        firstname: data && data.user.firstname,
        lastname: data && data.user.lastname,
        phoneNumber: data && data.user.phoneNumber,
        username: data && data.user.username,
      });
      refetch();
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const updateInfo = await updateUser({ _id: id, formData }).unwrap();

      if (updateInfo?.success) {
        dispatch(setUserInfo({ user: updateInfo.user }));
        navigate("/admin/adminprofilecard");
        toast.success("Profile Updated successfully!", {
          toastId: "profile-updated-success",
        });
      } else {
        toast.error(updateInfo?.message || "Failed to Update Profile.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to Update Profile.");
    }
  };

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
              value={formData.email}
              className="form-control"
              id="inputEmail4"
              placeholder="Enter Email"
            />
          </div>

          <div className="col-md-6">
            <label for="inputUsername4" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              id="inputUsername4"
              placeholder="Enter First Name"
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
              name="lastname"
              className="form-control"
              id="inputUsername4"
              placeholder="Enter Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label for="inputGender" className="form-label">
              PhoneNumber
            </label>
            <input
              type="text"
              className="form-control"
              id="inputGender"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label for="inputGender" className="form-label">
              userName
            </label>
            <input
              type="text"
              className="form-control"
              id="inputGender"
              placeholder="Enter User Name"
              name="username"
              onChange={handleChange}
              value={formData.username}
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

export default AdminUpdateProfile;
