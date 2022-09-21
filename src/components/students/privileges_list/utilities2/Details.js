import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function MoreDetails(props) {
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
              </Item>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#541554",
                  color: "white",
                  borderRadius: "15px",
                }}
              >
                View More Details
              </Button>
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
