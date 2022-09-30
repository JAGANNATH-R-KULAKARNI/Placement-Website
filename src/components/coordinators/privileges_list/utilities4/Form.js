import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import { InsertEmoticon } from "@mui/icons-material";

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
        style={{ width: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{
              width: "50%",
              flexShrink: 0,
              fontSize: "12px",
              marginTop: "5px",
              maxWidth: "50%",
            }}
          >
            Name bro{" "}
          </Typography>
          <span
            style={{
              fontSize: "10px",
              marginLeft: "20px",
              float: "right",
              marginRight: "30px",
              width: "50%",
              maxWidth: "50%",
            }}
          >
            <Chip
              label={"active"}
              color="success"
              //   style={{
              //     backgroundColor:
              //       props.data.companies.id == 0
              //         ? "black"
              //         : colors[props.data.companies.type],
              //   }}
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
            {/* <DetailsUI ctc={props.data.usn} /> */}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
