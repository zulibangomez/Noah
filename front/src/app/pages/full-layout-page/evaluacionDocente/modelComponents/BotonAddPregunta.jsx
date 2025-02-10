
import { useUiStoreAsp } from "../../../../../hooks"
import { useAspectoStore } from "../../../../../app/pages/full-layout-page/evaluacionDocente/aspectos/services/useAspectoStore";
import { Grid,  Button } from "@mui/material"
import { PermDataSettingOutlined } from "@mui/icons-material";



export const BotonAddPregunta = () => {
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
    <Button variant="contained" color="primary" size="small"  onClick={handleclickNew} startIcon={<PermDataSettingOutlined />}>
    
    </Button>
    
  
    </Grid>
  )
}
