import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

import logo from "./images/Logo.png";
import "./Hover.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const ResponsiveAppBar = () => {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#541554",
        color: "white",
        fontFamily: "inherit",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div
            onClick={() => {
              navigate("/admin");
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: m1 ? "50px" : "40px",
                height: "auto",
                backgroundColor: "white",
                padding: "5px",
                borderTopLeftRadius: "40px",
                borderTopRightRadius: "40px",
                borderBottomLeftRadius: "70px",
                borderBottomRightRadius: "70px",
              }}
              className="hoverr2"
            />
          </div>

          <h3
            style={{
              color: "white",
              fontSize: m1 ? "25px" : "20px",
              marginLeft: m1 ? "30px" : "33px",
            }}
            className="hoverr2"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Training & Placement Cell
          </h3>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              marginLeft: "15px",
            }}
          ></Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: "30px",
            }}
          ></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
