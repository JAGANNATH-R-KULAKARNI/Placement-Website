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
import BranchesUI from "./Branches2";
import CollegeUI from "./College";
import YearUI from "./Year";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { supabase } from "../../../../Supabase";
import SpinnerUI from "./Spinner";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import BackDropUI from "./Backdrop";
import DateUI from "./Date";
import handshakemobile from "../../../images/handshakemobile.jpg";
import { withStyles } from "@material-ui/core/styles";
import ModalUI from "../../../Dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Register(props) {
  const [open, setOpen] = React.useState(true);
  const m1 = useMediaQuery("(min-width:600px)");
  const [urls, setUrls] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [companyLogo, setCompanyLogo] = React.useState("");
  const [ctc, setCTC] = React.useState(0);
  const [ctcDisclosed, setCTCDisclosed] = React.useState(false);
  const [type, setType] = React.useState("");
  const [intDate, setIntDate] = React.useState("");
  const [intDateDisclosure, setIntDateDisclosure] = React.useState("");
  const [eligibleColleges, setEligibleColleges] = React.useState([]);
  const [eligibleYears, setEligibleYears] = React.useState([]);
  const [eligibleBranches, setEligibleBranches] = React.useState([]);
  const [minMInTen, setMinMInTen] = React.useState(0);
  const [minMInTwelve, setMinMInTwelve] = React.useState(0);
  const [eduGap, setEduGap] = React.useState(0);
  const [backlogs, setBacklogs] = React.useState(false);
  const [arears, setArears] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [gender, setGender] = React.useState(0);
  const [cgpa, setCGPA] = React.useState(0);
  const [modalHandler, setModalHandler] = React.useState({
    status: false,
    msg: "",
    func: null,
  });

  const [sending, setSending] = React.useState(false);

  const registerCompany = async () => {
    if (name.length == 0) {
      setModalHandler({
        status: true,
        msg: `Name is required`,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      return;
    } else if (!ctcDisclosed && ctc <= 0) {
      setModalHandler({
        status: true,
        msg: `CTC should be valid or else disable`,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      return;
    } else if (type.length == 0) {
      setModalHandler({
        status: true,
        msg: `Type of company is required`,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      return;
    } else if (!intDateDisclosure && intDate.length == 0) {
      setModalHandler({
        status: true,
        msg: `Tentative dates are required`,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      return;
    } else if (eligibleBranches.length == 0) {
      setModalHandler({
        status: true,
        msg: `If no branches are eligible, then why the company is coming ? `,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      return;
    } else if (eligibleColleges.length == 0) {
      setModalHandler({
        status: true,
        msg: `If no colleges are eligible, then why the company is coming ? `,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      return;
    } else if (eligibleYears.length == 0) {
      setModalHandler({
        status: true,
        msg: `If no engineering years are eligible, then why the company is coming ? `,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      return;
    } else if (companyLogo.length == 0) {
      setModalHandler({
        status: true,
        msg: `Company logo is required`,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      return;
    }

    setSending(true);

    const types_status = {
      Mass: 1,
      Core: 2,
      Dream: 3,
      "Open Dream": 4,
      nyd: 0,
    };
    const uploadData = {
      name: name,
      ctc: !ctcDisclosed ? ctc : "---",
      type: type == "nyd" ? "" : type,
      tentative_interview_dates: !intDateDisclosure ? intDate : "---",
      eligible_branches: eligibleBranches,
      min_in_ten: minMInTen == "" ? 0 : minMInTen,
      min_in_twelve: minMInTwelve == "" ? 0 : minMInTwelve,
      max_year_education_gap: eduGap == "" ? 0 : eduGap,
      active_backlogs_allowed: backlogs,
      history_backlogs_allowed: arears,
      description: description,
      jds: urls,
      time_posted: Date.now(),
      gender: gender,
      min_cgpa: cgpa == "" ? 0 : cgpa,
      eligible_colleges: eligibleColleges,
      eligible_years: eligibleYears,
      logo: companyLogo,
      type_status: types_status[type],
    };

    console.log("Upload Data Bro");
    console.log(uploadData);
    const { data, error } = await supabase
      .from("companies")
      .insert([uploadData]);

    if (data) {
      console.log("Success");
      console.log(data);
      setSending(false);

      setModalHandler({
        status: true,
        msg: `Successfully Registered a company`,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
      props.registerModalHandler();
    }

    if (error) {
      console.log("Error");
      console.log(error);
      setSending(false);

      setModalHandler({
        status: true,
        msg: `error.message`,
        func: () => {
          setModalHandler({
            status: false,
            msg: "",
            func: null,
          });
        },
      });
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
        setModalHandler({
          status: true,
          msg: `Something went wrong :( try again`,
          func: () => {
            setModalHandler({
              status: false,
              msg: "",
              func: null,
            });
          },
        });
        console.log("Unsuccessful");
        console.log(error.message);
      }
    }

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
        {sending ? <BackDropUI /> : false}
        {modalHandler.status ? <ModalUI data={modalHandler} /> : null}
        <div>
          {/* <AppBar
            sx={{ position: "relative", backgroundColor: "#0C7475" }}
            elevation={0}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar> */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              color: "white",
            }}
          >
            <CloseIcon style={{ fontSize: "30px" }} />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-58px",
            }}
          >
            <img
              src={handshakemobile}
              style={{ width: "100%", height: "auto" }}
              alt="Hand shake"
            />
          </div>

          <div
            style={{
              backgroundColor: "#F5F8F9",
            }}
          >
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Paper
                style={{
                  width: "95%",
                  padding: "5%",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "10px",
                }}
                elevation={1}
              >
                <div style={{ width: "90%" }}>
                  <TextField
                    id="standard-basic"
                    label="Company Name"
                    variant="standard"
                    style={{
                      width: "100%",
                    }}
                    // InputLabelProps={{
                    //   style: { color: "#017E7E" },
                    // }}
                    // sx={{
                    //   input: {
                    //     borderBottom: "2px solid #017E7E",
                    //   },
                    // }}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Company Logo (url)"
                    variant="standard"
                    style={{ width: "100%", marginTop: "5px" }}
                    value={companyLogo}
                    onChange={(e) => {
                      setCompanyLogo(e.target.value);
                    }}
                    // sx={{
                    //   input: {
                    //     borderBottom: "2px solid #017E7E",
                    //   },
                    // }}
                    placeholder="Paste it from the internet"
                  />
                  <TextField
                    id="standard-basic"
                    label="CTC (in LPA)"
                    variant="standard"
                    type="number"
                    style={{ width: "100%", marginTop: "20px" }}
                    value={ctc}
                    onChange={(e) => {
                      setCTC(e.target.value);
                    }}
                    disabled={ctcDisclosed}
                  />
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ color: "#017E7E" }}
                          value={ctcDisclosed}
                          onChange={(e) => {
                            setCTCDisclosed(e.target.checked);
                            if (e.target.checked) setCTC(0);
                          }}
                        />
                      }
                      label="Not yet disclosed"
                    />
                  </FormGroup>

                  <FormControl
                    variant="standard"
                    sx={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Company Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      label="Company Type"
                    >
                      {/* <MenuItem value="nyd">
                        <em>Not yet disclosed</em>
                      </MenuItem> */}
                      <MenuItem value="Mass">Mass</MenuItem>
                      <MenuItem value="Core">Core</MenuItem>
                      <MenuItem value="Dream">Dream</MenuItem>
                      <MenuItem value="Open Dream">Open Dream</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <TextField
                    id="standard-basic"
                    label="Tentative Interview Dates"
                    variant="standard"
                    type="text"
                    style={{ width: "100%", marginTop: "15px" }}
                    disabled={intDateDisclosure}
                    value={intDate}
                    onChange={(e) => {
                      setIntDate(e.target.value);
                    }}
                  /> */}
                  <div style={{ marginTop: "35px" }}>
                    <DateUI setIntDate={setIntDate} />
                  </div>
                  {/* <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ color: "#541554" }}
                          value={intDateDisclosure}
                          onChange={(e) => {
                            setIntDateDisclosure(e.target.checked);
                            setIntDate("");
                          }}
                        />
                      }
                      label="Not yet disclosed"
                    />
                  </FormGroup> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    <CollegeUI setEligibleColleges={setEligibleColleges} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    <YearUI setEligibleYears={setEligibleYears} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    <BranchesUI setEligibleBranches={setEligibleBranches} />
                  </div>

                  <TextField
                    id="standard-basic"
                    label="Min CGPA"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    type="number"
                    value={cgpa}
                    focused={true}
                    onChange={(e) => {
                      setCGPA(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Min % in 10th"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    type="number"
                    value={minMInTen}
                    focused={true}
                    onChange={(e) => {
                      setMinMInTen(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Min % in 12th"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    type="number"
                    value={minMInTwelve}
                    focused={true}
                    onChange={(e) => {
                      setMinMInTwelve(e.target.value);
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Max Year Education Gap"
                    variant="standard"
                    style={{ width: "100%", marginTop: "20px" }}
                    type="number"
                    value={eduGap}
                    focused={true}
                    onChange={(e) => {
                      setEduGap(e.target.value);
                    }}
                  />
                  <div
                    style={{ width: "100%", marginTop: m1 ? "20px" : "0px" }}
                  >
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: m1 ? "0px" : "20px",
                        marginRight: m1 ? "40px" : "0px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ color: "#017E7E" }}
                            checked={backlogs}
                            onChange={(e) => {
                              setBacklogs(e.target.checked);
                            }}
                          />
                        }
                        label="Active backlogs allowed ?"
                        labelPlacement="start"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={arears}
                            onChange={(e) => {
                              setArears(e.target.checked);
                            }}
                            style={{ color: "#017E7E" }}
                          />
                        }
                        label="History of Backlogs allowed ?"
                        labelPlacement="start"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                        marginRight: m1 ? "40px" : "0px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={gender === 1}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setGender(1);
                              } else {
                                setGender(0);
                              }
                            }}
                            style={{ color: "#017E7E" }}
                          />
                        }
                        label="Female Candidates Only ?"
                        labelPlacement="start"
                      />
                    </FormGroup>
                    <FormGroup
                      style={{
                        float: "left",
                        marginLeft: "-17px",
                        marginTop: "0px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={gender === 2}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setGender(2);
                              } else {
                                setGender(0);
                              }
                            }}
                            style={{ color: "#017E7E" }}
                          />
                        }
                        label="Male Candidates Only ?"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </div>

                  <TextField
                    id="standard-multiline-static"
                    label="Extra description (optional)"
                    multiline
                    rows={4}
                    placeholder="3 Years of Service agreement & additional benefits on top."
                    variant="standard"
                    style={{ width: "100%", marginTop: "10px" }}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
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
                      variant="outlined"
                      component="label"
                      style={{
                        color: "#017E7E",
                        fontWeight: 700,
                        border: "1px solid #017E7E",
                        textTransform: "capitalize",
                        borderRadius: "20px",
                      }}
                      // onClick={handleOpenPicker}
                      startIcon={<AttachFileIcon />}
                    >
                      {uploading ? "Uploading...Wait" : "Upload JD (optional)"}

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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#017E7E",
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
            <br />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
