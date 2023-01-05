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
import UpdateUI from "./Update2";
import CreateFormUI from "../utilities4/Create2";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Propane } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [timeAgo, setTimeAgo] = React.useState(null);
  const [ecc, setEcc] = React.useState("");
  const [ebb, setEbb] = React.useState("");
  const [eyy, setEyy] = React.useState("");

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

  const handleClose = () => {
    setOpen(false);
    props.setView(false);
    props.setCompany(null);
  };

  async function calcInfo() {
    console.log(await timeSince(new Date(parseInt(props.company.time_posted))));
    setTimeAgo(await timeSince(new Date(parseInt(props.company.time_posted))));

    let el = props.company.eligible_colleges;
    let elt = "";

    for (let i = 0; i < el.length; i++) {
      if (i != el.length - 1) elt = elt + el[i] + ", ";
      else elt = elt + el[i];
    }

    console.log(elt);
    setEcc(elt);
    let ey = props.company.eligible_years;
    let eyt = "";

    for (let i = 0; i < ey.length; i++) {
      let y = "";

      if (ey[i] == 1) y = "1st";
      else if (ey[i] == 2) y = "2nd";
      else if (ey[i] == 3) y = "3rd";
      else if (ey[i] == 4) y = "4th";
      else if (ey[i] == 5) y = "Mtech 1st";
      else y = "Mtech 2nd";

      if (i != ey.length - 1) eyt = eyt + y + " , ";
      else eyt = eyt + y;
    }

    console.log(eyt);
    setEyy(eyt);
    let eb = props.company.eligible_branches;
    let ebt = "";

    for (let i = 0; i < eb.length; i++) {
      if (i != eb.length - 1) ebt = ebt + eb[i] + ", ";
      else ebt = ebt + eb[i];
    }

    setEbb(ebt);
    console.log(ebt);
  }
  React.useEffect(() => {
    calcInfo();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {openForm && props.company ? (
          <CreateFormUI
            company={props.company}
            registerModalHandler={() => {
              setOpenForm(!openForm);
            }}
          />
        ) : null}
        {edit ? (
          <UpdateUI
            name={props.company.name}
            ctc={props.company.ctc}
            type={props.company.type}
            el={props.company.eligible_branches}
            t={props.company.tentative_interview_dates}
            mt={props.company.min_in_ten}
            mtw={props.company.min_in_twelve}
            max={props.company.max_year_education_gap}
            ba={props.company.active_backlogs_allowed}
            hba={props.company.history_backlogs_allowed}
            cgpa={props.company.min_cgpa}
            gender={props.company.gender}
            desc={props.company.description}
            id={props.company.id}
            jds={props.company.jds}
            toggleModel={() => {
              setEdit(!edit);
            }}
            data={props.company}
          />
        ) : null}
        <AppBar
          sx={{ position: "relative", backgroundColor: "#017E7E" }}
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
        </AppBar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "20%" }}>
            <img
              alt={props.company.name}
              style={{ width: "50px", height: "auto", borderRadius: "10px" }}
              src={props.company.logo}
            />
          </div>
          <div style={{ width: "70%" }}>
            <h4
              style={{ marginTop: "5px", color: "black", marginBottom: "0px" }}
            >
              {props.company.name}
            </h4>
            <h5 style={{ marginTop: "0px", color: "black", fontWeight: 400 }}>
              {props.company.type}
            </h5>
          </div>
          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-10px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            <h5
              style={{
                marginTop: "0px",
                fontWeight: 500,
                fontSize: "12px",
              }}
            >
              Posted {timeAgo} ago
            </h5>
          </div>
          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-5px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <WorkIcon style={{ marginTop: "0px", marginRight: "10px" }} />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Package : {props.company.ctc} LPA
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <AccountBalanceIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Eligible Colleges : {ecc}
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <AccountCircleIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}> Eligible Years : {eyy}</span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <CategoryIcon style={{ marginTop: "0px", marginRight: "10px" }} />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Eligible Branches : {ebb}
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <AccessTimeIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Tentative Interview Date :{" "}
                {props.company.tentative_interview_dates.substr(0, 15)}
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <DomainVerificationIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Minimum CGPA : {props.company.min_cgpa} Pointer
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>

        {props.company.gender ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "-6px",
            }}
          >
            <div style={{ width: "5%" }}></div>
            <div style={{ width: "90%" }}>
              {" "}
              <p
                style={{
                  marginTop: "0px",
                  fontSize: "15px",
                  fontWeight: 100,
                  display: "flex",
                }}
              >
                <DomainVerificationIcon
                  style={{ marginTop: "0px", marginRight: "10px" }}
                />
                <span style={{ marginTop: "2px" }}>
                  {" "}
                  {props.company.gender == 1
                    ? "Female Candidates Only"
                    : "Male Candidates Only"}
                </span>
              </p>
            </div>

            <div style={{ width: "5%" }}></div>
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <DomainVerificationIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Minimum in 10th : {props.company.min_in_ten}%
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <DomainVerificationIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Minimum in 12th : {props.company.min_in_twelve}
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <DomainVerificationIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Max Year Education Gap : {props.company.max_year_education_gap}
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <DomainVerificationIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}>
                {" "}
                Active backlogs are{" "}
                {props.company.active_backlogs_allowed ? "" : "not "} allowed
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-6px",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "90%" }}>
            {" "}
            <p
              style={{
                marginTop: "0px",
                fontSize: "15px",
                fontWeight: 100,
                display: "flex",
              }}
            >
              <DomainVerificationIcon
                style={{ marginTop: "0px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "2px" }}>
                {" "}
                History of backlogs are{" "}
                {props.company.history_backlogs_allowed ? "" : "not "} allowed
              </span>
            </p>
          </div>

          <div style={{ width: "5%" }}></div>
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "-10px",
          }}
        >
          <div style={{ width: "28%" }}></div>
          <div style={{ width: "40%" }}>
            {" "}
            {props.company.jds && props.company.jds.length > 0 ? (
              <a
                href={props.company.jds[0]}
                target="_blank"
                style={{ marginTop: "9px", color: "#017E7E" }}
              >
                View JD
              </a>
            ) : null}
          </div>
          <div style={{ width: "30%", marginTop: "5px" }}></div>
          <div style={{ width: "5%" }}></div>
        </div> */}
        <button
          onClick={() => {
            setEdit(true);
          }}
        >
          edit
        </button>
        <br />
        <button
          onClick={() => {
            setOpenForm(true);
          }}
        >
          create form
        </button>
      </Dialog>
    </div>
  );
}
