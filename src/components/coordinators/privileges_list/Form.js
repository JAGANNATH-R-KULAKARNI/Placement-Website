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

  async function openFormsHandler() {
    let comp = null;
    console.log(students);
    const emails = [];
    setLoading(true);

    for (let i = 0; i < students.length; i++) {
      emails.push(students[i].email);
    }

    if (end - start <= 0) {
      alert("Invalid Start and end time");
      return;
    }

    if (!control) {
      alert("Select the checkbox");
      return;
    }

    for (let i = 0; i < companies.length; i++) {
      if (company == companies[i].name) {
        comp = companies[i];
        break;
      }
    }
    console.log(company);
    console.log(comp);
    let uniid = "";

    for (let j = 0; j < company.length; j++) {
      if (company[j] == " ") continue;
      uniid = uniid + company[j];
    }

    let t = Date.now();
    setLink(
      window.location.href.substr(0, window.location.href.length - 11) +
        "company/" +
        uniid +
        t
    );

    const uploadData = {
      company_id: comp.id,
      start_time: start,
      end_time: end,
      start: sstart,
      end: send,
      route_id: uniid + t,
      time_created: t,
      url:
        window.location.href.substr(0, window.location.href.length - 11) +
        "company/" +
        uniid +
        t,
    };

    console.log(uploadData);

    await axios
      .post(process.env.REACT_APP_API_ENDPOINT, {
        htm: ` <div>
        <i>Apply for <b>${company}</b> Now !</i>
        <p></p>
        <a href="${
          window.location.href.substr(0, window.location.href.length - 11) +
          "company/" +
          uniid +
          t
        }" style="margin-top:10px;">${
          window.location.href.substr(0, window.location.href.length - 11) +
          "company/" +
          uniid +
          t
        }</a>
        <h3 style="text-align:right;marin-top:10px;"><b>- Placements NIE</b></h3>
      </div>`,
        text: `Apply for ${company} Now`,
        subject: `${company} - Campus Placements`,
        to: emails,
        attachments: [],
      })
      .then((u) => {
        console.log("Success");
        console.log(u);
      })
      .catch((err) => {
        console.log("Error");
        console.log(err);
      });

    const { data, error } = await supabase.from("forms").insert([uploadData]);

    if (data) {
      setLoading(false);
      setDialog(true);
      return;
    }

    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  async function searchCompanyResults(str) {
    console.log("Seach company result");
    console.log(str);
    setCompany(str);
  }

  React.useEffect(() => {
    if (companies.length === 0) {
      fetchTheCompanies();
      fetchTheStudents();
    }

    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  return (
    <div>
      {data ? (
        <div>
          <CssBaseline />
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
                    “You can create forms by selecting a compnay, its opening
                    time and its closing time. You can share the link with
                    students. Later you can download the data.”
                  </i>
                </Typography>
              </Container>
            </Box>
            <Paper style={{ marginTop: "30px", borderRadius: "40px" }}>
              <div style={{ height: "20px" }}></div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={formimage}
                  alt="formimage"
                  style={{ width: "50px", height: "auto" }}
                />
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "100%",
                }}
              >
                <div style={{ width: "85%" }}>
                  {companies && (
                    <SearchUI
                      companies={companies}
                      searchCompanyResults={searchCompanyResults}
                    />
                  )}
                </div>
              </div>
              {company ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Accordion style={{ width: "85%" }} elevation={1}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>View more details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Details about compnay should be displayed
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <DateUI
                  text="Open at"
                  timeHandler={setStart}
                  timeHandler2={setSStart}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <DateUI
                  text="Close at"
                  timeHandler={setEnd}
                  timeHandler2={setSEnd}
                />
              </div>
              {company && start && end ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <FormGroup style={{ width: "80%" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ color: "#541554" }}
                          checked={control}
                          onChange={(e) => {
                            setControl(e.target.checked);
                          }}
                        />
                      }
                      label={
                        <div>
                          <p style={{ fontSize: "13px" }}>
                            Company - <b>{company}</b>
                          </p>
                          <p style={{ fontSize: "13px", marginTop: "-10px" }}>
                            Opens at - <b>{sstart.substr(0, 25)}</b>
                          </p>
                          <p style={{ fontSize: "13px", marginTop: "-10px" }}>
                            Closes at - <b>{send.substr(0, 25)}</b>
                          </p>
                        </div>
                      }
                    />
                  </FormGroup>
                </div>
              ) : null}
              {company && start && end ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: company && start && end ? "5px" : "30px",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "black",
                      width: "85%",
                      borderRadius: "10px",
                    }}
                    onClick={openFormsHandler}
                  >
                    Submit
                  </Button>
                </div>
              ) : null}
              <div style={{ height: "60px" }}></div>
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
