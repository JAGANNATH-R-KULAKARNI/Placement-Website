import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CSVLink } from "react-csv";

export default function VerticalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    {
      label: "Generate Report",
      description: `Make sure you have checked the required fields. Generate the data. It might take 1 - 60 seconds.`,
    },
    {
      label: "Download CSV",
      description: `Download the students data applied for company ${props.data.company.name}. File will be of CSV format`,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {index === steps.length - 1 && props.csvReport ? (
                    <CSVLink
                      {...props.csvReport}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          setTimeout(() => {
                            handleReset();
                          }, 1000);
                        }}
                        sx={{
                          mt: 1,
                          mr: 1,
                          backgroundColor: "#017E7E",
                          textTransform: "capitalize",
                          borderRadius: "20px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }}
                        disableElevation
                      >
                        Download
                      </Button>
                    </CSVLink>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (!props.getReport()) return;

                        handleNext();
                      }}
                      sx={{
                        mt: 1,
                        mr: 1,
                        backgroundColor: "#017E7E",
                        textTransform: "capitalize",
                        borderRadius: "20px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      }}
                      disableElevation
                    >
                      Generate
                    </Button>
                  )}
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{
                      mt: 1,
                      mr: 1,
                      color: "#017E7E",
                      textTransform: "capitalize",
                    }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <div style={{ height: "50px" }}></div>
    </Box>
  );
}
