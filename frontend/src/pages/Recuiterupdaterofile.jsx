import React from "react";
import { Link } from "react-router-dom";

const Recuiterupdaterofile = () => {
  return (
    <>
      <div className="container" style={{margin:"40px",color:"white"}}>
        <h3 style={{marginBlock:"15px"}}><span style={{ textDecoration:"underline", textDecorationColor:"white",textDecorationThickness:"3px"}}>Upd</span>ate Profile</h3>
        <form className="row g-3">
          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="abc@gmail.com"/>
          </div>
          <div className="col-md-6">
            <label for="inputUsername4" className="form-label">
              Recuitername
            </label>
            <input
              type="Username"
              className="form-control"
              id="inputUsername4"
              placeholder="abc"
            />
          </div>
         
         
          <div className="col-md-6">
            <label for="inputGender" className="form-label">
              PhoneNumber
            </label>
            <input type="text" className="form-control" id="inputGender" placeholder="phone Number"/>
          </div>
          
          <div className="col-12" style={{textAlign:"center",marginTop:"40px"}}>
            <Link to={"/recuiter/recuiterProfileCard"}><button type="submit" className="btn" style={{fontSize:"16.5px",backgroundColor:"white"}}>
             Update Profile
            </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Recuiterupdaterofile;

