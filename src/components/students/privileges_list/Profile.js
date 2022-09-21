import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../Supabase";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function AnnounceACompany() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = React.useState(null);

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
      if (data.email === process.env.REACT_APP_ADMIN) navigate("/admin");
    }
  }

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  return (
    <div>
      {data ? (
        <div>
          <CssBaseline />
          <div style={{ height: m1 ? "70px" : "40px" }}></div>
          <main>
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
                borderBottomRightRadius: "50px",
                borderBottomLeftRadius: "50px",
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  style={{
                    fontFamily: "inherit",
                    fontSize: m1 ? "60px" : "50px",
                    fontWeight: 500,
                  }}
                >
                  Profile
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                  style={{
                    fontSize: m1 ? "17px" : "16px",
                    marginBottom: "-17px",
                  }}
                >
                  <i>
                    “Keep your resume updated before applying for any company.
                    If any of the details is incorrect, please contact placement
                    coordinators”
                  </i>
                </Typography>
              </Container>
            </Box>
          </main>
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
