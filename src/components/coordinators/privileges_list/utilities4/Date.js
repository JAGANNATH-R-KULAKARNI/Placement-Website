import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function MaterialUIPickers(props) {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    var date = new Date(newValue["$d"]);

    console.log(newValue["$d"]);
    setValue(newValue);
    console.log(date.getTime());
    props.timeHandler(date.getTime());
    props.timeHandler2(newValue["$d"].toString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          label={props.text}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
