import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const subjects = [
  { name: 'Carrera:', detail: 'Jugador de LoL' },
  { name: 'Materia:', detail: 'Griefing 1' },
  { name: 'Veces cursada:', detail: '5' },
  { name: 'Año de Inscripción:', detail: '2024' },
];

export default function Review() {
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
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {addresses.join(', ')}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalles de la materia
          </Typography>
          <Grid container>
            {subjects.map((subject) => (
              <React.Fragment key={subject.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {subject.name}
                  </Typography>
                  <Typography variant="body2">{subject.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
