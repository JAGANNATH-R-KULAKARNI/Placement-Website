import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../Supabase";

export default function AnnounceACompany() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = React.useState(null);

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
      if (data.email !== process.env.REACT_APP_ADMIN) navigate("/");
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  return (
    <div>
      <div style={{ height: "200px" }}></div>
      <h1 style={{ textAlign: "center" }}>Announce A Company</h1>
    </div>
  );
}
