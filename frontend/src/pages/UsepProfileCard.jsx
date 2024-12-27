import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsepProfileCard = () => {
  const {user} = useSelector(v=>v.auth)
  return (
    <>
      <div className="Usercontainer" style={{ marginBlock: "80px" }}>
        <div className="usercard mb-3">
          <div className="row g-0">
            <div>
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ fontSize: "25px", marginBlock: "25px" ,textAlign:"justify",marginLeft:"20px"}}
                >
                  <span style={{textDecoration: "underline",
                    textDecorationColor: "white",
                    textDecorationThickness: "3px",}}>Us</span>er Information
                </h5>
                <table
                  className="table table-borderless review_table"
                  
                >
                 
                  <tbody>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600" }}>
                        Username:
                      </td>
                      <td style={{fontWeight:"600"}}>{user?.user?.firstname} {user?.user?.lastname}</td>
                    </tr>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600"}}>
                        Role:
                      </td>
                      <td style={{fontWeight:"600"}}>{user?.user?.roles}</td>
                    </tr>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600"}}>
                        Email:
                      </td>
                      <td style={{fontWeight:"600"}}>{user?.user?.email}</td>
                    </tr>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600" }}>
                        PhoneNumber:
                      </td>
                      <td style={{fontWeight:"600"}}>{user?.user?.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600" }}>
                        Location:
                      </td>
                      <td style={{fontWeight:"600"}}>Not Available</td>
                    </tr>

                    <tr>
                      <td scope="col" style={{ fontWeight: "600" }}>
                        Gender:
                      </td>
                      <td style={{fontWeight:"600"}}>{user?.user?.gender}</td>
                    </tr>
                  </tbody>
                </table>
               <Link to={"/Userupdateprofile"}> <p className="edite" style={{textAlign:"justify",fontSize:"20px",fontWeight:"bolder", padding:"20px"}}><i className="fa-solid fa-pen-to-square"></i> Edit</p></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsepProfileCard;
