import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Tick.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Paper } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { PanToolSharp } from "@mui/icons-material";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const whatsappClick = () => {
    console.log(props.company.name);
    const message = `
    Company Name : ${props.company.name}
    
Package : ${props.company.ctc} LPA
Eligible Colleges : ${props.ecc}
Eligible Years : ${props.eyy}
Eligible Branches : ${props.ebb}
Tentative Interview Date : ${props.company.tentative_interview_dates.substr(
      0,
      15
    )}
Minimum CGPA : ${props.company.min_cgpa} Pointer
${props.company.gender == 1 ? "Female Candidates Only" : "Male Candidates Only"}
Minimum in 10th : ${props.company.min_in_ten}
Minimum in 12th : ${props.company.min_in_twelve}
Max Year Education Gap : ${props.company.max_year_education_gap}
Active backlogs are ${
      props.company.active_backlogs_allowed ? "" : "not "
    } allowed
History of backlogs are ${
      props.company.history_backlogs_allowed ? "" : "not "
    } allowed
${
  props.company.jds && props.company.jds.length > 0
    ? "JD - " + props.company.jds[0]
    : ""
}

Apply here - ${props.link}
 
Description :  ${props.company.description}
    `;
    const apiUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;

    window.open(apiUrl);
  };

  const emailClick = () => {
    const recipients = "jagannathrkreal@gmail.com,4ni19is038_b@nie.ac.in"; // Replace with the email addresses of the recipients
    const subject = props.company.name + " - Campus Placement";
    const body = `    
Package : ${props.company.ctc} LPA
Eligible Colleges : ${props.ecc}
Eligible Years : ${props.eyy}
Eligible Branches : ${props.ebb}
Tentative Interview Date : ${props.company.tentative_interview_dates.substr(
      0,
      15
    )}
Minimum CGPA : ${props.company.min_cgpa} Pointer
${props.company.gender == 1 ? "Female Candidates Only" : "Male Candidates Only"}
Minimum in 10th : ${props.company.min_in_ten}
Minimum in 12th : ${props.company.min_in_twelve}
Max Year Education Gap : ${props.company.max_year_education_gap}
Active backlogs are ${
      props.company.active_backlogs_allowed ? "" : "not "
    } allowed
History of backlogs are ${
      props.company.history_backlogs_allowed ? "" : "not "
    } allowed
${
  props.company.jds && props.company.jds.length > 0
    ? "JD - " + props.company.jds[0]
    : ""
}

Apply here - ${props.link}
 
Description :  ${props.company.description}
    `;
    const apiUrl = `mailto:${recipients}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(apiUrl);
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Form has been created</DialogTitle>
        <DialogContent>
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            style={{ marginTop: "0px" }}
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <h4 style={{ fontWeight: 500 }}>
            Share it with {copied ? "(copied)" : null}
          </h4>
          <div style={{ display: "flex", justifyContent: "left" }}>
            <WhatsAppIcon
              style={{
                fontSize: "50px",
                color: "white",
                backgroundColor: "#1BD741",
                borderRadius: "8px",
              }}
              onClick={whatsappClick}
            />
            <MailIcon
              style={{
                fontSize: "65px",
                color: "#EA4335",
                borderRadius: "8px",
                marginLeft: "20px",
                marginTop: "-8px",
              }}
              onClick={emailClick}
            />
            <ContentCopyIcon
              style={{
                fontSize: "55px",
                color: "#7F7F7F",
                borderRadius: "8px",
                marginLeft: "20px",
                marginTop: "-3px",
              }}
              onClick={() => {
                navigator.clipboard.writeText(props.link);
                setCopied(true);
              }}
            />
          </div>
          {/* <DialogContentText id="alert-dialog-description">
            Copy the URL ({props.link})
          </DialogContentText> */}
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              props.handlerClose();
            }}
            autoFocus
            style={{ color: "#017E7E", fontWeight: 700, marginTop: "-10px" }}
            size="large"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
