import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleUserQuery,
  useUpdateUserMutation,
} from "../../Redux/auth/auth.api";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../Redux/Feature/auth.slice";

const Recuiterupdaterofile = () => {
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
      const res = await updateUser({ _id: id, formData }).unwrap();
      dispatch(setUserInfo({ user: res.user }));
      navigate("/recuiter/recuiterProfileCard");
    } catch (error) {
      console.log("updation error");
    }
  };

  return (
    <>
      <div className="container" style={{ margin: "40px", color: "white" }}>
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
              className="form-control"
              id="inputEmail4"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
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
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              id="inputGender"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
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

export default Recuiterupdaterofile;
