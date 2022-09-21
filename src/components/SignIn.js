import React from "react";
import Button from "@mui/material/Button";
import google from "../components/images/google.webp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";

export default function SignIn() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

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
        navigate("/");
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
        }}
      >
        <div
          style={{
            marginTop: m1 ? "300px" : "300px",
            marginBottom: m1 ? "360px" : "420px",
            justifyContent: "center",
            display: "block",
          }}
        >
          {data ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                fontWeight: 700,
                fontFamily: "inherit",
                fontSize: m1 ? "30px" : "17px",
              }}
              startIcon={
                <div
                  style={{ marginTop: m1 ? "10px" : "5px", marginRight: "5px" }}
                >
                  <img
                    alt="G"
                    src={google}
                    style={{
                      width: m1 ? "40px" : "20px",
                      height: m1 ? "40px" : "20px",
                    }}
                  />
                </div>
              }
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </Button>
          ) : (
            <Box sx={{ width: 300 }}>
              <Skeleton animation="wave" sx={{ bgcolor: "white" }} />
              <Skeleton animation="wave" sx={{ bgcolor: "white" }} />
              <Skeleton animation="wave" sx={{ bgcolor: "white" }} />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
