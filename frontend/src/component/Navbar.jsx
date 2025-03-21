import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useLazyLogoutUserQuery,
  useSingleUserQuery,
} from "../../Redux/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../../Redux/Feature/auth.slice.js";
import "react-toastify/ReactToastify.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, key } = useSelector((v) => v.auth);
  const id = user?._id;

  const { data, refetch } = useSingleUserQuery(id);

  useEffect(() => {
    if (data && data.user) {
      console.log("user",data && data.user);
      
      refetch();
    }
  }, [data]);  

  const dispatch = useDispatch();

  const [logoutUser] = useLazyLogoutUserQuery();

  const handleLogOut = async () => {
    await logoutUser().unwrap();

    dispatch(clearUserInfo());

      toast.success("LogOut Successfully....")

  };

  return (
    <>
      <nav className="navbar bg-primary" data-bs-theme="dark">
          
        <div className="container-fluid">
          <Link to={"/"}>
            <div
              className="logo"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "12px",
              }}
            >
              <i
                className="fa-solid fa-briefcase"
                style={{ fontSize: "20px", color: "white" }}
              ></i>
              &nbsp;&nbsp;
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Jobs
              </span>
            </div>
          </Link>
          {data?.user && key ? (
            <div className="btn-group dropstart">
              <img
                src={data?.user?.avatar}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <button
                className="btn  dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ outline: "none", border: "none", color: "white" }}
              >
                Hi, {data?.user.firstname} {data?.user.lastname}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                style={{ width: "20px" }}
              >
                <li>
                  {data?.user.roles === "admin" ? (
                    <Link
                      to={"/admin/admindashboard"}
                      className="dropdown-item"
                    >
                      Dashboard
                    </Link>
                  ) : data?.user.roles === "recuiter" ? (
                    <Link
                      to={"/recuiter/recuiterdashboard"}
                      className="dropdown-item"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link to={"userdashboard"} className="dropdown-item">
                      Dashboard
                    </Link>
                  )}
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <Link to={"/"}>
                  <li>
                    <button className="dropdown-item" onClick={handleLogOut}>
                      LogOut
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginInline: "20px",
                }}
              >
                <Link to={"/login"}>
                  <button className="btn custom-btn">LogIn</button>
                </Link>
                <Link to={"/signup"}>
                  <button
                    className="btn custom-btn"
                    style={{ marginInline: "10px" }}
                  >
                    SignUp
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
     
    </>
  );
};

export default Navbar;
