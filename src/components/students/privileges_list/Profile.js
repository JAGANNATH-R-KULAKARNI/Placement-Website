import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../Supabase";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DialogUI from "./utilities2/Dialog";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CardMedia from '@mui/material/CardMedia';
export default function AnnounceACompany(props) {
  //console.log(props.data);
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = React.useState(null);
  const [acc,setAcc]=React.useState([]);
  const [accF,setAccF]=React.useState([]);
  const [model, setModel] = React.useState(false);

  const toggleModel = () => {
    setModel(!model);
  };
  async function fetchTheProfile() {
    const data = await supabase.auth.user();
    
    if (data) {
      setData(data);
     // console.log("crt");
      if (data.email === process.env.REACT_APP_ADMIN) navigate("/admin");
    }
   
  }
  async function fetchTheStudentsF() {
    const data = await supabase.auth.user();
    const stuData = await supabase
      .from("students")
      .select("*,companies(*)")
      .eq('email',data.email);

      if (stuData.data) {
        console.log("stuData.data");
        console.log(stuData.data);
        setAcc(stuData.data);
       
      }
  }
  async function fetchTheStudents() {
    const data = await supabase.auth.user();
    const temp = [];
    

    if (data) {
     
      for (let i = 0; i < acc.length; i++) {
        if (data) {
          if (data.email === acc[i].email) temp.push(acc[i]);
        } else {
          temp.push(acc[i]);
        }
      }
      console.log("student profile");
      console.log(temp);
      setAccF(temp);
    }
    else{
      console.log("wrong");
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
      //fetchTheStudentsF();
     // fetchTheStudents();
    }, 1000);
    if(acc.length == 0 ){
      fetchTheStudentsF();
    }
  });
   
  return (
    <div>
      {data ? (
        <div>
          <CssBaseline />
          <div style={{ height: m1 ? "70px" : "40px" }}></div>
          <main>
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
                borderBottomRightRadius: "50px",
                borderBottomLeftRadius: "50px",
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  style={{
                    fontFamily: "inherit",
                    fontSize: m1 ? "60px" : "50px",
                    fontWeight: 500,
                  }}
                >
                  Profile
                  {/* //{accF[0].name} */}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                  style={{
                    fontSize: m1 ? "17px" : "16px",
                    marginBottom: "-17px",
                  }}
                >
                  {/* <i>
                    
                    “Keep your resume updated before applying for any company.
                    If any of the details is incorrect, please contact placement
                    coordinators”
                  </i> */}
                 
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        height="140"
        // image="/static/images/cards/contemplative-reptile.jpg"
        // alt="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {acc[0].name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {/* {acc[0].usn}<br/>
         {acc[0].email}<br/>
         {acc[0].dob}<br/> 
         {acc[0].college}<br/>
         {acc[0].gender}<br/>
         {acc[0].branch}<br/>
         {acc[0].section}<br/>
         {acc[0].year}<br/> */}

         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>details</TableCell>
            <TableCell align="right">details</TableCell>
          </TableRow>
        </TableHead>


  <TableBody>  
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                usn
              </TableCell>
              <TableCell align="right">{acc[0].usn}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                email
              </TableCell>
              <TableCell align="right">{acc[0].email}</TableCell>     
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                branch
              </TableCell>
              <TableCell align="right">{acc[0].branch}</TableCell>     
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                section
              </TableCell>
              <TableCell align="right">{acc[0].section}</TableCell>     
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                year
              </TableCell>
              <TableCell align="right">{acc[0].year}</TableCell>     
            </TableRow>
            
         
 </TableBody>
      </Table>
    </TableContainer>
        </Typography>
      </CardContent>
      <CardActions>
       
        <Grid container justifyContent="center">
        <Button
                variant="contained"
                align="center"
                style={{
                  backgroundColor: "#541554",
                  color: "white",
                  borderRadius: "15px",
                }}
                onClick={toggleModel}
              >
                Update Details
              </Button>
              </Grid>
      </CardActions>
    </Card>
                </Typography>
                </Container>
                </Box>
{/* <Grid container justifyContent="center">
                <Button
                variant="contained"
                align="center"
                style={{
                  backgroundColor: "#541554",
                  color: "white",
                  borderRadius: "15px",
                }}
                onClick={toggleModel}
              >
                Update Details
              </Button>
              
              </Grid> */}
              
              {model && acc.length > 0 ? (
            <DialogUI
              
              data={acc[0]}
              //data={item}
              toggleModel={toggleModel}
            />
          ) : null}
        
          </main>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            paddingLeft: m1 ? "25%" : "10%",
          }}
        >
          <div style={{ width: "100%" }}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", backgroundColor: "white" }}
              width={m1 ? "50%" : "80%"}
              height={100}
            />

            <Skeleton
              variant="rectangular"
              width={m1 ? "50%" : "80%"}
              style={{ backgroundColor: "white" }}
              height={200}
            />
            <br />
            <Skeleton
              variant="rounded"
              width={m1 ? "50%" : "80%"}
              style={{ backgroundColor: "white" }}
              height={300}
            />
          </div>
        </div>
      )}
    </div>
  );

}
