import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function NotEligible(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          {`You are not eligible for "${props.company.companies.name}" :(`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b> Because, </b>
            <ul>
              {props.messages &&
                props.messages.map((item, index) => {
                  return <li key={index + item}>{item}</li>;
                })}
            </ul>
            <br />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
