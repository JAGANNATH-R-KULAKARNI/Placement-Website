import * as React from "react";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import HighlighterUI from "./Highlighter";
import { NoBackpackSharp } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

// var Highlight = require("react-highlighter");

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({
  width: "95%",
  // backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  color: theme.palette.mode === "light" ? "#000" : "#fff",
  height: "50px",
  borderRadius: "5px",
  border: "1px solid black",
  paddingLeft: "5%",
  fontSize: "17px",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: "93%",
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 300,
  marginLeft: "1%",
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    // backgroundColor: "#C38F70",
    // color: "#045D5D",
    color: "black",
    cursor: "pointer",
    fontWeight: 700,
  },
  "& li": {
    marginLeft: "10px",
    fontWeight: 400,
    fontSize: "17px",
    paddingTop: "7px",
  },
  "& li:active": {
    // backgroundColor: "#045D5D",
    backgroundColor: "black",
    color: "white",
  },
  fontSize: "14px",
  paddingBottom: "10px",
}));

export default function UseAutocomplete(props) {
  const [val, setVal] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const m1 = useMediaQuery("(min-width:450px)");

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    value,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    // options: props.items,
    options: props.data,
    getOptionLabel: (option) => option.name,
  });

  React.useEffect(() => {
    // props.setSres(focused);
    if (value) props.searchResultsHandler(value.name);
    console.log("clicked");
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [value, focused]);

  return (
    <div
      style={{
        zIndex: 13,
        position: "relative",
        width: "100%",
      }}
    >
      <div {...getRootProps()}>
        <div
          onChange={(e) => {
            setVal(e.target.value);
            // if (e.target.value.length >= 3) {
            //   props.searchResultsHandler(e.target.value);
            //   console.log("Calling");
            // } else {
            //   // props.setKeyword(e.target.value);
            //   console.log("Baby words");
            // }
          }}
          style={{
            width: "100%",
            // marginLeft: "-1.5%",
          }}
        >
          <Input {...getInputProps()} disabled={loading} />
        </div>
        {focused ||
        groupedOptions.length > 0 ||
        (value && value.name.length > 0) ? null : (
          <div
            style={{
              marginTop: "-38.5px",
              marginLeft: "20px",
              display: "flex",
            }}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <SearchIcon />
            )}

            <span
              style={{
                fontWeight: 400,
                marginLeft: "10px",
                marginTop: "-2px",
                color: "#999999",
              }}
            >
              {" "}
              Search For Information....{" "}
            </span>
          </div>
        )}
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li
              {...getOptionProps({ option, index })}
              style={{
                marginBottom: "7px",
                marginLeft: "4.5%",
                marginTop: index == 0 ? "10px" : "0px",
              }}
            >
              {/* <Highlight search={val}>{option.name.substr(0, 50)}</Highlight> */}

              {option.name.toLowerCase().search(val.toLowerCase()) != -1
                ? [
                    option.name.length > (m1 ? 50 : 30)
                      ? "......" +
                        option.name.substr(
                          option.name.toLowerCase().search(val.toLowerCase()) -
                            (m1 ? 30 : 15),
                          m1 ? 30 : 15
                        )
                      : option.name.substr(
                          0,
                          option.name.toLowerCase().search(val.toLowerCase())
                        ),
                    // option.name[
                    //   option.name.toLowerCase().search(val.toLowerCase()) - 1
                    // ] == " " ? (
                    //   <span> &nbsp;</span>
                    // ) : (
                    //   <span> </span>
                    // ),
                    <span style={{ fontWeight: 700, color: "black" }}>
                      {option.name.substr(
                        option.name.toLowerCase().search(val.toLowerCase()),
                        val.length
                      )}
                    </span>,
                    // option.name.toLowerCase().search(val.toLowerCase()) +
                    //   val.length <
                    //   option.name.length &&
                    // option.name[
                    //   option.name.toLowerCase().search(val.toLowerCase()) +
                    //     val.length
                    // ] == " " ? (
                    //   <span> &nbsp;</span>
                    // ) : (
                    //   <span> </span>
                    // ),
                    option.name.length > (m1 ? 50 : 30)
                      ? option.name.substr(
                          option.name.toLowerCase().search(val.toLowerCase()) +
                            val.length,
                          15
                        ) + "..."
                      : option.name.substr(
                          option.name.toLowerCase().search(val.toLowerCase()) +
                            val.length
                        ),
                  ]
                : option.name.substr(0, 50) +
                  (option.name.length > 50 ? "..." : "")}
            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}
