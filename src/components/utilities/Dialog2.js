import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function NotEligible(props) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          {props.messages[0]}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center" }}
          >
            {props.messages[1]}
          </DialogContentText>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "black" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Go to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
