
import { useUiStoreAsp } from '../../../../../hooks';
import { Grid2,  Button } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEncuestaStore } from '../encuestas';


export const BotonActualizarEncuesta = ({row}) => {
    const {openDateModal}=useUiStoreAsp();
    const{setActivarEventEncuesta}=useEncuestaStore();
     
    

    const handleUpdate=()=>{
      
        console.log("Datos de la fila seleccionada:", row); // Verifica que `row` tenga contenido
        if (!row) {
          console.error("No se recibió un dato válido en `row`");
          return;
        }
      
        setActivarEventEncuesta(row);
        openDateModal();

    };
  return (
    <Grid2 
    
  >
    <Button variant="contained" color="primary" size="small"  onClick={handleUpdate} startIcon={<EditOutlinedIcon />}>
    
    </Button>
    
  
    </Grid2>
  )
}

