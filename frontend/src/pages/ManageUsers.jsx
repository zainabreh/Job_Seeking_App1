import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useAllUserQuery,
  useUpdateUserRoleMutation,
} from "../../Redux/auth/auth.api";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function ManageUsers() {
  const [updateUserRole] = useUpdateUserRoleMutation();

  const { data, refetch } = useAllUserQuery();

  React.useEffect(() => {
    if (data && data.users) {
      refetch();
    }
  }, [data]);

  const handleRole = async (id, roles) => {
    try {
      const newUser = await updateUserRole({ id, roles }).unwrap();
console.log("new user........",newUser);

      if (newUser?.success) {
        await refetch();
        toast.success("Status updated successfully!");
      } else {
        toast.error(updatejob?.message || "Failed to update status.");
      }
    } catch (error) {
      console.log("Failed updation");
      toast.error("An error occurred while updating status.");
    }
  };

  return (
    <div className="container">

      <h2
        style={{
          textAlign: "center",
          marginBlock: "20px",
          fontWeight: "600",
          color: "white",
        }}
      >
        Manage User
      </h2>

      <TableContainer component={Paper} sx={{ marginBlock: "30px" }}>
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
                Username
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px", color: "white" }}
              >
                Email
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "700", fontSize: "15px", color: "white" }}
              >
                Role
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
            {data &&
              data.users.map((row, index) => (
                <TableRow
                  key={row.No}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.roles}</TableCell>
                  <TableCell align="left">
                    <span
                      className="badge text-white"
                      onClick={() => handleRole(row._id, "user")}
                      style={{ backgroundColor: "purple", cursor: "pointer" }}
                    >
                      User
                    </span>
                    <span
                      className="badge text-white"
                      onClick={() => handleRole(row._id, "recuiter")}
                      style={{
                        marginInline: "5px",
                        backgroundColor: "orange",
                        cursor: "pointer",
                      }}
                    >
                      Recuiter
                    </span>
                    <span
                      className="badge text-white"
                      onClick={() => handleRole(row._id, "admin")}
                      style={{ backgroundColor: "blue", cursor: "pointer" }}
                    >
                      Admin
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
