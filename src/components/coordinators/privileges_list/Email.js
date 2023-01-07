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
import AnnounceUI from "./Announce";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import BackDropUI from "./utilities3/Backdrop";
//import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import DateUI from "./Date";
import handshakemobile from "../../images/handshakemobile.jpg";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [sending, setSending] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    props.emailModelHandler();
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
         <div>
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
          
          
        <AnnounceUI />
        
      
        </div>
      </Dialog>
    </div>
  );
}
