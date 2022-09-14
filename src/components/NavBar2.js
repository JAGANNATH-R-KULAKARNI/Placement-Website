import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "./images/Logo.png";
import "./Hover.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const pages = ["NIE", "Placements", "Contact Us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const m1 = useMediaQuery("(min-width:600px)");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
          <h3
            style={{
              color: "white",
              fontSize: m1 ? "25px" : "20px",
              marginLeft: m1 ? "30px" : "33px",
            }}
            className="hoverr2"
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
          >
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "inherit",
                  fontWeight: 700,
                }}
                className="hoverr"
              >
                {page}
              </Button>
            ))} */}
          </Box>
          {/* {m1 ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "black",
                fontWeight: 700,
                borderRadius: "20px",
              }}
              startIcon={
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt=""
                    src=""
                    style={{ backgroundColor: "#2DB079" }}
                  />
                </IconButton>
              }
            >
              Log Out
            </Button>
          ) : null} */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
