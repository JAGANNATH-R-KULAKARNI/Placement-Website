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
  const [control, setControl] = React.useState(false);

  React.useEffect(() => {
    if (!control) {
      setControl(control);
      let date = new Date();
      let d = date.getDate();
      let m = date.getMonth() + 1;
      let y = date.getFullYear();
      let d1 = d;
      let m1 = m;

      if (d / 10 == 0) {
        d1 = "0" + d1;
      }

      if (m1 / 10 == 0) {
        m1 = "0" + m1;
      }

      console.log(y + "-" + m1 + "-" + d1);
      setValue(dayjs(`${y + "-" + m1 + "-" + d1}T21:11:54`));
    }
  }, []);

  const handleChange = (newValue) => {
    let str = newValue["$d"] + "";
    console.log(str);
    props.setIntDate(str);
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileDatePicker
          label="Tentative Interview Date"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
