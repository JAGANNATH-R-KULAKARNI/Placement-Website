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
import BranchesUI from "./Branches";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { supabase } from "../../../../Supabase";
import SpinnerUI from "./Spinner";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { ContentPasteGoSharp } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Register(props) {
  const [open, setOpen] = React.useState(true);
  const m1 = useMediaQuery("(min-width:600px)");
  const [urls, setUrls] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [usn, setUSN] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [gender, setGender] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [tenth, setTenth] = React.useState([null, "", null]);
  const [twelth, setTwelth] = React.useState([null, "", null]);
  const [diplomo, setDiplomo] = React.useState([null, "", null]);
  const [branch, setBranch] = React.useState("");
  const [section, setSection] = React.useState("");
  const [year, setYear] = React.useState(3);
  const [grades, setGrades] = React.useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [arears, setArears] = React.useState([0, 0]);
  const [backlogs, setBacklogs] = React.useState([0, 0]);
  const [phone, setPhone] = React.useState([0, 0]);
  const [address, setAddress] = React.useState(["", ""]);
  const [policy, setPolicy] = React.useState(false);
  const [credits, setCredits] = React.useState(0);
  const [cgpa, setCGPA] = React.useState(0);

  const registerCompany = async () => {
    if (!policy) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    if (
      name.length == 0 ||
      usn.length == 0 ||
      email.length == 0 ||
      dob.length == 0 ||
      gender == 0 ||
      category.length == 0 ||
      !tenth[0] ||
      tenth[1].length == 0 ||
      !tenth[1] ||
      !twelth[2] ||
      twelth[1].length == 0 ||
      !twelth[2] ||
      branch.length == 0 ||
      section.length == 0 ||
      address[0].length == 0 ||
      address[1].length == 0
    ) {
      alert("All fields should be filled");
    }

    const uploadData = {
      name: name,
      usn: usn,
      email: email,
      dob: dob,
      gender: gender,
      category: category,
      tenth_percentage: tenth[0],
      tenth_board: tenth[1],
      tenth_passed_year: tenth[2],
      twelth_percentage: twelth[0],
      twelth_board: twelth[1],
      twelth_passed_year: twelth[2],
      diplomo_percentage: diplomo[0],
      diplomo_board: diplomo[1],
      diplomo_passed_year: diplomo[2],
      branch: branch,
      year: year,
      grades: grades,
      current_arears: arears[0],
      cleared_arears: arears[1],
      current_backlogs: backlogs[0],
      cleared_backlogs: backlogs[1],
      phone_num: phone[0],
      parent_phone_num: phone[1],
      home_addr: address[0],
      permanent_addr: address[1],
      documents: urls,
      credits: credits,
      cgpa: cgpa,
    };

    console.log("Upload Data Bro");
    console.log(uploadData);

    const { data, error } = await supabase
      .from("students")
      .insert([uploadData]);

    if (data) {
      console.log("Success");
      console.log(data);
      alert("Successfully Uploaded");
    }

    if (error) {
      console.log("Error");
      console.log(error);
      alert(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    props.registerModalHandler();
  };

  const handleUpload = async (e) => {
    console.log("files upload bro");
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files);

    const temp = urls;
    setUploading(true);
    let count = e.target.files.length;

    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];

      const { data, error } = await supabase.storage
        .from("companies")
        .upload("jds/" + Date.now() + file.name, file);

      if (data) {
        console.log("Successfully uploded");
        console.log(
          "URL is : " +
            process.env.REACT_APP_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/" +
            data["Key"]
        );
        temp.push(
          process.env.REACT_APP_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/" +
            data["Key"]
        );

        setUrls(temp);
        console.log(data);
        count--;
      }

      if (error) {
        alert("Something went wrong :( try again");
        console.log("Unsuccessful");
        console.log(error.message);
      }
    }

    // if (count == 0) {
    //   alert("Uploaded Successfully");
    // } else if (count == e.target.files.length) {
    //   alert("Something went wrong :( try again");
    // } else {
    //   alert("All files are not uploaded :( try again");
    // }

    setUploading(false);
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
          <div style={{ height: "80px" }}></div>
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
                Register Student
              </h1>
            </Paper>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Paper
                style={{
                  width: "95%",
                  padding: "5%",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "30px",
                }}
              >
                <div style={{ width: "90%" }}>
                  <TextField
                    id="standard-basic"
                    label="Full Name"
                    variant="standard"
                    style={{ width: "100%" }}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="USN"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={usn}
                    onChange={(e) => {
                      setUSN(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Date Of Birth"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                  />
                  <FormControl
                    variant="standard"
                    sx={{ width: "100%", marginTop: "20px" }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      label="Gender"
                    >
                      <MenuItem value={1}>Female</MenuItem>
                      <MenuItem value={2}>Male</MenuItem>
                      <MenuItem value={3}>Others</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="standard-basic"
                    label="Category"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="10th/SSLC Percentage"
                    variant="standard"
                    type="number"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={tenth[0]}
                    onChange={(e) => {
                      const temp = [...tenth];
                      console.log(temp);
                      temp[0] = e.target.value;
                      console.log(temp);
                      setTenth(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="10th/SSLC Board"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={tenth[1]}
                    onChange={(e) => {
                      const temp = [...tenth];
                      temp[1] = e.target.value;
                      console.log(temp);
                      setTenth(temp);
                    }}
                    type="text"
                  />
                  <TextField
                    id="standard-basic"
                    label="10th/SSLC Qualified Year"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={tenth[2]}
                    onChange={(e) => {
                      const temp = [...tenth];
                      temp[2] = e.target.value;

                      setTenth(temp);
                    }}
                    type="number"
                  />
                  <TextField
                    id="standard-basic"
                    label="12th/PUC Percentage"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={twelth[0]}
                    onChange={(e) => {
                      const temp = [...twelth];
                      temp[0] = e.target.value;

                      setTwelth(temp);
                    }}
                    type="number"
                  />
                  <TextField
                    id="standard-basic"
                    label="12th/PUC Board"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={twelth[1]}
                    onChange={(e) => {
                      const temp = [...twelth];
                      temp[1] = e.target.value;

                      setTwelth(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="12th/PUC Qualified Year"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={twelth[2]}
                    onChange={(e) => {
                      const temp = [...twelth];
                      temp[2] = e.target.value;

                      setTwelth(temp);
                    }}
                    type="number"
                  />
                  <TextField
                    id="standard-basic"
                    label="Diplomo Percentage (If Lateral Entry)"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={diplomo[0]}
                    onChange={(e) => {
                      const temp = [...diplomo];
                      temp[0] = e.target.value;

                      setDiplomo(temp);
                    }}
                    type="number"
                  />
                  <TextField
                    id="standard-basic"
                    label="Diplomo Board (If Lateral Entry)"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={diplomo[1]}
                    onChange={(e) => {
                      const temp = [...diplomo];
                      temp[1] = e.target.value;

                      setDiplomo(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Diplomo Qualified Year (If Lateral Entry)"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={diplomo[2]}
                    onChange={(e) => {
                      const temp = [...diplomo];
                      temp[2] = e.target.value;

                      setDiplomo(temp);
                    }}
                    type="number"
                  />

                  <FormControl
                    variant="standard"
                    sx={{ width: "100%", marginTop: "20px" }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Engineering Branch
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={branch}
                      onChange={(e) => {
                        setBranch(e.target.value);
                      }}
                      label="Branch"
                    >
                      <MenuItem value="CSE">Computer Science</MenuItem>
                      <MenuItem value="ISE">Information Science</MenuItem>
                      <MenuItem value="ECE">
                        Electronic & Communication
                      </MenuItem>
                      <MenuItem value="EEE">Electronic & Electrical</MenuItem>
                      <MenuItem value="ME">Mechanical Engineering</MenuItem>
                      <MenuItem value="CIVIL">Civil Engineering</MenuItem>
                      <MenuItem value="IP">Industrial Production</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="standard-basic"
                    label="Section"
                    variant="standard"
                    type="text"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={section}
                    onChange={(e) => {
                      setSection(e.target.value);
                    }}
                  />
                  <FormControl
                    variant="standard"
                    sx={{ width: "100%", marginTop: "20px" }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Current Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Year"
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                    >
                      <MenuItem value={1}>First Year</MenuItem>
                      <MenuItem value={2}>Second Year</MenuItem>
                      <MenuItem value={3}>Third Year</MenuItem>
                      <MenuItem value={4}>Fourth Year</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="standard-basic"
                    label="1st Sem SGPA"
                    variant="standard"
                    type="number"
                    style={{ width: "47%", marginTop: "20px" }}
                    value={grades[0]}
                    onChange={(e) => {
                      const temp = [...grades];
                      temp[0] = e.target.value;
                      setGrades(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="2nd Sem SGPA"
                    variant="standard"
                    type="number"
                    style={{
                      width: "47%",
                      marginTop: "20px",
                      marginLeft: "6%",
                    }}
                    value={grades[1]}
                    onChange={(e) => {
                      const temp = [...grades];
                      temp[1] = e.target.value;
                      setGrades(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="3rd Sem SGPA"
                    variant="standard"
                    type="number"
                    style={{ width: "47%", marginTop: "20px" }}
                    value={grades[2]}
                    onChange={(e) => {
                      const temp = [...grades];
                      temp[2] = e.target.value;
                      setGrades(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="4th Sem SGPA"
                    variant="standard"
                    type="number"
                    style={{
                      width: "47%",
                      marginTop: "20px",
                      marginLeft: "6%",
                    }}
                    value={grades[3]}
                    onChange={(e) => {
                      const temp = [...grades];
                      temp[3] = e.target.value;
                      setGrades(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="5th Sem SGPA"
                    variant="standard"
                    type="number"
                    style={{ width: "47%", marginTop: "20px" }}
                    value={grades[4]}
                    onChange={(e) => {
                      const temp = [...grades];
                      temp[4] = e.target.value;
                      setGrades(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="6th Sem SGPA"
                    variant="standard"
                    type="number"
                    style={{
                      width: "47%",
                      marginTop: "20px",
                      marginLeft: "6%",
                    }}
                    value={grades[5]}
                    onChange={(e) => {
                      const temp = [...grades];
                      temp[5] = e.target.value;
                      setGrades(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="7th Sem SGPA"
                    variant="standard"
                    type="number"
                    style={{ width: "47%", marginTop: "20px" }}
                    value={grades[6]}
                    onChange={(e) => {
                      const temp = [...grades];
                      temp[6] = e.target.value;
                      setGrades(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="8th Sem SGPA"
                    variant="standard"
                    type="number"
                    style={{
                      width: "47%",
                      marginTop: "20px",
                      marginLeft: "6%",
                    }}
                    value={grades[7]}
                    onChange={(e) => {
                      const temp = [...grades];
                      temp[7] = e.target.value;
                      setGrades(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Total CGPA (until current semester)"
                    variant="standard"
                    type="number"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                    value={cgpa}
                    onChange={(e) => {
                      setCGPA(e.target.value);
                    }}
                  />

                  <TextField
                    id="standard-basic"
                    label="Total Credits Earned"
                    variant="standard"
                    type="number"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                    value={credits}
                    onChange={(e) => {
                      setCredits(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="No Of Current Arears"
                    variant="standard"
                    type="number"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                    value={arears[0]}
                    onChange={(e) => {
                      const temp = [...arears];
                      temp[0] = e.target.value;
                      setArears(temp);
                    }}
                  />

                  <TextField
                    id="standard-basic"
                    label="No Of Cleared Arears"
                    variant="standard"
                    type="number"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                    value={arears[1]}
                    onChange={(e) => {
                      const temp = [...arears];
                      temp[1] = e.target.value;
                      setArears(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="No Of Current Backlogs"
                    variant="standard"
                    type="number"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                    value={backlogs[0]}
                    onChange={(e) => {
                      const temp = [...backlogs];
                      temp[0] = e.target.value;
                      setBacklogs(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="No Of Cleared Backlogs"
                    variant="standard"
                    type="number"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                    value={backlogs[1]}
                    onChange={(e) => {
                      const temp = [...backlogs];
                      temp[1] = e.target.value;
                      setBacklogs(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Phone No"
                    variant="standard"
                    type="number"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                    value={phone[0]}
                    onChange={(e) => {
                      const temp = [...phone];
                      temp[0] = e.target.value;
                      setPhone(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Parents Phone No"
                    variant="standard"
                    type="number"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                    value={phone[1]}
                    onChange={(e) => {
                      const temp = [...phone];
                      temp[1] = e.target.value;
                      setPhone(temp);
                    }}
                  />

                  <TextField
                    id="standard-basic"
                    label="Home Address"
                    variant="standard"
                    type="text"
                    style={{ width: "100%", marginTop: "15px" }}
                    value={address[0]}
                    onChange={(e) => {
                      const temp = [...address];
                      temp[0] = e.target.value;
                      setAddress(temp);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Permanent Address"
                    variant="standard"
                    type="text"
                    style={{ width: "100%", marginTop: "15px" }}
                    value={address[1]}
                    onChange={(e) => {
                      const temp = [...address];
                      temp[1] = e.target.value;
                      setAddress(temp);
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                      style={{ backgroundColor: "#541554" }}
                      // onClick={handleOpenPicker}
                    >
                      {uploading ? "Uploading...Wait" : "Upload Resume"}

                      <input
                        hidden
                        multiple
                        type="file"
                        onChange={(e) => {
                          console.log(e);
                          handleUpload(e);
                        }}
                      />
                    </Button>
                  </div>
                  <br />
                  {uploading ? (
                    <div>
                      <SpinnerUI />
                    </div>
                  ) : null}
                  <br />
                  {urls &&
                    urls.map((item) => {
                      return (
                        <iframe
                          src={item}
                          style={{
                            width: m1 ? "10%" : "50%",
                            height: "100px",
                            overflow: "hidden",
                          }}
                          scrolling="no"
                          key={item}
                        ></iframe>
                      );
                    })}
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ color: "#541554" }}
                          checked={policy}
                          onChange={(e) => {
                            setPolicy(e.target.checked);
                          }}
                        />
                      }
                      label={
                        <h6 style={{ fontWeight: 500 }}>
                          I have read and understood the placement policy and
                          the Process. I will adhere to all the rules and
                          regulation of training and placement department.
                        </h6>
                      }
                    />
                  </FormGroup>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "0px",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "black",
                        width: "100%",
                        height: "50px",
                        borderRadius: "16px",
                      }}
                      onClick={registerCompany}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
