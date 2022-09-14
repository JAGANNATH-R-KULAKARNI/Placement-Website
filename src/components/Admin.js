import React from "react";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PrivilagesUI from "./coordinators/Privilages";
import SkeletonUI from "./utilities/Skeleton";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
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

  return <div>{data ? <PrivilagesUI /> : null}</div>;
}
