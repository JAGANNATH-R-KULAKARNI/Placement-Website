import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { PropaneRounded } from "@mui/icons-material";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [control, setControl] = React.useState(false);

  const loading = open && options.length === 0;
  const searchRef = React.useRef();

  React.useEffect(() => {
    if (!control) {
      setControl(true);
      searchRef.current.value = props.company_name;
    }
  }, []);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...props.companies]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      ref={searchRef}
      onChange={(e) => {
        if (e.target.innerHTML.substr(0, 5) === "<path")
          props.searchCompanyResults("Not Placed");
        else props.searchCompanyResults(e.target.innerHTML);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.text}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
