import React from "react";
import NavBarUI from "./NavBar";
import nie from "./images/nie.jpg";
import nie2 from "./images/nie2.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import StepperUI from "./utilities/Stepper";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Home() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      if (data.email == process.env.REACT_APP_ADMIN) navigate("/admin");
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 100);
  });

  return (
    <div style={{ color: "white", marginTop: m1 ? "100px" : "80px" }}>
      <StepperUI />
    </div>
  );
}
