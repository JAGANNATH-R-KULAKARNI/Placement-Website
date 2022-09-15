import React from "react";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PrivilagesUI from "./coordinators/Privilages";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const m1 = useMediaQuery("(min-width:600px)");

  const [data, setData] = React.useState(null);

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      if (data.email == process.env.REACT_APP_ADMIN) navigate("/admin");
      else navigate("/");
      setData(data);
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  }, []);

  return (
    <div>
      {data ? (
        <PrivilagesUI />
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
              sx={{
                fontSize: "1rem",
                backgroundColor: "white",
                marginTop: "80px",
              }}
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
