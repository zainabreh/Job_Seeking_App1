import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useDeleteJobMutation,
  useGetMyJobsQuery,
} from "../../Redux/auth/job.api";
import { Link, useNavigate } from "react-router-dom";
import { removejob, setjob } from "../../Redux/Feature/job.slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function Managejob() {
  const navigate = useNavigate();
  const { user } = useSelector((v) => v.auth);
  const { data, isLoading, error, refetch } = useGetMyJobsQuery();
  const [deleteJob] = useDeleteJobMutation();


  const currentUser = user?._id;

  React.useEffect(() => {
    if (user?._id) {
      refetch();
    }
  }, [user?._id, refetch]);

  const filteredJobs = Array.isArray(data?.myjobs)
    ? data?.myjobs.filter((job) => job.postedBy == currentUser)
    : [];

  const dispatch = useDispatch();

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  if (error) {
    return <h1>Somthing went wrong</h1>;
  }

  if (!filteredJobs.length) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "30%",
          fontSize: "36px",
          fontWeight: "bold",
          color: "#333",
          textShadow: "2px 2px 4px #ccc",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}
      >
        You have Not Posted Any Jobs
      </h1>
    );
  }

  const handleDelete = async (id) => {
    const delJob = await deleteJob(id).unwrap();
    if (delJob.success) {
      dispatch(removejob(id));

      refetch();

      toast.success("Deleted successfully!", {
        toastId: "job-deletion-success",
      });
    } else {
      toast.error("An error occurred while deleting the Job");
    }
  };

  return (
    <div className="container">
      <h2
        style={{
          textAlign: "center",
          marginBlock: "10px",
          fontWeight: "600",
          color: "white",
        }}
      >
        Manage Job
      </h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#0d47a1" }}>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "700", fontSize: "15px", color: "white" }}
              >
                #
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px", color: "white" }}
              >
                Job Postion
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px", color: "white" }}
              >
                Company
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px", color: "white" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index++}
                </TableCell>
                <TableCell align="left">{row.position}</TableCell>
                <TableCell align="left">{row.company}</TableCell>
                <TableCell align="left">
                  <Link to={`/jobdetail/${row._id}`}>
                    <i
                      className="fa-regular fa-eye"
                      style={{
                        fontSize: "20px",
                        padding: "5px",
                        cursor: "pointer",
                        color: "blue",
                      }}
                    ></i>
                  </Link>
                  <Link to={`/recuiter/updatejob/${row._id}`}>
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{
                        fontSize: "20px",
                        padding: "5px",
                        cursor: "pointer",
                        color: "green",
                      }}
                    ></i>
                  </Link>
                  <i
                    className="fa-solid fa-trash"
                    style={{
                      fontSize: "20px",
                      padding: "5px",
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => handleDelete(row._id)}
                  ></i>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
