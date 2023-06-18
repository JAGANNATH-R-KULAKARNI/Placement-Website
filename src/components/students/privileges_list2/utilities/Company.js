import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import { InsertEmoticon } from "@mui/icons-material";
import DetailsUI from "./Details";

const colors = {
  Mass: "#6F7274",
  Core: "#FFA500",
  Dream: "#2E7D32",
  "Open Dream": "#FFD700",
};

export default function CompanyList(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // React.useEffect(() => {
  //   console.log("PROPS DATA BRO");
  //   console.log(props.data);
  // }, []);

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
              width: "58%",
              flexShrink: 0,
              fontSize: "15px",
              marginTop: "5px",
            }}
          >
            {props.data.name}{" "}
          </Typography>
          <span
            style={{
              fontSize: "12px",
              marginLeft: props.data.type == "Open Dream" ? "0px" : "30px",
              float: "right",
              marginRight: props.data.type == "Open Dream" ? "60px" : "30px",
            }}
          >
            <Chip
              label={props.data.type.length == 0 ? "--------" : props.data.type}
              color="success"
              style={{
                backgroundColor:
                  props.data.type.length == 0
                    ? "black"
                    : colors[props.data.type],
              }}
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
            <DetailsUI
              ctc={props.data.ctc}
              name1={props.data.name}
              type={props.data.type}
              el={props.data.eligible_branches}
              t={props.data.tentative_interview_dates}
              mt={props.data.min_in_ten}
              mtw={props.data.min_in_twelve}
              max={props.data.max_year_education_gap}
              ba={props.data.active_backlogs_allowed}
              hba={props.data.history_backlogs_allowed}
              cgpa={props.data.min_cgpa}
              gender={props.data.gender}
              desc={props.data.description}
              id={props.data.id}
              jds={props.data.jds}
              data={props.data}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
