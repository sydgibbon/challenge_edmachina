import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function LeadForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="full_name" required>
          Nombre Completo
        </FormLabel>
        <OutlinedInput
          id="full_name"  
          name="full_name"
          type="full_name"
          placeholder="Sydney Gibbon"
          autoComplete="shipping full-name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Dirección
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="9 de Julio 832 9D"
          autoComplete="shipping address-line1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="phone" required>
          Número de Teléfono
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="phone"
          placeholder="+5492804539160"
          autoComplete="shipping phone"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required>
          Correo Electrónico
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="sydneymackgibbon@gmail.com"
          autoComplete="shipping email"
          required
          size="small"
        />
      </FormGrid>
    </Grid>
  );
}
