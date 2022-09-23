import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (props) => props !== "theme",
})(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, props) {
//   return { name, };
// }

// const rows = [
//   createData('Frozen yoghurt', 159),
//   createData('Ice cream sandwich', 23),
//   createData('Eclair', 262 ),
//   createData('Cupcake', 305),
//   createData('Gingerbread', 356),
// ];

export default function CustomizedTables(props) {
    const m1 = useMediaQuery("(min-width:600px)");
  return (
    <TableContainer component={Paper}>
      <Table 
      sx={{ minWidth: m1 ? "600px" : "100%" }}
      aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Detail properties</StyledTableCell>

            <StyledTableCell align="right">Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Branch</StyledTableCell>
            <StyledTableCell align="right">{props.dob}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>EMAIL</StyledTableCell>
            <StyledTableCell align="right">{props.email}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
         <TableBody>
          <StyledTableRow>
            <StyledTableCell>DOB</StyledTableCell>
            <StyledTableCell align="right">{props.usn}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
        {/*<TableBody>
          <StyledTableRow>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell align="right">{props.address}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Year joined</StyledTableCell>
            <StyledTableCell align="right">{props.yoj}</StyledTableCell>
          </StyledTableRow>
        </TableBody>

        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Hostel fees 1st year</StyledTableCell>
            <StyledTableCell align="right">₹{props.hf1}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Hostel fees 2nd year</StyledTableCell>
            <StyledTableCell align="right">₹{props.hf2}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Hostel fees 3rd year</StyledTableCell>
            <StyledTableCell align="right">₹{props.hf3}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Hostel fees 4th year</StyledTableCell>
            <StyledTableCell align="right">₹{props.hf4}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Caution Depsoit</StyledTableCell>
            <StyledTableCell align="right">₹{props.cd}</StyledTableCell>
          </StyledTableRow>
        </TableBody> */}
      </Table>
    </TableContainer>
  );
}