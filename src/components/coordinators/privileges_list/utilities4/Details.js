import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function MoreDetails(props) {
  const m1 = useMediaQuery("(min-width:600px)");

  return (
    <Grid container spacing={2}>
      {[darkTheme].map((theme, index) => (
        <Grid item xs={12} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                display: "flex",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 1,
                borderRadius: "30px",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#541554",
                  color: "white",
                  borderRadius: "15px",
                  fontSize: m1 ? "20px" : "10px",
                }}
                onClick={props.openForm}
              >
                Edit or Download
              </Button>
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
