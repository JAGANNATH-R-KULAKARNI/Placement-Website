import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.data.func();
  };

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Placements"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.data.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            style={{
              color: "#017E7E",
              textTransform: "capitalize",
              fontWeight: 700,
              border: "2px solid #017E7E",
              borderRadius: "20px",
              marginTop: "-10px",
            }}
            size="small"
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
