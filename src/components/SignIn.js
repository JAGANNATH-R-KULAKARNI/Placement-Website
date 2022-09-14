import React from "react";
import suit from "../components/images/suit.jpg";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import google from "../components/images/google.webp";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SignIn() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

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
      navigate("/");
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 100);
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
            marginTop: m1 ? "300px" : "270px",
            marginBottom: m1 ? "360px" : "320px",
            justifyContent: "center",
            display: "block",
          }}
        >
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
        </div>
      </div>
    </div>
  );
}
