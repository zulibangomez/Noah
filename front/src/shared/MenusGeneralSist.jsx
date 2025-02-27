import { Stack, Button,Typography, Box } from '@mui/material';


import { AddOutlined } from '@mui/icons-material';

import { MenuLayout } from '../shared/layout/MenuLayout';

import { AspectosView } from '../app/pages/full-layout-page/evaluacionDocente/aspectos';
import { PreguntaView } from '../app/pages/full-layout-page/evaluacionDocente/preguntas';
import { LogoView } from './LogoView';

import { RespuestaWiew } from '../app/pages/full-layout-page/evaluacionDocente/opciones_respuestas/RespuestaWiew';
import { Addcuestionario, EncuestaView } from '../app/pages/full-layout-page/evaluacionDocente/encuestas';
import { ConfiGeneralAs } from '../app/pages/full-layout-page/evaluacionDocente/ConfiGeneralAs';

import { Link } from "react-router-dom";
import { AppTheme } from '../theme';
//import { Button } from 'bootstrap';

export const MenusGeneralSist = () => {
  return (

  
    <nav>
      <Box display="flex" justifyContent="center" sx={{ width: "100%", padding: 2 }}>
      <Stack direction="row" spacing={2}>
      <Button component={Link} to="/" variant="contained" color="primary">
        Inicio
      </Button>
      <Button component={Link} to="/aspectos" variant="contained" color="secondary">
        Aspectos
      </Button>
      <Button component={Link} to="/preguntas" variant="contained" color="success">
        Preguntas
      </Button>
      <Button component={Link} to="/respuestas" variant="contained" color="warning">
        Opciones de respuesta
      </Button>
      <Button component={Link} to="/encuestas" variant="contained" color="primary">
        encuestas
      </Button>
      <Button component={Link} to="/adicion" variant="contained" color="primary">
        encuestas
      </Button>
     
    </Stack>
      </Box>
    
  </nav> 
    
  );
}
{/* <ModalAsp/> */}
    {/* <AspectosView/> */}
    {/* <PreguntaView/> */}
    {/* <ConfiGeneralAs/> */}
    {/* <LogoView/> */}
    {/* <RespuestaWiew/> */}
    {/* <EncuestaView/> */}
    {/* <Addcuestionario/> */}
  