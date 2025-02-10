import { Update } from '@mui/icons-material'
import { useUiStoreAsp } from '../../../../../hooks';
import { useAspectoStore } from '../aspectos';
import { Grid,  Button } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


export const BotonActualizar = ({row}) => {
    const {openDateModal}=useUiStoreAsp();
    const{setActivarEvent}=useAspectoStore();

    

    const handleUpdate=()=>{
      
        //onsole.log("Datos de la fila seleccionada:", row); // Verifica que `row` tenga contenido
        if (!row) {
          console.error("No se recibió un dato válido en `row`");
          return;
        }
      
        setActivarEvent(row);
        openDateModal();

    };
  return (
    <Grid 
    
  >
    <Button variant="contained" color="primary" size="small"  onClick={handleUpdate} startIcon={<EditOutlinedIcon />}>
    
    </Button>
    
  
    </Grid>
  )
}
