import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetRecuiterApplicationQuery, useUpdateApplicationStatusMutation } from "../../Redux/auth/application.api";
import { useDispatch, useSelector } from "react-redux";
import { statusUpdation } from "../../Redux/Feature/application.slice";
import {toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Link } from "react-router-dom";



export default function Recuiterapplication() {

  const [updateApplicationStatus] = useUpdateApplicationStatusMutation()
  const {data,isLoading,refetch} = useGetRecuiterApplicationQuery()
  const {user} = useSelector(v=>v.auth)
  const dispatch = useDispatch()
  
  const currentUserId = user?._id;
  const filteredApplications = React.useMemo(() => {
    if (!data?.applications || !Array.isArray(data.applications)) return [];
    return data.applications.filter(
      (application) => application.recuiter_id?.user === currentUserId
    );
  }, [data, currentUserId]);

    React.useEffect(() => {
      const intervalId = setInterval(() => {
        refetch();
      }, 10000); // Refetch every 10 seconds
    
      return () => clearInterval(intervalId);
    }, [refetch]);
    
    if(isLoading){
      return <h1>Loading....</h1>
    }

  if (filteredApplications.length === 0) {
    return <h1 style={{
      textAlign: "center",
      marginTop: "30%",
      fontSize: "36px",
      fontWeight: "bold",
      color: "#333",
      textShadow: "2px 2px 4px #ccc",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out"
    }}>No Applications Found</h1>
  }

  const handleStatusUpdation = async (id, newstatus) => {
  
    try {
      const updatejob = await updateApplicationStatus({ id, status: newstatus });
  
      if (updatejob?.data?.success) {
        dispatch(statusUpdation(updatejob.data.updateApplication)); 
        await refetch();
        toast.success("Status updated successfully!");
      } else {
        toast.error(updatejob?.data?.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("An error occurred while updating status.");
    }
  };
  


  return (
    <div className="table-container container" style={{color:"white"}}>
     
      <h3 style={{ marginBlock: "15px" }}>
        <span
          style={{
            textDecoration: "underline",
            textDecorationColor: "white",
            textDecorationThickness: "3px",
          }}
        >
          Man
        </span>
        age
        &nbsp;Applications
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{backgroundColor:"#0d47a1"}}>
            <TableRow>
              <TableCell sx={{ fontWeight: "700", fontSize: "15px" ,color:"white"}}>
                #
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px" ,color:"white"}}
              >
                Job Postion
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px",color:"white" }}
              >
                Company
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px",color:"white" }}
              >
                Status
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px" ,color:"white"}}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredApplications.map((row,index) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index++}
                  </TableCell>
                  <TableCell align="left"><Link to={`/applicationview/${row._id}`}><i className="fa-regular fa-eye" style={{fontSize:"15px",padding:"5px",cursor:"pointer",color:"blue"}}></i></Link>{row.position}</TableCell>
                  <TableCell align="left">{row.companyName}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">
                <span className="badge text-bg-success" style={{cursor:"pointer"}} onClick={()=>handleStatusUpdation(row._id,'accept')}>Accept</span>
                <span className="badge text-bg-danger" style={{marginInline:"5px",cursor:"pointer"}}onClick={()=>handleStatusUpdation(row._id,'reject')}>Reject</span>
                <span className="badge text-bg-warning text-white" style={{cursor:"pointer"}} onClick={()=>handleStatusUpdation(row._id,'pending')}>Pending</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


