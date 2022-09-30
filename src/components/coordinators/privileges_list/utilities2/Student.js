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
            {props.data.name}{" "}
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
              label={
                props.data.companies.id == 0
                  ? "Not Placed"
                  : props.data.companies.name.substr(0, 11) +
                    (props.data.companies.name.length > 11 ? "..." : "")
              }
              color="success"
              style={{
                backgroundColor:
                  props.data.companies.id == 0
                    ? "black"
                    : colors[props.data.companies.type],
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
            <DetailsUI ctc={props.data.usn} dob={props.data.dob}
             email={props.data.email}
             name1={props.data.name}
             gender={props.data.gender}
             cat={props.data.category}
             t={props.data.tenth_percentage}
             t1={props.data.tenth_board}
             t2={props.data.tenth_passed_year}
             tw={props.data.twelth_percentage}
             tw1={props.data.twelth_board}
             tw2={props.data.twelth_passed_year}
             d={props.data.diplomo_percentage}
             d1={props.data.diplomo_board}
             d2={props.data.diplomo_passed_year}
             br={props.data.branch}
             yr={props.data.year}
             gd={props.data.grades}
             ca={props.data.current_arears}
             cl={props.data.cleared_arears}
             cb={props.data.current_backlogs}
             clb={props.data.cleared_backlogs}
             cgpa={props.data.cgpa}
             credits={props.data.credits}
             ph={props.data.phone_num}
             ph1={props.data.parent_phone_num}
             addr={props.data.home_addr} 
             addr1={props.data.permanent_addr}
             sec={props.data.section}
             companies={props.companies}
             yg={props.data.max_year_education_gap}
             id={props.data.id}
             />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
