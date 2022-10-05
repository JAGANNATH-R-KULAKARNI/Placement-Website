import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import NavBarUI from "../../../NavBar4";
import Paper from "@mui/material/Paper";
import bg from "../../../images/bg3.webp";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { supabase } from "../../../../Supabase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { ContentPasteGoSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import formimage from "../../../images/form.png";
import SearchUI from "./Search";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateUI from "./Date2";
import axios from "axios";
import BackdropUI from "../utilities3/Backdrop";
import DialogUI from "./Dialog2";
import Fab from "@mui/material/Fab";
import ListAltIcon from "@mui/icons-material/ListAlt";
import UpdateUI from "../utilities/Update";
import DownloadUI from "./Download";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateForm(props) {
  const [open, setOpen] = React.useState(true);
  const m1 = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [currcompany, setCurrcompany] = React.useState(null);
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
  const [model, setModel] = React.useState(false);

  const [initialize, setInitialize] = React.useState(false);
  const [prevData, setPrevData] = React.useState(null);

  const [download, setDownload] = React.useState(false);

  async function fetchTheProfile() {
    const data = await supabase.auth.user();

    if (data) {
      setData(data);
      if (data.email !== process.env.REACT_APP_ADMIN) navigate("/");
    }
  }

  const handleClose = () => {
    setOpen(false);
    props.registerModalHandler();
  };

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

  async function updateFormBro() {
    let comp = null;
    console.log(students);
    const emails = [];

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

    setLoading(true);

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
    setLink(prevData.data.url);

    const uploadData = {
      company_id: comp.id,
      start_time: start,
      end_time: end,
      start: sstart,
      end: send,
      route_id: prevData.data.route_id,
      time_created: t,
      url: prevData.data.url,
    };

    console.log("uploadData");
    console.log(prevData);
    console.log(prevData.data.route_id);
    console.log(uploadData);

    await axios
      .post(process.env.REACT_APP_API_ENDPOINT, {
        htm: ` <div>
        <i>Apply for <b>${company}</b> Now !</i>
        <p></p>
        <a href="${prevData.data.url}" style="margin-top:10px;width:100%;">${
          window.location.href.substr(0, window.location.href.length - 11) +
          "company/" +
          prevData.data.route_id
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

    const { data, error } = await supabase
      .from("forms")
      .update(uploadData)
      .match({ id: prevData.data.id });

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
    // let com = null;

    for (let i = 0; i < companies.length; i++) {
      if (str == companies[i].name) {
        setCurrcompany(companies[i]);
        break;
      }
    }

    setCompany(str);
  }

  React.useEffect(() => {
    if (companies.length === 0 || !currcompany) {
      fetchTheCompanies();
      fetchTheStudents();
      if (!initialize || !currcompany) {
        setInitialize(true);
        console.log("useEffect");
        console.log(props.data);
        setPrevData(props.data);
        searchCompanyResults(props.data.company.name);
      }
    }
    if (!initialize || !currcompany) {
      setInitialize(true);
      console.log("useEffect");
      console.log(props.data);
      console.log(props.data.data.start_time);
      console.log(props.data.data.end_time);
      setPrevData(props.data);
      searchCompanyResults(props.data.company.name);
    }
    setInterval(() => {
      fetchTheProfile();
    }, 1000);
  });

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div
          style={{
            backgroundImage: `url(${bg})`,
            backgroundAttachment: "fixed",
          }}
        >
          <NavBarUI handleClose={handleClose} />
          {model && currcompany ? (
            <UpdateUI
              name={currcompany.name}
              ctc={currcompany.ctc}
              type={currcompany.type}
              el={currcompany.eligible_branches}
              t={currcompany.tentative_interview_dates}
              mt={currcompany.min_in_ten}
              mtw={currcompany.min_in_twelve}
              max={currcompany.max_year_education_gap}
              ba={currcompany.active_backlogs_allowed}
              hba={currcompany.history_backlogs_allowed}
              cgpa={currcompany.min_cgpa}
              gender={currcompany.gender}
              desc={currcompany.description}
              id={currcompany.id}
              jds={currcompany.jds}
              toggleModel={() => {
                setModel(!model);
              }}
              data={props.data.company}
            />
          ) : null}
          {download && currcompany ? (
            <DownloadUI
              company={currcompany}
              toggleModel={() => {
                setDownload(!download);
              }}
              data={props.data}
            />
          ) : null}

          {data ? (
            <div>
              <CssBaseline />
              {loading ? <BackdropUI /> : null}
              {dialog ? (
                <DialogUI
                  company={company}
                  link={link}
                  handlerClose={() => {
                    handleClose();
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
                      Download or Update
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {currcompany && company ? (
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#541554",
                            color: "white",
                            borderRadius: "15px",
                            marginTop: "10px",
                            marginBottom: "-15px",
                          }}
                          onClick={() => {
                            setDownload(!download);
                          }}
                        >
                          Download Report
                        </Button>
                      ) : null}
                    </div>
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
                      {/* {companies && (
                        <SearchUI
                          companies={companies}
                          searchCompanyResults={searchCompanyResults}
                        />
                      )} */}
                      <h2
                        style={{
                          color: "black",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {company}
                      </h2>
                    </div>
                  </div>
                  {company ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "0px",
                      }}
                    >
                      {/* <Accordion style={{ width: "85%" }} elevation={1}>
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
                      </Accordion> */}
                      {currcompany ? (
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#541554",
                            color: "white",
                            borderRadius: "15px",
                          }}
                          onClick={() => {
                            setModel(!model);
                          }}
                        >
                          View More Details
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "50px",
                    }}
                  >
                    {prevData && (
                      <DateUI
                        text="Open at"
                        timeHandler={setStart}
                        timeHandler2={setSStart}
                        time={prevData.data.start_time}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    {prevData && (
                      <DateUI
                        text="Close at"
                        timeHandler={setEnd}
                        timeHandler2={setSEnd}
                        time={prevData.data.end_time}
                      />
                    )}
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
                              <p
                                style={{ fontSize: "13px", marginTop: "-10px" }}
                              >
                                Opens at - <b>{sstart.substr(0, 25)}</b>
                              </p>
                              <p
                                style={{ fontSize: "13px", marginTop: "-10px" }}
                              >
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
                        // onClick={openFormsHandler}
                        onClick={updateFormBro}
                      >
                        Update
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
      </Dialog>
    </div>
  );
}
