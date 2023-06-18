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

const ResponsiveAppBar = (props) => {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#017E7E",
        color: "white",
        fontFamily: "inherit",
        paddingTop: m1 ? "10px" : "3px",
        paddingBottom: m1 ? "10px" : "0px",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div
            onClick={() => {
              navigate("/home");
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: m1 ? "50px" : "35px",
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
              marginLeft: m1 ? "30px" : "19px",
            }}
            className="hoverr2"
            onClick={() => {
              navigate("/home");
            }}
          >
            {m1 ? "Training & Placements Cell" : <span>Placements</span>}
          </h3>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              marginLeft: "40px",
            }}
          >
            <Button
              variant="contained"
              style={{
                fontSize: "12px",
                marginLeft: "20px",
                backgroundColor: "#017E7E",
                border: "2px solid white",
                textTransform: "capitalize",
                fontWeight: 700,
                borderRadius: "20px",
                marginTop: "-5px",
              }}
              startIcon={
                <IconButton onClick={null} sx={{ p: 0 }}>
                  <Avatar
                    alt={props.data && props.data.user_metadata.full_name}
                    src={props.data && props.data.user_metadata.avatar_url}
                    style={{
                      backgroundColor: "black",
                      height: "25px",
                      width: "25px",
                    }}
                  />
                </IconButton>
              }
              onClick={props.logOut}
            >
              Log Out
            </Button>
          </Box>

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
              onClick={props.logOut}
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
