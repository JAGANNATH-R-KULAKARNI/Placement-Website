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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import CardMedia from "@mui/material/CardMedia";
import upbg from "../../images/upbg.png";

export default function AnnounceACompany() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = React.useState(null);
  const [acc, setAcc] = React.useState([]);
  const [accF, setAccF] = React.useState([]);
  const [model, setModel] = React.useState(false);

  const toggleModel = () => {
    setModel(!model);
  };

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
      if (data.email == process.env.REACT_APP_ADMIN) navigate("/admin");
    }
  }

  async function fetchTheStudentsF() {
    const data = await supabase.auth.user();
    const stuData = await supabase
      .from("students")
      .select("*,companies(*)")
      .eq("email", data.email);

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
    } else {
      console.log("wrong");
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
    if (acc.length == 0) {
      fetchTheStudentsF();
    }
  });

  return (
    <div>
      {data ? (
        <div>
          <CssBaseline />
          {/* <div style={{ height: m1 ? "70px" : "40px" }}></div> */}
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
              <img
                src={upbg}
                style={{ width: "100%", height: "auto", marginTop: "-80px" }}
                alt=""
              />
              <h2
                style={{
                  marginLeft: "7%",
                  marginRight: "7%",
                  textAlign: "left",
                  marginTop: "-150px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Unlocking potential and paving the path to success !
              </h2>
              <Container maxWidth="sm">
                <div
                  className="vh-100"
                  align="center"
                  color="text.secondary"
                  //paragraph
                  style={{
                    fontSize: m1 ? "17px" : "16px",
                    marginBottom: "-17px",
                  }}
                >
                  <MDBContainer className="container py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                      <MDBCol md="12" xl="4">
                        <MDBCard style={{ borderRadius: "15px" }}>
                          <MDBCardBody className="text-center">
                            <div className="mt-3 mb-4">
                              {acc[0].gender == 2 ? (
                                <MDBCardImage
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                  className="rounded-circle"
                                  fluid
                                  style={{ width: "100px" }}
                                />
                              ) : (
                                <MDBCardImage
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                  className="rounded-circle"
                                  fluid
                                  style={{ width: "100px" }}
                                />
                              )}
                            </div>
                            <MDBTypography tag="h4">
                              {acc[0].name}
                            </MDBTypography>
                            <MDBCardText className="text-muted mb-4">
                              {acc[0].email} <span className="mx-2">|</span>{" "}
                              {acc[0].usn}
                            </MDBCardText>

                            <Button
                              variant="contained"
                              align="center"
                              style={{
                                color: "white",
                                borderRadius: "15px",
                                textTransform: "capitalize",
                                fontSize: "18px",
                                backgroundColor: "#007F7F",
                              }}
                              onClick={toggleModel}
                            >
                              Update Details
                            </Button>
                            <div className="d-flex justify-content-between text-center mt-2 mb-2">
                              <div>
                                <MDBCardText className="mb-1 h5" tag="h4">
                                  {acc[0].year}th
                                </MDBCardText>
                                <MDBCardText className="small text-muted mb-0">
                                  Year
                                </MDBCardText>
                              </div>
                              <div>
                                <MDBCardText className="mb-1 h5" tag="h4">
                                  {acc[0].branch}
                                </MDBCardText>
                                <MDBCardText className="small text-muted mb-0">
                                  Branch
                                </MDBCardText>
                              </div>
                              <div>
                                <MDBCardText className="mb-1 h5" tag="h4">
                                  {acc[0].section}
                                </MDBCardText>
                                <MDBCardText className="small text-muted mb-5">
                                  Section
                                </MDBCardText>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </div>
              </Container>
            </Box>
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
