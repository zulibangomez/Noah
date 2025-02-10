import { useEffect, useMemo, useState } from 'react';

import Modal from'react-modal';
import {Typography, TextField, Button, Box} from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUiStoreAsp } from '../../../../../hooks';
import { useAspectoStore } from '../aspectos/index';
import { SaveOutlined } from '@mui/icons-material';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
 
;

  Modal.setAppElement('#root');

export const FormAspectoModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStoreAsp();
   ///estado adicional para validar campo, por defecto no se ha realizado el submit del formulario
   const [formSubmitted, setformSubmitted] = useState(false);
   const{setActivarEvent, activeEvent, startAspecto}=useAspectoStore();
   const [formValues, setformValues] = useState({
    nombre: '',
    descripcion: '',

  })
  useEffect(() => {
   // console.log("activeEvent:", activeEvent); // Verifica si el evento activo tiene los datos correctos
    if (activeEvent) {
      setformValues({
        id: activeEvent.id || '', // Incluye el ID en los valores del formulario
        nombre: activeEvent.nombre || '',
        descripcion: activeEvent.descripcion || '',
      });
    } else {
      setformValues({
        nombre: '',
        descripcion: '',
      });
    }
  }, [activeEvent]);

////////


   ///para cerrar modal 
   const onCloseModal=()=>{
    closeDateModal();
    console.log('cerrar modal');
    setformSubmitted({
      id: '',
      nombre: '',
      descripcion: '',
    });
    setformSubmitted(false);
    setActivarEvent(null);// Limpia el evento activo
   };
   ////para que se actualice y deje escribir en los campos de textos se crea 
   const onInputChange=({target})=>{// se recibe el evento pero se destructura el target 
       setformValues({// se llama todos los valores que tiene 
        ...formValues,
        [target.name]:target.value,
      }); //se actualiza le valor 
   };



  /////el posteo del formulario que se envien los datos 
  const onSubmit = async (event) => {
    event.preventDefault();
    setformSubmitted(true);

    if (formValues.nombre.trim().length <= 0) return;

   // console.log("Formulario enviado:", formValues);

    try {
      await startAspecto(formValues);
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'El aspecto se guardó con éxito',
      });
      setformValues({
        nombre: '',
        descripcion: '',
      });
      
      setformSubmitted(false);
      closeDateModal();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el aspecto. Por favor, intenta de nuevo.',
      });
    }
  };

  return (
    <Modal
    isOpen={isDateModalOpen} // Estado de apertura del modal
    onRequestClose={onCloseModal}// Cierra el modal al hacer clic fuera
        style={customStyles}
       // className="modal"
        overlayClassName="modal-fondo"
    
    >
        <Typography id="modal-modal-title" variant="h6" component="h2">
                      Aspecto
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        data-focus="first"
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="nombre"
                        value={formValues.nombre || ''}
                        onChange={onInputChange}
                        error={formSubmitted && formValues.nombre.trim().length === 0}
                        helperText={
                          formSubmitted && formValues.nombre.trim().length === 0
                            ? 'El nombre es obligatorio'
                            : ''
                        }
                       
                    />
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="descripcion"
                        value={formValues.descripcion || ''}
                        onChange={onInputChange}
                    />
                
                    <Button  variant="contained" color="primary" type="submit" fullWidth  >
                       <SaveOutlined sx={{fontSize:30, mr:1}}/>
                    </Button>


                    
                </form>

    </Modal>
  )
}
