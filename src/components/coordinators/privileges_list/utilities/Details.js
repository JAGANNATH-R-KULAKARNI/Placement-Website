import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogUI from "./Update";
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
                  {props.ctc}{" "}
                </span>{" "}
                LPA
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
              name={props.name1}
              ctc={props.ctc}
              type={props.type}
              el={props.el}
              t={props.t}
              mt={props.mt}
              mtw={props.mtw}
              max={props.max}
              ba={props.ba}
              hba={props.hba}
              cgpa={props.cgpa}
              gender={props.gender}
              desc={props.desc}
              id={props.id}
              yr={props.yr}
              jds={props.jds}
              toggleModel={toggleModel}
            />
          ) : null}
        </Grid>
      ))}
    </Grid>
  );
}
