import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";
import { fetchSubjects, fetchCareers } from '../services/api';

// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";

const SubjectContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: "1px solid ",
  borderColor: theme.palette.divider,
  background:
    "linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)",
  boxShadow: "0px 4px 8px hsla(210, 0%, 0%, 0.05)",
  [theme.breakpoints.up("xs")]: {},
  [theme.breakpoints.up("sm")]: {},
  ...theme.applyStyles("dark", {
    background:
      "linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)",
    boxShadow: "0px 4px 8px hsl(220, 35%, 0%)",
  }),
}));

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function SubjectForm({leadData, setLeadData}) {
  const [career, setCareer] = React.useState("");
  const [careerList, setCareerList] = React.useState([]);

  const [subject, setSubject] = React.useState("");
  const [subjectEnabled, setSubjectEnabled] = React.useState(false);
  const [subjectList, setSubjectList] = React.useState([]);

  const [timesTaken, setTimesTaken] = React.useState("");
  const [year, setYear] = React.useState("");

  const handleCareerChange = (event) => {
    setCareer(event.target.value);
    getSubjects(event.target.value);
    setSubjectEnabled(true);
    setLeadData(
      {...leadData, career_name: careerList.filter((career)=>career.id === event.target.value)[0].name}
    );
    
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
    setLeadData(
      {...leadData, subject: subjectList.filter((subject)=>subject.id === event.target.value)[0]}
    );
  };

  const handleTimesTakenChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setTimesTaken(value);
      setLeadData(
        {...leadData, times_taken: event.target.value}
      );
    }
  };

  const handleYearChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setYear(value);
      setLeadData(
        {...leadData, enrollment_year: event.target.value}
      );
    }
  };

  const getSubjects = async (careerId) => {
    try {
      const data = await fetchSubjects();
      setSubjectList(data.filter((subject) => subject.career_id === careerId));
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    }
  };
  
  const getCareers = async () => {
    try {
      const data = await fetchCareers();
      setCareerList(data);
    } catch (error) {
      console.error('Failed to fetch Careers:', error);
    }
  };
  useEffect(() => {
    getCareers();
  }, []);

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <SubjectContainer>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <SubjectRoundedIcon
                sx={{
                  color: "text.secondary",
                }}
              />
            </Box>
            {/* <AddCircleRoundedIcon sx={{ color: "text.secondary" }} />  */}
            {/* Para cargar multiples materias coming soon  */}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormGrid sx={{ minWidth:'50%'}}>
              <FormLabel htmlFor="career" required>
                Carrera
              </FormLabel>
              <Select
                size="small"
                labelId="theme-select-label"
                id="theme-select"
                value={career}
                onChange={handleCareerChange}
                required
              >
                {careerList.map((career) => (
                  <MenuItem key={career.id} value={career.id}>{career.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>
            <FormGrid sx={{ minWidth:'50%' }}>
              <FormLabel htmlFor="timesTaken" required>
                Materia
              </FormLabel>
              <Select
                disabled={!subjectEnabled}
                size="small"
                labelId="theme-select-label"
                id="theme-select"
                value={subject}
                label="Design Language"
                onChange={handleSubjectChange}
              >
                {subjectList.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="times-taken" required>
                Veces cursada
              </FormLabel>
              <OutlinedInput
                id="times-taken"
                autoComplete="times-taken"
                placeholder="5"
                required
                size="small"
                value={timesTaken}
                onChange={handleTimesTakenChange}
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="enrollment-year" required>
                Año de Inscripción
              </FormLabel>
              <OutlinedInput
                id="enrollment-year"
                autoComplete="enrollment-year"
                placeholder="2020"
                required
                size="small"
                value={year}
                onChange={handleYearChange}
              />
            </FormGrid>
          </Box>
        </SubjectContainer>
      </Box>
    </Stack>
  );
}
