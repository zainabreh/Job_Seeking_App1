import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(No, position, company, status) {
  return { No, position, company, status };
}

const rows = [
  createData(0o1, "Zainab", "zainab@gmail.com", "user"),
  createData(0o2, "Rehman", "rehman@gmail.com", "Recuiter"),
];

export default function ManageUsers() {
  return (
    <div className="container">
      
      <h2 style={{textAlign:"center",marginBlock:"20px",fontWeight:"600",color:"white"}}>Manage User</h2>
        
        <TableContainer component={Paper} sx={{marginBlock:"30px"}}>
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
                  Username
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "700", fontSize: "15px" ,color:"white"}}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "700", fontSize: "15px" ,color:"white"}}
                >
                  Role
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
              {rows.map((row) => (
                <TableRow
                  key={row.No}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.No}
                  </TableCell>
                  <TableCell align="left">{row.position}</TableCell>
                  <TableCell align="left">{row.company}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">
                  <span className="badge text-white" style={{backgroundColor:"purple"}}>User</span>
                <span className="badge text-white" style={{marginInline:"5px",backgroundColor:"orange"}}>Recuiter</span>
                <span className="badge text-white" style={{backgroundColor:"blue"}}>Admin</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
     
    </div>
    );
}
