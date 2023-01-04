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
import SearchUI from "./Search";
import Company2UI from "./privileges_list/Company2";
const theme = createTheme();

export default function Privileges() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        <div style={{ height: "100px" }}></div>
        <Container sx={{ py: 8, marginTop: "-30px" }} maxWidth="md">
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
        </Container>
      </main>
    </ThemeProvider>
  );
}
