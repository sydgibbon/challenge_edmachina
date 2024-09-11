import * as React from "react";

import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MuiCard from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";

// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";

const Card = styled(MuiCard)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.divider,
  width: "100%",
  "&:hover": {
    background:
      "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)",
    borderColor: "primary.light",
    boxShadow: "0px 2px 8px hsla(0, 0%, 0%, 0.1)",
    ...theme.applyStyles("dark", {
      background:
        "linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)",
      borderColor: "primary.dark",
      boxShadow: "0px 1px 8px hsla(210, 100%, 25%, 0.5) ",
    }),
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: theme.palette.primary.light,
        ...theme.applyStyles("dark", {
          borderColor: theme.palette.primary.dark,
        }),
      },
    },
  ],
}));

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

export default function SubjectForm() {
  const [career, setCareer] = React.useState(1);
  const [careerList, setCareerList] = React.useState([
    { id:1, name: "Jugador de LoL" },
    { id:2, name: "Leñador de Bonsai" },
  ]);

  const [subject, setSubject] = React.useState("AddCircle");
  const [subjectList, setSubjectList] = React.useState([
    {
      name: "Griefing 1",
      course_duration: 20,
      enrollment_year: 2020,
      times_taken: 10,
      career_id: 1,
      id: 1,
    },
    {
      name: "Flaming Avanzado",
      course_duration: 30,
      enrollment_year: 2023,
      times_taken: 5,
      career_id: 1,
      id: 2,
    },
    {
      name: "Micro/Macro para Bronces",
      course_duration: 25,
      enrollment_year: 2022,
      times_taken: 8,
      career_id: 1,
      id: 3,
    },
    {
      name: "Zen y el Arte del Bonsai",
      course_duration: 15,
      enrollment_year: 2021,
      times_taken: 2,
      career_id: 2,
      id: 4,
    },
    {
      name: "Desramado Extremo",
      course_duration: 40,
      enrollment_year: 2024,
      times_taken: 1,
      career_id: 2,
      id: 5,
    },
  ]);

  const [timesTaken, setTimesTaken] = React.useState("");
  const [year, setYear] = React.useState("");

  const handleCareerChange = (event) => {
    setCareer(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleTimesTakenChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setTimesTaken(value);
    }
  };

  const handleYearChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setYear(value);
    }
  };

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
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-number" required>
                Carrera
              </FormLabel>
              <Select
                size="small"
                labelId="theme-select-label"
                id="theme-select"
                value={career}
                onChange={handleCareerChange}
              >
                {careerList.map((career) => (
                  <MenuItem key={career.id} value={career.id}>{career.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="timesTaken" required>
                Materia
              </FormLabel>
              <Select
                size="small"
                labelId="theme-select-label"
                id="theme-select"
                value={"Jugador de LoL"}
                label="Design Language"
              >
                {subjectList.map((subject) => (
                  <MenuItem key={subject.name} value={subject.name}>{subject.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-name" required>
                Veces cursada
              </FormLabel>
              <OutlinedInput
                id="card-name"
                autoComplete="card-name"
                placeholder="5"
                required
                size="small"
                value={timesTaken}
                onChange={handleTimesTakenChange}
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-expiration" required>
                Año de Inscripción
              </FormLabel>
              <OutlinedInput
                id="card-expiration"
                autoComplete="card-expiration"
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
