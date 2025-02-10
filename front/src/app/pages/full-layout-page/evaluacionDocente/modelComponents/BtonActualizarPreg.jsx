import { Update } from '@mui/icons-material'
import { useUiStoreAsp } from '../../../../../hooks';
import { Grid,  Button } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useRespuestaStore } from '../opciones_respuestas/services/useRespuestaStore';
import { useEncuestaStore } from '../encuestas';


export const BtonActualizarPreg = ({row}) => {
    //console.log('llega zzz row actualizar', row);
    
    const {openDateModal}=useUiStoreAsp();
    const{setActivarEvento}=useRespuestaStore();
 //  const{setActivarEventEncuesta}=useEncuestaStore()

    

    const handleUpdate=()=>{
      
        console.log("Datos de la fila seleccionada:", row); // Verifica que `row` tenga contenido
        if (!row) {
          console.error("No se recibió un dato válido en `row`", row);
          return;
        }
      
        setActivarEvento(row);
        ///setActivarEventEncuesta(row)
        openDateModal();

    };
  return (
    <Grid>
    <Button variant="contained" color="primary" size="small"  onClick={handleUpdate} startIcon={<EditOutlinedIcon />}>
    
    </Button>
    
  
    </Grid>
  )
}
