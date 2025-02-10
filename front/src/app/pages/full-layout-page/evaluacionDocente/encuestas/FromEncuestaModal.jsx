import Modal from 'react-modal';
import { useAuthStore, useUiStoreAsp } from '../../../../../hooks';
import { useEffect, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { Close, SaveOutlined } from '@mui/icons-material';
import { useEncuestaStore } from './services/useEncuestaStore';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {addHours} from 'date-fns';



Modal.setAppElement('#root');

export const FromEncuestaModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStoreAsp();
  const{startEncuesta, activeEncuesta,setActivarEventEncuesta}=useEncuestaStore()
  const [formSubmitted, setFormSubmitted] = useState();
/////llama alid_usuario para enviarlo al formulario 
  const{ user }=useAuthStore();
  //const id_usuario = user?.id_usuario || localStorage.getItem('id_usuario');
  const id_usuario = user.id_usuario;


  const [formValues, setFormValues] = useState({
    nombre:'', 
    descripcion:'',
    fecha_inicio:new Date(),
    fecha_fin:addHours(new Date(),2),
    id_usuario:id_usuario,
    id_tipo_encuesta:'',
    llave_abreviatura:'', 
    estado:''
  })

  useEffect(() => {
    if (activeEncuesta && activeEncuesta.id !== formValues.id) {
      console.log("activeEvent actualizadar respuestaaaaa:", activeEncuesta);
      setFormValues({
       id:activeEncuesta.id || '',
        nombre: activeEncuesta.nombre || '',
        descripcion: activeEncuesta.descripcion || '',
        fecha_inicio: activeEncuesta.fecha_inicio || '',
        fecha_fin: activeEncuesta.fecha_fin || '',
        id_usuario: id_usuario  || '',
        id_tipo_encuesta: activeEncuesta.tipo_encuestas  || '',
        llave_abreviatura: activeEncuesta.llave_abreviatura || '',
        estado: activeEncuesta.estado || '',
        
      });
    } else {
      ///limpia el formulario cuando se envia los datos 
      setFormValues({
        nombre:'', 
        descripcion:'',
        fecha_inicio:'',
        fecha_fin:'',
        id_usuario:id_usuario,
        id_tipo_encuesta:'',
        llave_abreviatura:'', 
        estado:''
    });
    }
  }, [activeEncuesta, id_usuario]);

  const onInputChange=({target})=>{// se recibe el evento pero se destructura el target 
    setFormValues({// se llama todos los valores que tiene 
     ...formValues,
     [target.name]:target.value,
   }); //se actualiza le valor 
};

  const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    
        if (formValues.nombre.trim().length <= 0) return;
    
        // console.log("Formulario enviado:", formValues);
  
        try {
          console.log("Formulario enviado:", formValues);
          await startEncuesta(formValues);
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'El respuesta se guardó con éxito',
          });
          ///limpia el formulario cuando se envia los datos 
          setFormValues({
            nombre:'', 
            descripcion:'',
            fecha_inicio:'',
            fecha_fin:'',
            id_usuario:id_usuario,
            id_tipo_encuesta:'',
            llave_abreviatura:'', 
            estado:''
          });
          
          setFormSubmitted(false);
          closeDateModal();
        } catch (error) {
          console.log('el errrooo rr',error);
          
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la respuesta. Por favor, intenta de nuevo.',
          });
        }
      };

  
// Función para cerrar el modal
const onCloseModal = () => {
  closeDateModal();
  setFormSubmitted({
   nombre:"", 
    descripcion:"",
    fecha_inicio:"",
    fecha_fin:"",
    id_usuario:"",
    id_tipo_encuesta:"",
    llave_abreviatura:"", 
    estado:""
  });
  setFormSubmitted(false);
  setActivarEventEncuesta(null);// Limpia el evento activo
};
  
  return (
      
    <Modal
    isOpen={isDateModalOpen}
    onRequestClose={onCloseModal} // Corregido "onRequestClise" a "onRequestClose"
    overlayClassName="modal-fondo"
    className="modal-content"  // Aplica la clase del contenido del modal
  >
     <div style={{ position: 'relative' }}>
    
        {/* Icono para cerrar el modal */}
        <IconButton
          onClick={onCloseModal}
          style={{ position: 'absolute', top: 6, right: 6 }}
        >
          <Close />
        </IconButton>
      </div>
    <h1>Encuesta </h1>
    <form onSubmit={onSubmit}>
    <TextField
          label="Nombre"
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
          fullWidth
        />
        <TextField
          label="Descripcion"
          margin="normal"
          name="descripcion"
          value={formValues.descripcion || ''}
          onChange={onInputChange}
          
          fullWidth
        />
        <DatePicker
        
        
        />
        <TextField
          label="Fecha Inicio"
          fullWidth
          margin="normal"
          name="fecha_inicio"
          value={formValues.fecha_inicio || ''}
          onChange={onInputChange}
          type="data"
      />
        <TextField
          label="Fecha Fin"
          variant="outlined"
          margin="normal"
          name="fecha_fin"
          type="data"
          value={formValues.fecha_fin|| ''}
          onChange={onInputChange}
          fullWidth
        />

           <TextField
          label="Tipo de Encuesta"
          margin="normal"
          name="id_tipo_encuesta"
          value={formValues.id_tipo_encuesta}
          onChange={onInputChange}
          fullWidth
        />

           <TextField
          label="llave abreviatura"
          margin="normal"
          name="llave_abreviatura"
          value={formValues.llave_abreviatura}
          onChange={onInputChange}
          fullWidth
        />
           <TextField
          label="estado"
          margin="normal"
          name="estado"
          value={formValues.estado}
          onChange={onInputChange}
          fullWidth
        />
        
      

        <Button variant="contained" color="primary" type="submit" fullWidth>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          
        </Button>
      </form>
  </Modal>
  )
}
