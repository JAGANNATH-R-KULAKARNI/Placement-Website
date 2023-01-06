import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import emailogo from "../images/email.webp";
import upbg from "../images/upbg.png";
import email from "../images/email2.png";
import adminpagemain from "../images/adminpagemain.png";
import stu from "../images/stu.png";
import com from "../images/comp.png";
import emailsee from "../images/emailsee.jpeg";
import compimg from "../images/signinlogo.png";
import stuimg from "../images/stuimg.png";
import SearchUI from "./Search";
import Company2UI from "./privileges_list/Company2";
import RegisterUI from "./privileges_list/utilities2/Register";
import RegisterUI2 from "./privileges_list/utilities/Register";
import EmailUI from "./privileges_list/Email";
import { supabase } from "../../Supabase";

const theme = createTheme();

export default function Privileges() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [registerModal, setRegisterModal] = React.useState(false);
  const [registerModal2, setRegisterModal2] = React.useState(false);
  const [companies, setCompanies] = React.useState([]);
  const [openEmail, setOpenEmail] = React.useState(false);

  const powers = [
    {
      text: "Send an Email",
      subtext: "Send an email to the students or the particular students",
      image: emailogo,
      goto: "/admin/announce",
    },
    {
      text: "Companies",
      subtext: "Let the students know about the company",
      image:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",

      goto: "/admin/companies",
    },
    {
      text: "Create a Form",
      subtext:
        "Create a form to get the applications from students for a particular company",
      image:
        "https://images.unsplash.com/photo-1579444741963-5ae219cfe27c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9ybXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      goto: "/admin/forms",
    },

    {
      text: "Students",
      subtext:
        "Register ,edit or view student data for the placement activities",
      image:
        "https://images.unsplash.com/photo-1517817748493-49ec54a32465?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      goto: "/admin/students",
    },
    {
      text: "Stats",
      subtext: "See the placement stats of our college",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z3JhcGh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      goto: "/admin/companies",
    },
  ];

  async function fetchTheCompanies() {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("time_posted", {
        ascending: false,
      });

    if (data) {
      setCompanies(data);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {registerModal && companies ? (
        <RegisterUI
          registerModalHandler={() => setRegisterModal(!registerModal)}
          companies={companies}
        />
      ) : null}
      {registerModal2 ? (
        <RegisterUI2
          registerModalHandler={() => setRegisterModal2(!registerModal2)}
        />
      ) : null}
      {openEmail ? (
        <EmailUI
          emailModelHandler={() => {
            setOpenEmail(!openEmail);
          }}
        />
      ) : null}
      <main style={{ marginTop: m1 ? "-30px" : "-70px" }}>
        <div style={{ width: "100%" }}>
          <img
            src={upbg}
            style={{ width: "100%", height: "auto", marginTop: "-30px" }}
            alt=""
          />
          <h2
            style={{
              marginLeft: "7%",
              marginRight: "7%",
              textAlign: "left",
              marginTop: "-170px",
              color: "white",
              fontSize: "20px",
            }}
          >
            NIE has received more than 400+ offers this year !
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: m1 ? "60%" : "90%",
              marginLeft: m1 ? "20%" : "6%",
              marginTop: "25px",
            }}
          >
            <SearchUI />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Company2UI />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Paper style={{ width: "90%", borderRadius: "10px" }} elevation={0}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={emailsee}
                style={{
                  width: "100%",
                  height: "auto",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                alt="Email"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h2
                style={{
                  color: "#017E7E",
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Send an Email
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h4
                style={{
                  color: "#747684",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "0px",
                  marginBottom: "10px",
                }}
              >
                Send an email to a student or to a particular branch or to the
                whole college
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#017E7E",
                  borderRadius: "20px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
                size="large"
                onClick={() => {
                  setOpenEmail(true);
                }}
              >
                Send Email
              </Button>
            </div>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <Paper style={{ width: "90%", borderRadius: "10px" }} elevation={0}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={compimg}
                style={{
                  width: "90%",
                  height: "auto",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                alt="ComImg"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h2
                style={{
                  color: "#017E7E",
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Register a Company
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h4
                style={{
                  color: "#747684",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "0px",
                  marginBottom: "10px",
                }}
              >
                Register a company by filling the details of the company
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#017E7E",
                  borderRadius: "20px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
                size="large"
                onClick={() => {
                  setRegisterModal2(true);
                }}
              >
                Register Now
              </Button>
            </div>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <Paper style={{ width: "90%", borderRadius: "10px" }} elevation={0}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={stuimg}
                style={{
                  width: "80%",
                  height: "auto",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                alt="Stuimg"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h2
                style={{
                  color: "#017E7E",
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Register a student
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h4
                style={{
                  color: "#747684",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "0px",
                  marginBottom: "10px",
                }}
              >
                Register a student for campus placements by filling the details
                of the student
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#017E7E",
                  borderRadius: "20px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
                size="large"
                onClick={() => {
                  setRegisterModal(true);
                }}
              >
                Register Now
              </Button>
            </div>
          </Paper>
        </div>

        <div style={{ height: "10px" }}></div>
        {/* <Container sx={{ py: 8, marginTop: "-30px" }} maxWidth="md">
          <Grid container spacing={4}>
            {powers.map((power) => (
              <Grid item key={power.text} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    minHeight: m1 ? "300px" : "150px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: "100px",
                      width: "100%",
                    }}
                    image={
                      power.image
                        ? power.image
                        : "https://source.unsplash.com/random"
                    }
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ fontFamily: "inherit", textAlign: "center" }}
                    >
                      {power.text}
                    </Typography>
                    <Typography
                      style={{ fontFamily: "inherit", textAlign: "center" }}
                    >
                      <i>“{power.subtext}”</i>
                    </Typography>
                  </CardContent>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: "black" }}
                    onClick={() => {
                      navigate(power.goto);
                    }}
                  >
                    Open
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> */}
      </main>
    </ThemeProvider>
  );
}
