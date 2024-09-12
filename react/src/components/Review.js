import * as React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Review({ leadData }) {
  return (
    <Stack spacing={2}>
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalles del alumno
          </Typography>
          <Grid container>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Nombre
              </Typography>
              <Typography variant="body2">{leadData.full_name}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Dirección
              </Typography>
              <Typography variant="body2">{leadData.address}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Teléfono
              </Typography>
              <Typography variant="body2">{leadData.phone}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Correo Electrónico
              </Typography>
              <Typography variant="body2">{leadData.email}</Typography>
            </Stack>
          </Grid>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalles de la materia
          </Typography>
          <Grid container>
          <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Carrera
              </Typography>
              <Typography variant="body2">{leadData.career_name}</Typography>
            </Stack>
          <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Materia
              </Typography>
              <Typography variant="body2">{leadData.subject.name}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Duración
              </Typography>
              <Typography variant="body2">{leadData.subject.course_duration} semana(s)</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Veces cursada
              </Typography>
              <Typography variant="body2">{leadData.times_taken}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Año de Inscripción
              </Typography>
              <Typography variant="body2">{leadData.enrollment_year}</Typography>
            </Stack>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
