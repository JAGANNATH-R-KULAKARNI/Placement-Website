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
import formimage from "../../images/form.png";
import SearchUI from "./utilities4/Search";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateUI from "./utilities4/Date";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import BackdropUI from "./utilities3/Backdrop";
import DialogUI from "./utilities4/Dialog";
import Fab from "@mui/material/Fab";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Form2UI from "./utilities4/Create";
import SearcUI2 from "./utilities4/Search2";
import RefreshIcon from "@mui/icons-material/Refresh";
import FormUI from "./utilities4/Form";

export default function AnnounceACompany() {
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = React.useState(null);
  const [companies, setCompanies] = React.useState([]);
  const [company, setCompany] = React.useState(null);
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const [sstart, setSStart] = React.useState("");
  const [send, setSEnd] = React.useState("");
  const [control, setControl] = React.useState(false);
  const [students, setStudents] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [link, setLink] = React.useState("");
  const [form2, setForm2] = React.useState(false);
  const [forms, setForms] = React.useState(null);
  const [forms2, setForms2] = React.useState(null);

  const [activeForms, setActiveForms] = React.useState(null);
  const [inactiveForms, setInActiveForms] = React.useState(null);

  async function fetchForms() {
    if (!companies) return;

    const { data, error } = await supabase.from("forms").select("*");

    if (data) {
      const ac = [];
      const inac = [];
      const al = [];
      let hash = {};

      for (let j = 0; j < companies.length; j++) {
        hash[companies[j].id] = companies[j];
      }
      console.log("Hash");
      console.log(hash);

      if (Object.keys(hash).length == 0) return;
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].start_time <= Date.now() &&
          Date.now() <= data[i].end_time
        ) {
          ac.push({ data: data[i], company: hash[data[i].company_id] });
        } else {
          inac.push({ data: data[i], company: hash[data[i].company_id] });
        }

        al.push({ data: data[i], company: hash[data[i].company_id] });
      }

      setActiveForms(ac);
      setInActiveForms(inac);
      setForms(al);
      setForms2(al);
      console.log("Forms");
      console.log(al);
      // console.log(ac);
      // console.log(inac);
    }
  }

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
      if (data.email !== process.env.REACT_APP_ADMIN) navigate("/");
    }
  }

  async function fetchTheCompanies() {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("time_posted", {
        ascending: false,
      });

    if (data) {
      const temp = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]["id"] !== 0) temp.push(data[i]);
      }
      console.log(temp);
      setCompanies(temp);
    }
  }

  async function fetchTheStudents() {
    const { data, error } = await supabase.from("students").select("*");

    if (data) {
      setStudents(data);
    }
  }

  React.useEffect(() => {
    if (companies.length === 0 || !forms) {
      fetchTheCompanies();
      fetchTheStudents();
      fetchForms();
    }

    setInterval(() => {
      fetchTheProfile();
      // if (!forms) {
      //   fetchTheCompanies();
      //   fetchTheStudents();
      //   fetchForms();
      // }
    }, 1000);
  });

  async function searchFormResults(fname) {
    const temp = [];

    if (!fname) {
      setForms2(forms);
      return;
    }
    for (let i = 0; i < forms.length; i++) {
      if (fname == forms[i].company.name) {
        temp.push(forms[i]);
      }
    }

    setForms2(temp);
  }

  return (
    <div>
      {data && forms ? (
        <div>
          <CssBaseline />
          {form2 ? (
            <Form2UI
              registerModalHandler={() => {
                setForm2(!form2);
              }}
            />
          ) : null}
          {loading ? <BackdropUI /> : null}
          {dialog ? (
            <DialogUI
              company={company}
              link={link}
              handlerClose={() => {
                navigate(-1);
              }}
            />
          ) : null}
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
                  Create Forms
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "-20px",
                  }}
                >
                  {forms ? (
                    <Fab
                      variant="extended"
                      style={{
                        backgroundColor: "#541554",
                        color: "white",
                        paddingRight: "20px",
                      }}
                      onClick={() => {
                        setForm2(true);
                      }}
                    >
                      <ListAltIcon sx={{ mr: 1 }} />
                      Create Form
                    </Fab>
                  ) : null}
                </div>
              </Container>
            </Box>
            <Paper
              style={{
                width: "95%",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
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
                  Forms List
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // paddingLeft: "10%",
                    // paddingRight: "10%",
                    width: "100%",
                  }}
                >
                  <div style={{ minWidth: "70%" }}>
                    {forms && (
                      <SearcUI2
                        forms={forms}
                        searchFormResults={searchFormResults}
                      />
                    )}
                  </div>
                  <div style={{ width: "20%", marginLeft: "10%" }}>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ minWidth: "100%", maxWidth: "111%" }}>
                    {forms2 &&
                      forms2.map((item) => {
                        return (
                          <div key={item}>
                            <FormUI data={item} />{" "}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <br />
                <br />
              </div>
            </Paper>
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
