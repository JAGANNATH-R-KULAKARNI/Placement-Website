import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import emailogo from "../images/email.webp";
import upbg from "../images/upbg.png";
import email from "../images/email2.png";
import adminpagemain from "../images/adminpagemain.png";
import stu from "../images/stu.png";
import com from "../images/comp.png";
import emailsee from "../images/emailsee.jpeg";
import compimg from "../images/comi.jpg";
import stuimg from "../images/stui.jpg";
import SearchUI from "./Search";
import Company2UI from "./privileges_list/Company2";
import RegisterUI from "./privileges_list/utilities2/Register";
import RegisterUI2 from "./privileges_list/utilities/Register";
import EmailUI from "./privileges_list/Email";
import { supabase } from "../../Supabase";
import useSWR from "swr";
import Skeleton from "@mui/material/Skeleton";
import Company3UI from "./privileges_list/Company4";

const theme = createTheme();

export default function Privileges() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [registerModal, setRegisterModal] = React.useState(false);
  const [registerModal2, setRegisterModal2] = React.useState(false);
  const [companies, setCompanies] = React.useState([]);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [searchData, setSearchData] = React.useState([]);
  const [stuResults, setStuResults] = React.useState([]);
  const [comResults, setComResults] = React.useState([]);
  const [comResultsHash, setComResultsHash] = React.useState(null);
  const [comResultsTimes, setComResultsTimes] = React.useState(null);
  const [cda, setCda] = React.useState(null);
  const [sda, setSda] = React.useState(null);

  const studentsData = useSWR("/api/endpoint", fetchSearchData);
  // const companiesData = useSWR("/api/endpoint", fetchCompaniesData);

  const powers = [
    {
      text: "Send an Email",
      subtext: "Send an email to the students or the particular students",
      image: emailogo,
      goto: "/admin/announce",
    },
    {
      text: "Companies",
      subtext: "Let the students know about the company",
      image:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",

      goto: "/admin/companies",
    },
    {
      text: "Create a Form",
      subtext:
        "Create a form to get the applications from students for a particular company",
      image:
        "https://images.unsplash.com/photo-1579444741963-5ae219cfe27c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9ybXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      goto: "/admin/forms",
    },

    {
      text: "Students",
      subtext:
        "Register ,edit or view student data for the placement activities",
      image:
        "https://images.unsplash.com/photo-1517817748493-49ec54a32465?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      goto: "/admin/students",
    },
    {
      text: "Stats",
      subtext: "See the placement stats of our college",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z3JhcGh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      goto: "/admin/companies",
    },
  ];

  async function fetchSearchData(argc) {
    const { data, error } = await supabase.from("students").select("*");
    const companiesData = await supabase.from("companies").select("*");

    if (data && companiesData && companiesData.data) {
      setCda(companiesData.data);
      setSda(data);

      console.log("Students");
      console.log(data);
      let temp = [];
      let hash = {};

      for (let i = 0; i < data.length; i++) {
        if (!hash[data[i].email] && data[i].email.length > 0) {
          temp.push({
            name: data[i].email,
          });

          hash[data[i].email] = true;
        }

        if (!hash[data[i].name] && data[i].name.length > 0) {
          temp.push({
            name: data[i].name,
          });

          hash[data[i].name] = true;
        }

        if (
          !hash[data[i].parent_phone_num] &&
          data[i].parent_phone_num.length > 0
        ) {
          temp.push({
            name: data[i].parent_phone_num,
          });

          hash[data[i].parent_phone_num] = true;
        }

        if (!hash[data[i].phone_num] && data[i].phone_num.length > 0) {
          temp.push({
            name: data[i].phone_num,
          });

          hash[data[i].phone_num] = true;
        }

        if (!hash[data[i].usn] && data[i].usn.length > 0) {
          temp.push({
            name: data[i].usn,
          });

          hash[data[i].usn] = true;
        }
      }

      for (let i = 0; i < companiesData.data.length; i++) {
        if (
          !hash[companiesData.data[i].name] &&
          companiesData.data[i].name.length > 0 &&
          companiesData.data[i].id != 0
        ) {
          hash[companiesData.data[i].name] = true;

          temp.push({
            name: companiesData.data[i].name,
          });
        }
      }

      setSearchData(temp);
    }
  }

  async function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " year";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  async function searchResultsHandler(keyword) {
    if (!cda || !sda) return;

    console.log("Inside search results handler");
    console.log(keyword);
    let st = [];
    let co = [];

    for (let i = 0; i < sda.length; i++) {
      if (
        (sda[i] &&
          sda[i].name &&
          sda[i].name.toLowerCase().includes(keyword.toLowerCase())) ||
        (sda[i] &&
          sda[i].email &&
          sda[i].email.toLowerCase().includes(keyword.toLowerCase())) ||
        (sda[i] &&
          sda[i].usn &&
          sda[i].usn.toLowerCase().includes(keyword.toLowerCase())) ||
        (sda[i] &&
          sda[i].phone_num &&
          sda[i].phone_num.toLowerCase().includes(keyword.toLowerCase())) ||
        (sda[i] &&
          sda[i].parent_phone_num &&
          sda[i].parent_phone_num.toLowerCase().includes(keyword.toLowerCase()))
      ) {
        st.push(sda[i]);
      }
    }

    let comHash = {};
    let times = [];
    for (let i = 0; i < cda.length; i++) {
      if (
        cda[i] &&
        cda[i].name &&
        cda[i].name.toLowerCase().includes(keyword.toLowerCase())
      ) {
        co.push(cda[i]);
        comHash[cda[i].id] = cda[i];
        times.push(await timeSince(new Date(parseInt(cda[i].time_posted))));
      }
    }
    console.log(st);
    console.log(co);

    setComResults(co);
    setComResultsHash(comHash);
    setComResultsTimes(times);
  }

  async function fetchTheCompanies() {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .neq("id", 0)
      .order("time_posted", {
        ascending: false,
      });

    if (data) {
      setCompanies(data);
    }
  }

  React.useEffect(() => {
    fetchTheCompanies();
    fetchSearchData("jag");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* student */}
      {registerModal && companies ? (
        <RegisterUI
          registerModalHandler={() => setRegisterModal(!registerModal)}
          companies={companies}
        />
      ) : null}

      {registerModal2 ? (
        <RegisterUI2
          registerModalHandler={() => setRegisterModal2(!registerModal2)}
        />
      ) : null}
      {/* company */}
      {openEmail ? (
        <EmailUI
          emailModelHandler={() => {
            setOpenEmail(!openEmail);
          }}
        />
      ) : null}

      <main style={{ marginTop: m1 ? "-30px" : "-70px" }}>
        <div style={{ width: "100%" }}>
          <img
            src={upbg}
            style={{ width: "100%", height: "auto", marginTop: "-30px" }}
            alt=""
          />
          <h2
            style={{
              marginLeft: "7%",
              marginRight: "7%",
              textAlign: "left",
              marginTop: "-170px",
              color: "white",
              fontSize: "20px",
            }}
          >
            NIE has received more than 400+ offers this year !
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: m1 ? "60%" : "90%",
              marginLeft: m1 ? "20%" : "6%",
              marginTop: "25px",
            }}
          >
            {searchData && searchData.length > 0 ? (
              <SearchUI
                data={searchData}
                searchResultsHandler={searchResultsHandler}
              />
            ) : (
              <div>
                <Skeleton variant="rounded" width="320px" height={60} />
              </div>
            )}
          </div>
        </div>
        {comResults &&
        comResults.length > 0 &&
        comResultsHash &&
        comResultsTimes &&
        comResultsTimes.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Company3UI
              fCompanies={comResults}
              times={comResultsTimes}
              companiesHash={comResultsHash}
            />
          </div>
        ) : null}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Company2UI />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Paper style={{ width: "90%", borderRadius: "10px" }} elevation={0}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={emailsee}
                style={{
                  width: "100%",
                  height: "auto",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                alt="Email"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h2
                style={{
                  color: "#017E7E",
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Send an Email
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h4
                style={{
                  color: "#747684",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "0px",
                  marginBottom: "10px",
                }}
              >
                Send an email to a student or to a particular branch or to the
                whole college
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#017E7E",
                  borderRadius: "20px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
                size="large"
                onClick={() => {
                  setOpenEmail(true);
                }}
              >
                Send Email
              </Button>
            </div>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <Paper style={{ width: "90%", borderRadius: "10px" }} elevation={0}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={compimg}
                style={{
                  width: "100%",
                  height: "auto",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                alt="ComImg"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h2
                style={{
                  color: "#017E7E",
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Register a Company
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h4
                style={{
                  color: "#747684",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "0px",
                  marginBottom: "10px",
                }}
              >
                Register a company by filling the details of the company
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#017E7E",
                  borderRadius: "20px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
                size="large"
                onClick={() => {
                  setRegisterModal2(true);
                }}
              >
                Register Now
              </Button>
            </div>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <Paper style={{ width: "90%", borderRadius: "10px" }} elevation={0}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={stuimg}
                style={{
                  width: "100%",
                  height: "auto",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                alt="Stuimg"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h2
                style={{
                  color: "#017E7E",
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Register a student
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h4
                style={{
                  color: "#747684",
                  fontWeight: 700,
                  textAlign: "center",
                  marginTop: "0px",
                  marginBottom: "10px",
                }}
              >
                Register a student for campus placements by filling the details
                of the student
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#017E7E",
                  borderRadius: "20px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
                size="large"
                onClick={() => {
                  setRegisterModal(true);
                }}
              >
                Register Now
              </Button>
            </div>
          </Paper>
        </div>

        <div style={{ height: "10px" }}></div>
        {/* <Container sx={{ py: 8, marginTop: "-30px" }} maxWidth="md">
          <Grid container spacing={4}>
            {powers.map((power) => (
              <Grid item key={power.text} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    minHeight: m1 ? "300px" : "150px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: "100px",
                      width: "100%",
                    }}
                    image={
                      power.image
                        ? power.image
                        : "https://source.unsplash.com/random"
                    }
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ fontFamily: "inherit", textAlign: "center" }}
                    >
                      {power.text}
                    </Typography>
                    <Typography
                      style={{ fontFamily: "inherit", textAlign: "center" }}
                    >
                      <i>“{power.subtext}”</i>
                    </Typography>
                  </CardContent>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: "black" }}
                    onClick={() => {
                      navigate(power.goto);
                    }}
                  >
                    Open
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> */}
      </main>
    </ThemeProvider>
  );
}
