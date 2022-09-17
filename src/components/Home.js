import React from "react";
import NavBarUI from "./NavBar";
import nie from "./images/nie.jpg";
import nie2 from "./images/nie2.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import StepperUI from "./utilities/Stepper";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export default function Home() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = React.useState(null);

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      if (data.email === process.env.REACT_APP_ADMIN) navigate("/admin");

      setData(data);
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  return (
    <div style={{ color: "white", marginTop: m1 ? "100px" : "80px" }}>
      {data ? (
        <div>
          {" "}
          <StepperUI />{" "}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            paddingLeft: m1 ? "25%" : "10%",
          }}
        >
          <div style={{ width: "100%" }}>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", backgroundColor: "white" }}
              width={m1 ? "50%" : "80%"}
              height={100}
            />

            <Skeleton
              variant="rectangular"
              width={m1 ? "50%" : "80%"}
              style={{ backgroundColor: "white" }}
              height={200}
            />
            <br />
            <Skeleton
              variant="rounded"
              width={m1 ? "50%" : "80%"}
              style={{ backgroundColor: "white" }}
              height={300}
            />
          </div>
        </div>
      )}
    </div>
  );
}
