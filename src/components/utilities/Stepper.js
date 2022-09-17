import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import nie from "../images/nie.jpg";
import nie2 from "../images/nie2.jpg";
import nie3 from "../images/nie3.jpg";
import nie4 from "../images/nie4.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const m1 = useMediaQuery("(min-width:600px)");
  const images = [
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath: m1 ? nie : nie2,
    },
    // {
    //   label: "Bird",
    //   imgPath: m1 ? nie3 : nie4,
    // },
    // {
    //   label: "Bali, Indonesia",
    //   imgPath: m1 ? nie : nie2,
    // },
    // {
    //   label: "Goč, Serbia",
    //   imgPath: m1 ? nie3 : nie4,
    // },
  ];
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ width: "100%" }}
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  height: "auto",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
