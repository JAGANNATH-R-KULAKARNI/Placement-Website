import React from "react";
import NavBarUI from "./NavBar";
import nie from "./images/nie.jpg";
import nie2 from "./images/nie2.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import StepperUI from "./utilities/Stepper";

export default function Home() {
  const m1 = useMediaQuery("(min-width:600px)");

  return (
    <div style={{ color: "white", marginTop: m1 ? "100px" : "80px" }}>
      <StepperUI />
    </div>
  );
}
