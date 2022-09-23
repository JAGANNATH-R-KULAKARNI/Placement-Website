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
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import StudentUI from "./utilities2/Student";
import Fab from "@mui/material/Fab";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import RegisterUI from "./utilities2/Register";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SearchUI from "./utilities2/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function AnnounceACompany() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = React.useState(null);
  const [registerModal, setRegisterModal] = React.useState(false);

  const [companies, setCompanies] = React.useState([]);
  const [fCompanies, setFCompanies] = React.useState([]);
  const [sCResult, setSCResult] = React.useState(null);
  const [control, setControl] = React.useState(false);
  const [students, setStudents] = React.useState([]);
  const [fStudents, setFStudents] = React.useState([]);

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
      if (data.email !== process.env.REACT_APP_ADMIN) navigate("/");
    }
  }

  async function filterStudents1(str) {
    const temp = [];

    for (let i = 0; i < students.length; i++) {
      if (str) {
        if (str === students[i].name) temp.push(students[i]);
      } else {
        temp.push(students[i]);
      }
    }

    setFStudents(temp);
  }

  async function filterStudents3(compis) {
    const temp = [];
    console.log("here");
    console.log(sCResult);
    for (let i = 0; i < compis.length; i++) {
      if (sCResult) {
        if (sCResult === compis[i].name) temp.push(compis[i]);
      } else {
        temp.push(compis[i]);
      }
    }

    setFStudents(temp);
  }

  async function searchStudentResults(str) {
    console.log("Seach student result");
    console.log(str);
    await setSCResult(str);
    filterStudents1(str);
  }

  async function fetchTheCompanies() {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("time_posted", {
        ascending: false,
      });

    if (data) {
      setCompanies(data);
    }
  }

  async function fetchTheStudents() {
    const { data, error } = await supabase
      .from("students")
      .select("*,companies(*)");

    if (data) {
      console.log("Students Data");
      console.log(data);
      setStudents(data);
      filterStudents3(data);
    }
  }

  React.useEffect(() => {
    if (companies.length === 0) {
      fetchTheCompanies();
      fetchTheStudents();
    }
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  return (
    <div>
      {data ? (
        <div>
          {registerModal && companies ? (
            <RegisterUI
              registerModalHandler={() => setRegisterModal(!registerModal)}
              companies={companies}
            />
          ) : null}
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
                    fontSize: m1 ? "60px" : "53px",
                    fontWeight: 700,
                  }}
                >
                  Students
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "-20px",
                  }}
                >
                  {students.length > 0 ? (
                    <Fab
                      variant="extended"
                      style={{
                        backgroundColor: "#541554",
                        color: "white",
                        paddingRight: "20px",
                      }}
                      onClick={() => {
                        setRegisterModal(!registerModal);
                      }}
                    >
                      <VpnKeyIcon sx={{ mr: 1 }} />
                      Register Student
                    </Fab>
                  ) : null}
                </div>
              </Container>
            </Box>
          </main>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Paper
              style={{
                width: "95%",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    textAlign: "center",
                    fontFamily: "inherit",
                    fontWeight: 500,
                  }}
                >
                  Students List
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                  }}
                >
                  <div style={{ minWidth: "60%", minWidth: "80%" }}>
                    {companies && (
                      <SearchUI
                        students={students}
                        companies={companies}
                        searchStudentResults={searchStudentResults}
                      />
                    )}
                  </div>
                  <div style={{ width: "30%", marginLeft: "10%" }}>
                    <Fab
                      color="primary"
                      aria-label="add"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "black",
                      }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      <RefreshIcon />
                    </Fab>
                  </div>
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: "95%" }}>
                    {fStudents &&
                      fStudents.map((item) => {
                        return (
                          <div key={item}>
                            <StudentUI 
                            companies={companies}
                            data={item} />{" "}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <br />
              </div>
            </Paper>
          </div>
          <br />
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
