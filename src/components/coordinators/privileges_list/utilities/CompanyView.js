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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    props.setView(false);
    props.setCompany(null);
  };

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
        <AppBar sx={{ position: "relative" }}>
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
        {props.company.name}
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
