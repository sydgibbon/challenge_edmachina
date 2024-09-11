import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import mesaDeTrabajo from '../docs/images/Mesa-de-trabajo.png'


function Info() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Sigamos conversando
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      Completa el formulario y nos pondremos en contacto contigo para conversar sobre los principales desafíos de tu liga y cómo podemos ayudarte a superarlos (oops, otra vez estoy hablando de LoL?).
      </Typography>
      <Box
              sx={{
                bgcolor:"white",
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 0,
                width: '100%',
                maxWidth: 500,
                borderRadius: '10%',
                marginTop: '10px',
              }}
            >
            <img src={mesaDeTrabajo} alt='mesa-de-trabajo'/>
            </Box>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
