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
  const [report, setReport] = React.useState(null);
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

    if (studs && studs.length === 0) {
      alert(`No students have applied for ${props.data.company.name}`);
      return;
    }
    const temp_data = [];
    const temp_heading = [];

    for (let i = 0; i < studs.length; i++) {
      const temp = {};

      if (name) {
        temp["name"] = studs[i].name;
        if (i == 0) {
          temp_heading.push({
            label: "Full Name",
            key: "name",
          });
        }
      }

      if (usn) {
        temp["usn"] = studs[i].usn;
        if (i == 0) {
          temp_heading.push({
            label: "USN",
            key: "usn",
          });
        }
      }

      if (email) {
        temp["email"] = studs[i].email;
        if (i == 0) {
          temp_heading.push({
            label: "Email",
            key: "email",
          });
        }
      }

      if (cgpa) {
        temp["cgpa"] = studs[i].cgpa;
        if (i == 0) {
          temp_heading.push({
            label: "CGPA",
            key: "cgpa",
          });
        }
      }

      if (resume) {
        temp["resume"] =
          studs[i].documents.length > 0 ? studs[i].documents[0] : "";
        if (i == 0) {
          temp_heading.push({
            label: "Resume",
            key: "resume",
          });
        }
      }

      if (dob) {
        temp["dob"] = studs[i].dob;
        if (i == 0) {
          temp_heading.push({
            label: "Date Of Birth",
            key: "dob",
          });
        }
      }

      if (branch) {
        temp["branch"] = studs[i].branch;
        if (i == 0) {
          temp_heading.push({
            label: "Branch",
            key: "branch",
          });
        }
      }

      if (section) {
        temp["section"] = studs[i].section;
        if (i == 0) {
          temp_heading.push({
            label: "Section",
            key: "section",
          });
        }
      }

      if (gender) {
        temp["gender"] =
          studs[i].gender == 1
            ? "Female"
            : studs[i].gender == 2
            ? "Male"
            : "Others";

        if (i == 0) {
          temp_heading.push({
            label: "Gender",
            key: "gender",
          });
        }
      }

      if (tenthpercentage) {
        temp["tp"] = studs[i].tenth_percentage;
        if (i == 0) {
          temp_heading.push({
            label: "10th Percentage",
            key: "tp",
          });
        }
      }

      if (twelthPercentage) {
        temp["twp"] = studs[i].twelth_percentage;
        if (i == 0) {
          temp_heading.push({
            label: "12th Percentage",
            key: "twp",
          });
        }
      }

      if (diplomopercentage) {
        temp["dp"] = studs[i].diplomo_percentage;
        if (i == 0) {
          temp_heading.push({
            label: "Diplomo Percentage",
            key: "dp",
          });
        }
      }

      if (year) {
        temp["year"] = studs[i].year;
        if (i == 0) {
          temp_heading.push({
            label: "Engineering Year",
            key: "year",
          });
        }
      }

      if (currArears) {
        temp["currA"] = studs[i].current_arears;
        if (i == 0) {
          temp_heading.push({
            label: "Active Arears",
            key: "currA",
          });
        }
      }

      if (clearArears) {
        temp["clearA"] = studs[i].cleared_arears;
        if (i == 0) {
          temp_heading.push({
            label: "Cleared Arears",
            key: "clearA",
          });
        }
      }

      if (currBacklogs) {
        temp["currB"] = studs[i].current_backlogs;
        if (i == 0) {
          temp_heading.push({
            label: "Active Backlogs",
            key: "currB",
          });
        }
      }

      if (clearBacklogs) {
        temp["clearB"] = studs[i].cleared_backlogs;
        if (i == 0) {
          temp_heading.push({
            label: "Cleared Backlogs",
            key: "clearB",
          });
        }
      }

      if (phnum) {
        temp["phnum"] = studs[i].phone_num;
        if (i == 0) {
          temp_heading.push({
            label: "Contact Number",
            key: "phnum",
          });
        }
      }

      if (gap) {
        temp["gap"] = studs[i].max_year_education_gap;
        if (i == 0) {
          temp_heading.push({
            label: "Education Gap",
            key: "gap",
          });
        }
      }

      if (caste) {
        temp["caste"] = studs[i].category;
        if (i == 0) {
          temp_heading.push({
            label: "Caste Category",
            key: "caste",
          });
        }
      }

      if (tenthBoard) {
        temp["tenthBoard"] = studs[i].tenth_board;
        if (i == 0) {
          temp_heading.push({
            label: "10th Board",
            key: "tenthBoard",
          });
        }
      }

      if (tenthPassed) {
        temp["tenthPassed"] = studs[i].tenth_passed_year;
        if (i == 0) {
          temp_heading.push({
            label: "10th Passed Year",
            key: "tenthPassed",
          });
        }
      }

      if (twelthBoard) {
        temp["twelthBoard"] = studs[i].twelth_board;
        if (i == 0) {
          temp_heading.push({
            label: "12th Board",
            key: "twelthBoard",
          });
        }
      }

      if (twelthPassed) {
        temp["twelthPassed"] = studs[i].twelth_passed_year;
        if (i == 0) {
          temp_heading.push({
            label: "12th Passed Year",
            key: "twelthPassed",
          });
        }
      }

      if (diplomoBoard) {
        temp["diplomoBoard"] = studs[i].diplomo_board;
        if (i == 0) {
          temp_heading.push({
            label: "Diplomo Board",
            key: "diplomoBoard",
          });
        }
      }

      if (diplomoPassed) {
        temp["diplomoPassed"] = studs[i].diplomo_passed_year;
        if (i == 0) {
          temp_heading.push({
            label: "Diplomo Passed Year",
            key: "diplomoPassed",
          });
        }
      }

      if (homeAddr) {
        temp["homeaddr"] = studs[i].home_addr;
        if (i == 0) {
          temp_heading.push({
            label: "Home Address",
            key: "homeaddr",
          });
        }
      }

      if (perAddr) {
        temp["peraddr"] = studs[i].permanent_addr;
        if (i == 0) {
          temp_heading.push({
            label: "Permenant Address",
            key: "peraddr",
          });
        }
      }

      if (credits) {
        temp["credits"] = studs[i].permanent_addr;
        if (i == 0) {
          temp_heading.push({
            label: "Total Credits Earned",
            key: "credits",
          });
        }
      }

      temp_data.push(temp);
    }

    const repo = {
      data: temp_data,
      headers: temp_heading,
      filename: `${props.data.company.name}.csv`,
    };

    setReport(repo);
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
                        csvReport={report}
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
