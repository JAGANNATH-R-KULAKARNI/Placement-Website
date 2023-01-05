import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import logo from "./images/Logo.png";
import "./Hover.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { supabase } from "../Supabase";

const ResponsiveAppBar = (props) => {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  async function checkUser() {
    const user = await supabase.auth.user();
    if (!user) {
      navigate("/signin");
    }
  }

  async function logOut() {
    await supabase.auth.signOut();
    checkUser();
    navigate("/signin");
    window.location.reload();
  }

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
                width: m1 ? "50px" : "30px",
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
              fontSize: m1 ? "25px" : "18px",
              marginLeft: m1 ? "30px" : "19px",
            }}
            className="hoverr2"
          >
            {m1 ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "black",
                  fontWeight: 700,
                  borderRadius: "12px",
                  marginLeft: "50px",
                }}
                startIcon={
                  <IconButton onClick={null} sx={{ p: 0, color: "white" }}>
                    <ArrowBackIcon />
                  </IconButton>
                }
                onClick={() => {
                  props.handleClose();
                }}
              >
                Close
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  fontSize: "10px",
                  marginLeft: "20px",
                  backgroundColor: "black",
                }}
                onClick={() => {
                  props.handleClose();
                }}
              >
                Close
              </Button>
            )}
          </h3>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              marginLeft: "25px",
            }}
          ></Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: "30px",
            }}
          ></Box>
          {m1 ? (
            <Badge
              badgeContent={3}
              color="success"
              style={{ marginTop: "4px" }}
            >
              <NotificationsIcon style={{ fontSize: "40px" }} />
            </Badge>
          ) : null}
          {m1 ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "black",
                fontWeight: 700,
                borderRadius: "12px",
                marginLeft: "50px",
              }}
              startIcon={
                <IconButton onClick={null} sx={{ p: 0 }}>
                  <Avatar
                    alt={props.data && props.data.user_metadata.full_name}
                    src={props.data && props.data.user_metadata.avatar_url}
                    style={{ backgroundColor: "#2E7D32" }}
                  />
                </IconButton>
              }
              onClick={logOut}
            >
              Log Out
            </Button>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
