import { Typography } from '@mui/material';


import { AddOutlined } from '@mui/icons-material';

import { MenuLayout } from '../shared/layout/MenuLayout';

import { AspectosView } from '../app/pages/full-layout-page/evaluacionDocente/aspectos';
import { PreguntaView } from '../app/pages/full-layout-page/evaluacionDocente/preguntas';
import { LogoView } from './LogoView';

import { RespuestaWiew } from '../app/pages/full-layout-page/evaluacionDocente/opciones_respuestas/RespuestaWiew';
import { EncuestaView } from '../app/pages/full-layout-page/evaluacionDocente/encuestas';






export const MenusGeneralSist = () => {
  return (

  
    <MenuLayout>
         {/* <Typography>Aliquip nulla excepteur tempor nostrud adipisicing in aliquip officia Lorem incididunt duis eiusmod laborum eiusmod. Labore et do irure non excepteur irure esse. Excepteur id incididunt id enim voluptate incididunt laborum pariatur do eu velit. Ullamco deserunt minim voluptate incididunt. Sint incididunt et laboris ipsum officia esse elit magna incididunt.</Typography> */}
    

    {/* <ModalAsp/> */}
    {/* <AspectosView/> */}
    {/* <PreguntaView/> */}
    {/* <Edwin/> */}
    {/* <LogoView/> */}
    {/* <RespuestaWiew/> */}
    <EncuestaView/>
  
    {/* <IconButton
    size='large'
    sx={{
      color:'white',
      backgroundColor:'primary.main',
      ':hover':{backgroundColor:'primary.main', opacity:0.9},
      position:'fixed',
      right:50,
      bottom:50
    }}
    >
    <AddOutlined sx={{fontSize:30}}/>
    </IconButton> */}
    </MenuLayout> 
    
   
     
    
    
    
  )
}
