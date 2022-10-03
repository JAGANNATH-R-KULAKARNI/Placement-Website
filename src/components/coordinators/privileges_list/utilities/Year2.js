import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["CSE", "ISE", "ECE", "EEE", "ME", "CIVIL", "IP", "MCA", "MTECH"];
const years = [
  {
    year: 1,
    text: "First Year",
  },
  {
    year: 2,
    text: "Second Year",
  },
  {
    year: 3,
    text: "Third Year",
  },
  {
    year: 4,
    text: "Fourth Year",
  },
  {
    year: 5,
    text: "Mtech First Year",
  },
  {
    year: 6,
    text: "Mtech Second Year",
  },
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [initialize, setInitialize] = React.useState(false);

  React.useEffect(() => {
    if (!initialize) {
      setInitialize(true);

      setPersonName([...props.el]);
      console.log(props.el);

      //setInitialize(false);
    }
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    console.log(typeof value === "string" ? value.split(",") : value);
    props.setEligibleYears(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl style={{ width: "290px" }}>
        <InputLabel id="demo-multiple-chip-label">
          Eligible Engineering Years
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip sjsjsjsjjsjgyuua"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Eligible Engineering Years"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={years[value - 1].text} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {years.map((year) => (
            <MenuItem
              key={year}
              value={year.year}
              style={getStyles(year.text, personName, theme)}
            >
              {year.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
