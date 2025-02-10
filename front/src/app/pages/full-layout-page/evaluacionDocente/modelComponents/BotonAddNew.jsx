import { useSelector } from "react-redux"
import { useUiStoreAsp } from "../../../../../hooks"
import { useAspectoStore } from "../../../../../app/pages/full-layout-page/evaluacionDocente/aspectos/services/useAspectoStore";
import { Grid,  Button } from "@mui/material"
import { AddOutlined } from "@mui/icons-material";
//import { FormAspectoModal } from "../aspectos";

export const BotonAddNew = () => {
    const {openDateModal}=useUiStoreAsp();
    const{setActivarEvent}=useAspectoStore();

    const handleclickNew=()=>{
        setActivarEvent(null);//se envia en null para que limpie el formulario 
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
