import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

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
        <DialogTitle id="alert-dialog-title">
          Form for '{props.company}' has been Updated
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Copy the URL ({props.link})
          </DialogContentText>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(props.link);

              setInterval(() => {
                setCopied(true);
              }, 500);

              setInterval(() => {
                handleClose();
                props.handlerClose();
              }, 1000);
            }}
            autoFocus
          >
            {copied ? "Copied" : "Copy the url & Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
