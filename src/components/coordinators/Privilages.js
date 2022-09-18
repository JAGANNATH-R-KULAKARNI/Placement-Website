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

const theme = createTheme();

export default function Privileges() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const powers = [
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
      goto: "/admin/companies",
    },
    {
      text: "Make an Announcement",
      subtext: "Send an email to the students or the particular students",
      image:
        "https://images.unsplash.com/photo-1629560987034-341204a8af87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      goto: "/admin/companies",
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
      text: "Download details",
      subtext: "Download the details of applicatents for a particular company",
      image:
        "https://images.unsplash.com/photo-1624069130725-ae1ec9c6e719?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      goto: "/admin/companies",
    },
    {
      text: "Stats",
      subtext: "See the placement stats of our college",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z3JhcGh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      goto: "/admin/companies",
    },
    {
      text: "Student Queries",
      subtext: "Respond to the queries raised by students",
      image:
        "https://images.unsplash.com/photo-1542107617-e760dc92dcdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cXVlcmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      goto: "/admin/companies",
    },
  ];

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
                fontSize: m1 ? "60px" : "50px",
                fontWeight: 500,
              }}
            >
              Admins Only
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
              <i>
                “You don’t have to worry about being a number one, number two,
                or number three. Numbers don’t have anything to do with
                placement. Numbers only have something to do with repetition.”
              </i>
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                marginBottom: "-30px",
              }}
            >
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                <RefreshIcon sx={{ mr: 1 }} />
                Refresh
              </Fab>
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
