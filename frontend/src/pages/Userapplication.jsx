import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useDelteApplicationMutation,
  useGetUserApplicationQuery,
} from "../../Redux/auth/application.api";
import { useDispatch, useSelector } from "react-redux";
import { removeApplication } from "../../Redux/Feature/application.slice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function createData(No, position, company, status) {
  return { No, position, company, status };
}

export default function Userapplication() {
  const { data, error, isLoading, refetch } = useGetUserApplicationQuery();

  React.useEffect(() => {
    if (data && data.applications) {
      refetch();
    }
  }, [data]);

  const [delteApplication] = useDelteApplicationMutation();
  const { user } = useSelector((v) => v.auth);
  const dispatch = useDispatch();
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  const currentUserId = user?._id;

  const filteredApplications = Array.isArray(data?.applications)
    ? data?.applications.filter(
        (app) => app.applicant_id?.user === currentUserId
      )
    : [];

    console.log("appppppppppppppppp",filteredApplications);
    
  if (filteredApplications.length === 0) {
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
        No Applications Found
      </h1>
    );
  }

  const handleDelete = async (id) => {
    const delApp = await delteApplication(id).unwrap();

    if (delApp.success) {
      dispatch(removeApplication(id));
      refetch();
      toast.success("Deleted successfully!", {
        toastId: "application-deletion-success",
      });
    } else {
      toast.error("An error occurred while deleting the application");
    }
  };

  return (
    <div className="table-container container" style={{ color: "white" }}>
      <h3 style={{ marginBlock: "15px" }}>
        <span
          style={{
            textDecoration: "underline",
            textDecorationColor: "white",
            textDecorationThickness: "3px",
          }}
        >
          My
        </span>
        &nbsp;Applications
      </h3>
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
                Status
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
            {filteredApplications.map((v, index) => (
              <TableRow
                key={v._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index++}
                </TableCell>
                <TableCell align="left">
                  <Link to={`/applicationview/${v._id}`}>
                    <i
                      className="fa-regular fa-eye"
                      style={{
                        fontSize: "15px",
                        padding: "5px",
                        cursor: "pointer",
                        color: "blue",
                      }}
                    ></i>
                  </Link>
                  {v.position}
                </TableCell>
                <TableCell align="left">{v.companyName}</TableCell>
                <TableCell align="left">{v.status}</TableCell>
                <TableCell align="left">
                  <Link to={`/UpdateUserApplication/${v._id}`}>
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
                    onClick={() => handleDelete(v._id)}
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
