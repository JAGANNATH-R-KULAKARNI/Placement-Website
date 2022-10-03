import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import NavBarUI from "../../../NavBar4";
import Paper from "@mui/material/Paper";
import bg from "../../../images/bg3.webp";
import useMediaQuery from "@mui/material/useMediaQuery";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CSVLink } from "react-csv";
import { supabase } from "../../../../Supabase";
import ButtonsUI from "./Buttons";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const info = [
  {
    firstName: "Warren",
    lastName: "Morrow",
    email: "sokyt@mailinator.com",
    age: "36",
  },
  {
    firstName: "Gwendolyn",
    lastName: "Galloway",
    email: "weciz@mailinator.com",
    age: "76",
  },
  {
    firstName: "Astra",
    lastName: "Wyatt",
    email: "quvyn@mailinator.com",
    age: "57",
  },
  {
    firstName: "Jasmine",
    lastName: "Wong",
    email: "toxazoc@mailinator.com",
    age: "42",
  },
  {
    firstName: "Brooke",
    lastName: "Mcconnell",
    email: "vyry@mailinator.com",
    age: "56",
  },
  {
    firstName: "Christen",
    lastName: "Haney",
    email: "pagevolal@mailinator.com",
    age: "23",
  },
  {
    firstName: "Tate",
    lastName: "Vega",
    email: "dycubo@mailinator.com",
    age: "87",
  },
  {
    firstName: "Amber",
    lastName: "Brady",
    email: "vyconixy@mailinator.com",
    age: "78",
  },
  {
    firstName: "Philip",
    lastName: "Whitfield",
    email: "velyfi@mailinator.com",
    age: "22",
  },
  {
    firstName: "Kitra",
    lastName: "Hammond",
    email: "fiwiloqu@mailinator.com",
    age: "35",
  },
  {
    firstName: "Charity",
    lastName: "Mathews",
    email: "fubigonero@mailinator.com",
    age: "63",
  },
];

const headers = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Age", key: "age" },
];

const csvReport = {
  data: info,
  headers: headers,
  filename: "Clue Mediator Report.csv",
};

