import React from "react";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      if (data.email == process.env.REACT_APP_ADMIN) navigate("/admin");
      else navigate("/");
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 100);
  });

  return (
    <div>
      <div style={{ height: "200px" }}>Admin page</div>
    </div>
  );
}
