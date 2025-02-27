import { Button, Grid } from "@mui/material";
import { useUiStoreAsp } from "../../../../../hooks";
import { useEncuestaStore } from "../encuestas";
import { AddOutlined } from "@mui/icons-material";


export const BotonAddEncuesta = () => {
    const {openDateModal}=useUiStoreAsp();
    const{setActivarEventEncuesta}=useEncuestaStore();
    const handleclickNew = () => {
      console.log("Abriendo modal...");
     
      setActivarEventEncuesta(null);
      openDateModal();
  };

  return (

    
    <Grid
    container 
    justifyContent="flex-end" // Alinea al lado derecho
    alignItems="center" // Centra verticalmente
    >
    <Button variant="contained" color="btnAdd" size="small"  onClick={handleclickNew} startIcon={<AddOutlined />}>
    
    </Button>
    
  
    </Grid>
  )
}