export default function DownloadCSV(props) {
  const [open, setOpen] = React.useState(true);
  const m1 = useMediaQuery("(min-width:600px)");

  const [name, setName] = React.useState(true);
  const [usn, setUsn] = React.useState(true);
  const [email, setEmail] = React.useState(true);
  const [cgpa, setCGPA] = React.useState(true);
  const [resume, setResume] = React.useState(true);
  const [dob, setDOB] = React.useState(false);
  const [branch, setBranch] = React.useState(true);
  const [section, setSection] = React.useState(true);
  const [gender, setGender] = React.useState(true);
  const [tenthpercentage, setTenthPercentage] = React.useState(true);
  const [twelthPercentage, setTwelthPercentage] = React.useState(true);
  const [diplomopercentage, setDiplomoPercentage] = React.useState(true);
  const [year, setYear] = React.useState(true);
  const [currArears, setCurrArears] = React.useState(false);
  const [clearArears, setClearArears] = React.useState(false);
  const [currBacklogs, setCurrBacklogs] = React.useState(false);
  const [clearBacklogs, setClearBacklogs] = React.useState(false);
  const [phnum, setPhnum] = React.useState(true);
  const [gap, setGap] = React.useState(false);
  const [caste, setCaste] = React.useState(false);
  const [tenthBoard, setTenthBoard] = React.useState(false);
  const [tenthPassed, setTenthPassed] = React.useState(false);
  const [twelthBoard, setTwelthBoard] = React.useState(false);
  const [twelthPassed, setTwelthPassed] = React.useState(false);
  const [diplomoBoard, setDiplomoBoard] = React.useState(false);
  const [diplomoPassed, setDiplomoPassed] = React.useState(false);
  const [homeAddr, setHomeAddress] = React.useState(false);
  const [perAddr, setPerAddr] = React.useState(false);
  const [credits, setCreadits] = React.useState(false);

  const [data, setData] = React.useState([]);
  const [headings, setHeadings] = React.useState([]);
  const [report, setReport] = React.useState({});
  const [control, setControl] = React.useState(false);
  const [generating, setGenerating] = React.useState(false);

  const [applications, setApplication] = React.useState(null);

  const [students, setStudents] = React.useState(null);

  async function fetchTheStudents() {
    const { data, error } = await supabase.from("students").select("*");

    if (data) {
      console.log("Students");
      console.log(data);
      setStudents(data);
      fetchTheApplications();
    }
  }

  async function fetchTheApplications() {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("form_id", props.data.data.id)
      .eq("company_id", props.data.data.company_id);

    if (data) {
      console.log("Data");
      console.log(props.data);
      console.log(data);
      setApplication(data);
    }
  }

  React.useEffect(() => {
    if (!students) {
      fetchTheStudents();
      fetchTheApplications();
    }
    if (!applications) {
      fetchTheApplications();
    }
  }, [applications]);

  const handleClose = () => {
    setOpen(false);
    props.toggleModel();
  };

  const getReport = () => {
    if (!students || !applications) {
      fetchTheStudents();
      fetchTheApplications();
      return;
    }

    const studs = [];

    for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < applications.length; j++) {
        if (applications[j].student_id == students[i].id) {
          studs.push(students[i]);
          break;
        }
      }
    }

    console.log("Candidates");
    console.log(studs);
  };

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
          <div style={{ height: "100px" }}></div>
          <div>
            <Paper
              variant="outlined"
              style={{
                borderBottomLeftRadius: "50px",
                borderBottomRightRadius: "50px",
              }}
              elevation={10}
            >
              <h1
                style={{
                  textAlign: "center",
                  marginTop: m1 ? "50px" : "25px",
                  fontSize: m1 ? "45px" : "35px",
                }}
              >
                Download CSV
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "-30px",
                }}
              >
                <h4
                  style={{
                    fontSize: m1 ? "17px" : "12px",
                    color: "black",
                    fontWeight: 500,
                    textAlign: "center",
                    width: "80%",
                  }}
                >
                  <i>
                    “Select the fields you want to download. When you check a
                    field, that field data will be in the csv file. Its your
                    choice”
                  </i>
                </h4>
              </div>
            </Paper>
            <br />
            <div style={{ width: "100%", paddingLeft: "5%" }}>
              <Paper
                style={{
                  width: "95%",
                  padding: "5%",
                  display: "flex",
                  justifyContent: "center",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "30px",
                }}
              >
                <div
                  style={{
                    width: "90%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      marginTop: m1 ? "20px" : "0px",
                      paddingLeft: "10%",
                    }}
                  >
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: m1 ? "0px" : "20px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ color: "#541554" }}
                            checked={name}
                            onChange={(e) => {
                              setName(e.target.checked);
                            }}
                          />
                        }
                        label="Name"
                        labelPlacement="end"
                      />
                    </FormGroup>

                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={usn}
                            onChange={(e) => {
                              setUsn(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="USN"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={email}
                            onChange={(e) => {
                              setEmail(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Email"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={cgpa}
                            onChange={(e) => {
                              setCGPA(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Total CGPA"
                        labelPlacement="end"
                      />
                    </FormGroup>

                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={resume}
                            onChange={(e) => {
                              setResume(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Resume"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={dob}
                            onChange={(e) => {
                              setDOB(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Date of birth"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={branch}
                            onChange={(e) => {
                              setBranch(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Engineering Branch"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={section}
                            onChange={(e) => {
                              setSection(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Section"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={gender}
                            onChange={(e) => {
                              setGender(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Gender"
                        labelPlacement="end"
                      />
                    </FormGroup>

                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tenthpercentage}
                            onChange={(e) => {
                              setTenthPercentage(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="10th Percentage"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={twelthPercentage}
                            onChange={(e) => {
                              setTwelthPercentage(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="12th Percentage"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={diplomopercentage}
                            onChange={(e) => {
                              setDiplomoPercentage(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Diplomo Percentage"
                        labelPlacement="end"
                      />
                    </FormGroup>

                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={year}
                            onChange={(e) => {
                              setYear(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Engineering year"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={currArears}
                            onChange={(e) => {
                              setCurrArears(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Current arears"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={clearArears}
                            onChange={(e) => {
                              setClearArears(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Cleared arears"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={currBacklogs}
                            onChange={(e) => {
                              setCurrBacklogs(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Current Backlogs"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={clearBacklogs}
                            onChange={(e) => {
                              setClearBacklogs(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Cleared Backlogs"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={phnum}
                            onChange={(e) => {
                              setPhnum(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Phone number"
                        labelPlacement="end"
                      />
                    </FormGroup>

                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={gap}
                            onChange={(e) => {
                              setGap(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Education gap"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={caste}
                            onChange={(e) => {
                              setCaste(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Caste Category"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tenthBoard}
                            onChange={(e) => {
                              setTenthBoard(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="10th Board"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tenthPassed}
                            onChange={(e) => {
                              setTenthPassed(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="10th Passed Year"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={twelthBoard}
                            onChange={(e) => {
                              setTwelthBoard(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="12th Board"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={twelthPassed}
                            onChange={(e) => {
                              setTwelthPassed(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="12th Passed Year"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={diplomoBoard}
                            onChange={(e) => {
                              setDiplomoBoard(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Diplomo Board"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={diplomoPassed}
                            onChange={(e) => {
                              setDiplomoPassed(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Diplomo passed year"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={homeAddr}
                            onChange={(e) => {
                              setHomeAddress(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Home Address"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={perAddr}
                            onChange={(e) => {
                              setPerAddr(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Permenent Address"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                        width: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={credits}
                            onChange={(e) => {
                              setCreadits(e.target.checked);
                            }}
                            style={{ color: "#541554" }}
                          />
                        }
                        label="Total Credits Earned"
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </div>
                </div>
              </Paper>
              <Paper
                style={{
                  width: "95%",
                  borderBottomLeftRadius: "30px",
                  borderBottomRightRadius: "30px",
                  marginTop: "-35px",
                }}
                elevation={0}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "80%" }}>
                    <br />
                    {csvReport ? (
                      <ButtonsUI
                        data={props.data}
                        csvReport={csvReport}
                        getReport={getReport}
                      />
                    ) : null}
                  </div>
                </div>
              </Paper>
              <br />
              <br />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
