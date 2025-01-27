import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSingleUserQuery } from "../../Redux/auth/auth.api";

const AdminProfileCard = () => {
  const {user} = useSelector(v=>v.auth)
  
  const uId = user?._id
  const {data:logUser,refetch} = useSingleUserQuery(uId)

  useEffect(()=>{
    if(logUser && logUser.user){
      refetch()
    }
  },[logUser])

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
                    textDecorationThickness: "3px",}}>Ad</span>min Information
                </h5>
                <table
                  className="table table-borderless review_table"
                  
                >
                 
                  <tbody>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600" }}>
                        AdminName:
                      </td>
                      <td style={{fontWeight:"600"}}>{logUser?.user.firstname} {logUser?.user.lastname}</td>
                    </tr>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600"}}>
                        Role:
                      </td>
                      <td style={{fontWeight:"600"}}>{logUser?.user.roles}</td>
                    </tr>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600"}}>
                        Email:
                      </td>
                      <td style={{fontWeight:"600"}}>{logUser?.user.email}</td>
                    </tr>
                    <tr>
                      <td scope="col" style={{ fontWeight: "600" }}>
                        PhoneNumber:
                      </td>
                      <td style={{fontWeight:"600"}}>{logUser?.user.phoneNumber}</td>
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
                      <td style={{fontWeight:"600"}}>{logUser?.user.gender}</td>
                    </tr>
                  </tbody>
                </table>
               <Link to={`/admin/adminupdateprofile/${logUser?.user._id}`}> <p className="edite" style={{textAlign:"justify",fontSize:"20px",fontWeight:"bolder", padding:"20px"}}><i className="fa-solid fa-pen-to-square"></i> Edit</p></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileCard;