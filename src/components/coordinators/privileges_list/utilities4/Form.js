import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import { InsertEmoticon } from "@mui/icons-material";
import DetailsUI from "./Details";

export default function CompanyList(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        key={props.data}
        style={{ minWidth: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{
              width: "50%",
              //   flexShrink: 0,
              fontSize: "12px",
              marginTop: "5px",
              minWidth: "70%",
            }}
          >
            {props.data.company.name.substr(0, 20) +
              (props.data.company.name > 20 ? "..." : "")}
          </Typography>
          <span
            style={{
              fontSize: "10px",
              marginLeft: "0px",
              float: "right",
              width: "50%",
              maxWidth: "50%",
              marginRight: "70px",
            }}
          >
            <Chip
              label={
                props.data.data.start_time <= Date.now() &&
                Date.now() <= props.data.data.end_time
                  ? "active"
                  : "inactive"
              }
              color={
                props.data.data.start_time <= Date.now() &&
                Date.now() <= props.data.data.end_time
                  ? "success"
                  : "error"
              }
            />
          </span>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "11px",
              width: "0%",
              marginLeft: "10%",
              marginTop: "3px",
            }}
          ></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DetailsUI />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
