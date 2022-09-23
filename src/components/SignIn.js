import React from "react";
import Button from "@mui/material/Button";
import google from "../components/images/google.webp";
import signinlogo from "../components/images/signinlogo.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import Paper from "@mui/material/Paper";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function SignIn() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  const [data, setData] = React.useState(null);

  async function signInWithGoogle() {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) throw error;

      if (user) {
        console.log("user details");
        console.log(user);
      }
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  }

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(false);
      if (data.email === process.env.REACT_APP_ADMIN) {
        Cookies.set("refresh_twice", true);
        navigate("/admin");
      } else {
        Cookies.set("refresh_twice2", true);
        navigate("/home");
      }
    } else setData(true);
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          {data ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Paper
                elevation={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "80%",
                  borderRadius: "20px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <div style={{ width: "100%" }}>
                    <img
                      src={signinlogo}
                      alt="logo"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <h2
                    style={{
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Sign In for placements
                  </h2>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "-20px",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#017E7E",
                        width: "80%",
                      }}
                      onClick={signInWithGoogle}
                    >
                      Sign In with Google
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "-10px",
                    }}
                  >
                    <h5 style={{ textAlign: "center", width: "80%" }}>
                      By Sign In, I agree to the policies of placement &
                      training cell
                    </h5>
                  </div>
                  <div style={{ height: "10px" }}></div>
                </div>
              </Paper>
            </div>
          ) : (
            <Box sx={{ width: 300, marginTop: "50px" }}>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "white", height: "100px" }}
              />
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "white", height: "100px" }}
              />
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "white", height: "100px" }}
              />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
