import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogUI from "./Dialog";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function MoreDetails(props) {
  const [model, setModel] = React.useState(false);

  const toggleModel = () => {
    setModel(!model);
  };

  return (
    <Grid container spacing={2}>
      {[darkTheme].map((theme, index) => (
        <Grid item xs={12} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 1,
                borderRadius: "30px",
              }}
            >
              <Item
                key={"CTC maga"}
                elevation={1}
                style={{ borderRadius: "15px" }}
              >
                <span style={{ fontWeight: 900, fontSize: "24px" }}>
                  {props.ctc}
                  
                  {" "}
                </span>{" "}
              </Item>
              <Item
                key={"CTC maga"}
                elevation={1}
                style={{ borderRadius: "15px" }}
              >
                <span style={{ fontWeight: 900, fontSize: "24px" }}>
                  {props.dob}
                  
                  {" "}
                </span>{" "}
              </Item>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#541554",
                  color: "white",
                  borderRadius: "15px",
                }}
                onClick={toggleModel}
              >
                View More Details
              </Button>
              
            </Box>
          </ThemeProvider>
          {model ? (
        <DialogUI
          nameD={props.name1}
          emailD={props.email}
          usnD={props.ctc}
          dD={props.dob}
          gD={props.gender}
          cat={props.cat}
          t={props.t}
          t1={props.t1}
          t2={props.t2}
          tw={props.tw}
          tw1={props.tw1}
          tw2={props.tw1}
          d={props.d}
          d1={props.d1}
          d2={props.d2}
          br={props.br}
          yr={props.yr}
          gd={props.gd}
          ca={props.ca}
          cl={props.cl}
          cb={props.cb}
          clb={props.clb}
          sec={props.sec}
          cgpa={props.cgpa}
          credits={props.credits}
          ph={props.ph}
          ph1={props.ph1}
          addr={props.addr}
          addr1={props.addr1}
          companies={props.companies}
          id={props.id}
          toggleModel={toggleModel}
        />
      ) : null}
        </Grid>
      ))}
    </Grid>
  );
}
