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
import "./tick.css";
import { supabase } from "../../Supabase";
import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";
import pdfi from "../images/pdf.png";

const theme = createTheme();

export default function Privileges(props) {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [student, setStudent] = React.useState([]);

  const powers = [
    {
      text: "Companies",
      subtext: "Apply for the eligible companies",
      image:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",

      goto: "/companies",
      junior: true,
    },
    {
      text: "Interview experiences",
      subtext: "Read about the past interview experiences",
      image:
        "https://images.unsplash.com/photo-1579444741963-5ae219cfe27c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9ybXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      goto: "/interviews",
      junior: true,
    },
    {
      text: "Stats",
      subtext: "See the placement stats of our college",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z3JhcGh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      goto: "/admin/companies",
      junior: true,
    },
  ];

  async function fetchStudentDetails() {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("email", props.data.email);

    if (data) {
      setStudent(data);
    }

    if (error) {
      console.log(error.message);
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchStudentDetails();
    }, 1000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
                fontSize: m1 ? "60px" : "30px",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <b> Verified </b>
              <div style={{ width: "10px" }}></div>
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
                style={{ marginTop: m1 ? "20px" : "1px" }}
              >
                <circle
                  className="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              style={{
                fontSize: m1 ? "17px" : "16px",
              }}
            >
              <i>
                “Hello{" "}
                <b>
                  {props.data && props.data.user_metadata.full_name}
                  {student.length === 1 ? " (" + student[0].usn + ")" : ""}
                </b>
                , you have successfully logged in with{" "}
                <b>{props.data && props.data.email}</b>.{" "}
                {student.length > 0
                  ? "Keep your resume updated before applying to eligible companies."
                  : "Register for NIE placements before applying for companies"}
                ”
              </i>
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "-30px",
              }}
            >
              {student.length === 1 ? (
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "-10px",
                  }}
                >
                  <div>
                    <a
                      href={student && student[0].documents[0]}
                      style={{ justifyContent: "center", display: "flex" }}
                    >
                      <img
                        src={pdfi}
                        alt="filei"
                        style={{ width: "80%", height: "auto" }}
                      />
                    </a>
                    <a
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        marginTop: m1 ? "-20px" : "-10px",
                        color: "black",
                      }}
                      href={student && student[0].documents[0]}
                    >
                      Download
                    </a>
                  </div>
                </div>
              ) : null}
              <div style={{ width: "50%" }}>
                {student.length === 1 ? (
                  <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    style={{
                      backgroundColor: "black",
                      width: "100%",
                      marginBottom: "15px",
                      marginTop: m1 ? "50px" : "17px",
                    }}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    {student[0].gender == 2 ? (
                      <FaceIcon sx={{ mr: 1 }} />
                    ) : (
                      <Face2Icon sx={{ mr: 1 }} />
                    )}
                    Profile
                  </Fab>
                ) : null}
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="add"
                  style={{ backgroundColor: "black", width: "100%" }}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <RefreshIcon sx={{ mr: 1 }} />
                  Refresh
                </Fab>
              </div>
            </div>
          </Container>
        </Box>

        <Container sx={{ py: 8, marginTop: "-30px" }} maxWidth="md">
          <Grid container spacing={4}>
            {powers.map((power) => (
              <Grid item key={power} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "50px",
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
                    style={{ backgroundColor: "#2E7D32" }}
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
        </Container>
      </main>
    </ThemeProvider>
  );
}
