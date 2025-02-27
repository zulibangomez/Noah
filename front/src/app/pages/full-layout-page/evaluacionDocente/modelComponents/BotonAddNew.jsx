import { useSelector } from "react-redux"
import { useUiStoreAsp } from "../../../../../hooks"
import { useAspectoStore } from "../../../../../app/pages/full-layout-page/evaluacionDocente/aspectos/services/useAspectoStore";
import { Grid,  Button, Box, Fab } from "@mui/material"
import { AddOutlined } from "@mui/icons-material";
import ControlPointSharpIcon from '@mui/icons-material/ControlPointSharp';
import { useEffect } from "react";
import { useEncuestaStore } from "../encuestas";
//import { FormAspectoModal } from "../aspectos";

export const BotonAddNew = () => {
    const {openDateModal}=useUiStoreAsp();
    const{setActivarEvent}=useAspectoStore();
    const{setActivarEventEncuesta}=useEncuestaStore()
    const handleclickNew = () => {
      console.log("Abriendo modal...");
      setActivarEvent(null);
      setActivarEventEncuesta(null);
      openDateModal();
  };

  return (

    
    <Box
    display="flex"
    justifyContent="flex-end" // Alinea a la derecha
    alignItems="center" // Centra verticalmente
    sx={{ width: "100%", paddingRight: 2 }} // Asegura que ocupe todo el ancho disponible
    >
    <Fab
    color="success" // Usa "primary" o personaliza con theme
    size="medium" // "small", "medium" o "large"
    onClick={handleclickNew}
    sx={{
      width: 56, // Tamaño estándar de un FAB mediano
      height: 56, 
      minWidth: 56,
      borderRadius: "50%", // Asegura que siempre sea redondo
      boxShadow: 3, // Agrega una ligera sombra
    }}
  >
    <AddOutlined fontSize="medium" /> {/* Tamaño adecuado para el icono */}
  </Fab>
    
  
    </Box>
  )
}
