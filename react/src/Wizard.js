import * as React from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LeadForm from "./components/LeadForm";
import getWizardTheme from "./theme/getWizardTheme";
import Info from "./components/Info";
import SubjectForm from "./components/SubjectForm";
import Review from "./components/Review";
import WizardFrame from "./WizardFrame";
import { postLead, postLeadSubject } from "./services/api";
import { studentSchema, subjectSchema } from "./forms/leadForm";
import { Collapse } from "@mui/material";

const steps = [
  "Registra tus datos",
  "Selecciona tu materia",
  "Revisa tu information",
];

export default function Wizard() {
  const [leadData, setLeadData] = useState({
    lead_id: "",
    full_name: "",
    address: "",
    email: "",
    phone: "",
    career_name: "",
    subject: {},
    times_taken: 0,
    enrollment_year: 0,
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <LeadForm leadData={leadData} setLeadData={setLeadData} />;
      case 1:
        return <SubjectForm leadData={leadData} setLeadData={setLeadData} />;
      case 2:
        return <Review leadData={leadData} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const WizardTheme = createTheme(getWizardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const [axiosError, setAxiosError] = React.useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("TETETESTING");

  const leadSchemas = [studentSchema, subjectSchema];

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const handleNext = async () => {
    try {
      setShowAlert(false);
      await leadSchemas[activeStep].validate(leadData);
      setActiveStep(activeStep + 1);
    } catch (e) {
      setAlertContent(e.message);
      setShowAlert(true);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = async () => {
    try {
      let studentObj = {
        full_name: leadData.full_name,
        address: leadData.address,
        phone: leadData.phone,
        email: leadData.email,
      };

      let resultLead = await postLead(studentObj);

      let leadSubjectObj = {
        lead_id: resultLead.id,
        subject_id: leadData.subject.id,
        times_taken: leadData.times_taken,
        enrollment_year: leadData.enrollment_year,
      };
      let resultLeadSubject = await postLeadSubject(leadSubjectObj);
      setLeadData({ ...leadData, lead_id: resultLeadSubject.lead_id });

      setActiveStep(activeStep + 1);
    } catch (e) {
      setAxiosError(e.response.data.detail);
      setActiveStep(activeStep + 1);
    }
  };
  return (
    <WizardFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? WizardTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 5,
              px: 10,
              gap: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 0,
                width: "100%",
                maxWidth: 500,
                bgcolor: "primary.main",
                borderRadius: "1",
                marginBottom: "20px",
              }}
            >
              <img src="/EDMachina_blanco.png" alt="EDMachina_blanco" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Info totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"} />
            </Box>
          </Grid>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "start",
              pt: { xs: 6, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{ width: "100%", height: 40 }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-child": { pl: 0 },
                        ":last-child": { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              <Collapse in={showAlert}>
                <Alert variant="outlined" severity="error">
                  {alertContent}
                </Alert>
              </Collapse>
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                      "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{
                        ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                axiosError !== "" ? (<Stack spacing={2} useFlexGap>
                  <Typography variant="h1">🙅🏻</Typography>
                  <Typography variant="h5">Algo salió mal!</Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>{axiosError}
                  </Typography>
                  <Button
                    onClick={() => {
                      window.location.reload();
                    }}
                    variant="contained"
                    sx={{
                      alignSelf: "middle",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Intentar nuevamente
                  </Button>
                </Stack>) : (<Stack spacing={2} useFlexGap>
                  <Typography variant="h1">👍🏻</Typography>
                  <Typography variant="h5">Gracias por registrarte!</Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Tu ID de alumno es
                    <strong>&nbsp;#{leadData.lead_id}</strong>. Todavía quedan
                    muchas cosas por mejorar tanto en front como en back pero
                    creo que lo postulado demuestra mi conocimiento general.
                    Saludos!
                  </Typography>
                  <Button
                    onClick={() => {
                      window.location.reload();
                    }}
                    variant="contained"
                    sx={{
                      alignSelf: "middle",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Registrar nuevo alumno
                  </Button>
                </Stack>)
                
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box
                    sx={[
                      {
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: "end",
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: "60px",
                      },
                      activeStep !== 0
                        ? { justifyContent: "space-between" }
                        : { justifyContent: "flex-end" },
                    ]}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        Anterior
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: "flex", sm: "none" } }}
                      >
                        Anterior
                      </Button>
                    )}
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={handleSubmit}
                        sx={{ width: { xs: "100%", sm: "fit-content" } }}
                      >
                        Registrarme
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={handleNext}
                        sx={{ width: { xs: "100%", sm: "fit-content" } }}
                      >
                        Siguiente
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </WizardFrame>
  );
}
