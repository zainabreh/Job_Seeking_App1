import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user, isAuthenticated } = useSelector((v) => v.auth);

  return (
    <>
      <div className="sidebar">
        <ul className="nav flex-column short-sidebar">

          {/* Profile Picture*/}
          
            <li className="nav-item">
              <div>
                <img src={user?.user?.avatar} alt="" style={{width:"70px",height:"70px",borderRadius:"50%"}}/>
                <p className="nav-list" aria-current="page" style={{fontSize:"20px",marginBlock:"15px",marginLeft:"15px"}}>
                  {user?.user?.username}
                </p>
              </div>
            </li>
          <hr />




          {/* User */}
          {user?.user?.roles === "user" && (
            <li className="nav-item">
              <Link to={"usepProfileCard"}>
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

          {user?.user?.roles === "user" && (
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


          {/* Recuiter */}
          {user?.user?.roles === "recuiter" && (
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

          {user?.user?.roles === "recuiter" && (
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

          {user?.user?.roles === "recuiter" && (
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

          {user?.user?.roles === "recuiter" && (
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

          {user?.user?.roles === "admin" && (
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

          {user?.user?.roles === "admin" && (
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

          {user?.user?.roles === "admin" && (
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

          {user?.user?.roles === "admin" && (
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
                  
                    <i class="fa-solid fa-list" style={{ fontSize: "20px" }}></i>
                    
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
