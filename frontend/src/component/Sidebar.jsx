import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSingleUserQuery } from "../../Redux/auth/auth.api";

const Sidebar = () => {
  const { user, key } = useSelector((v) => v.auth);
  const id = user?._id;

  const { data, refetch } = useSingleUserQuery(id);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (data && data.user) {
      refetch();
    }
  }, [data]);

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="nav flex-column short-sidebar">
          {/* Profile Picture*/}
          <li className="nav-item">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={data?.user.avatar}
                alt=""
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
              />
              <p
                className="nav-list"
                aria-current="page"
                style={{ fontSize: "20px", marginBlock: "15px" }}
              >
                {data?.user.username}
              </p>
            </div>
          </li>
          <hr />

          {/* User */}
          {data?.user.roles === "user" && (
            <li className="nav-item">
              <Link to={"usepProfileCard"} onClick={() => setIsOpen(false)}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-regular fa-user"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Profile
                  </p>
                </div>
              </Link>
            </li>
          )}

          {data?.user.roles === "user" && (
            <li className="nav-item">
              <Link to={"userapplication"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-solid fa-briefcase"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Applications
                  </p>
                </div>
              </Link>
            </li>
          )}

          {/* Recruiter */}
          {data?.user.roles === "recuiter" && (
            <li className="nav-item">
              <Link to={"/recuiter/recuiterProfileCard"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-regular fa-user"
                    style={{ fontSize: "15px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Profile
                  </p>
                </div>
              </Link>
            </li>
          )}

          {data?.user.roles === "recuiter" && (
            <li className="nav-item">
              <Link to={"/recuiter/recuiterapplication"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-solid fa-briefcase"
                    style={{ fontSize: "15px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Applications
                  </p>
                </div>
              </Link>
            </li>
          )}

          {data?.user.roles === "recuiter" && (
            <li className="nav-item">
              <Link to={"/recuiter/addjob"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-regular fa-square-plus"
                    style={{ fontSize: "15px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Add Job
                  </p>
                </div>
              </Link>
            </li>
          )}

          {data?.user.roles === "recuiter" && (
            <li className="nav-item">
              <Link to={"/recuiter/manageJobs"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-solid fa-user-gear"
                    style={{ fontSize: "15px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Manage Jobs
                  </p>
                </div>
              </Link>
            </li>
          )}

          {/* Admin */}
          {data?.user.roles === "admin" && (
            <li className="nav-item">
              <Link to={"/admin/adminprofilecard"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-regular fa-user"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Profile
                  </p>
                </div>
              </Link>
            </li>
          )}

          {data?.user.roles === "admin" && (
            <li className="nav-item">
              <Link to={"/admin/adminStatus"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-regular fa-user"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Admin
                  </p>
                </div>
              </Link>
            </li>
          )}

          {data?.user.roles === "admin" && (
            <li className="nav-item">
              <Link to={"/admin/manageUsers"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i
                    className="fa-solid fa-user-gear"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Manage Users
                  </p>
                </div>
              </Link>
            </li>
          )}

          {data?.user.roles === "admin" && (
            <li className="nav-item">
              <Link to={"/admin/addcategory"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <i className="fa-solid fa-list" style={{ fontSize: "20px" }}></i>
                  <p
                    className="nav-list"
                    style={{ margin: "5px", fontWeight: "700", color: "white" }}
                  >
                    Add Category
                  </p>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
