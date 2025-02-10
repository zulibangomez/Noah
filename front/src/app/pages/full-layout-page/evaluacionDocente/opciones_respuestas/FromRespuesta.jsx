import Modal from 'react-modal';
import { Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useUiStoreAsp } from '../../../../../hooks';
import { useRespuestaStore } from './services/useRespuestaStore';
import { usePreguntasStore } from '../preguntas';
import Swal from 'sweetalert2';

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

Modal.setAppElement('#root');

export const FromRespuesta = () => {
  const { isDateModalOpen, closeDateModal } = useUiStoreAsp();
  const [formSubmitted, setFormSubmitted] = useState();
  const { listPregunta, events } = usePreguntasStore();
  const{activaEvent, startRespuesta}=useRespuestaStore()
  
  const [formValues, setFormValues] = useState({
    nombre: '',
    imagen: '',
    valor: '',
    id_pregunta: '', // Esto almacenará el ID de la pregunta seleccionada
    respuestaadd: ''
  });
  // trahemos los datos para mostrar en el formulario 
  useEffect(() => {
    if (activaEvent) {
      console.log("activeEvent actualizadar respuestaaaaa:", activaEvent);
      setFormValues({
        id:activaEvent.id || '',
        nombre: activaEvent.respuestas || '',
        imagen: activaEvent.imagen || '',
        valor: activaEvent.valor || '',
        id_pregunta: activaEvent.id_pregunta  || '',
        respuestaadd: activaEvent.respuestaadd  || '',
        
      });
    } else {
      setFormValues({
        nombre: '',
        imagen: '',
        valor: '',
        id_pregunta: '', // Esto almacenará el ID de la pregunta seleccionada
        respuestaadd: ''
      });
    }
  }, [activaEvent]);

  // Cargar las preguntas cuando se abra el modal
  useEffect(() => {
    listPregunta(); // Llama a la acción para obtener las preguntas
  }, [listPregunta]);

  // Función para cerrar el modal
  const onCloseModal = () => {
    closeDateModal();
    setFormValues({
      nombre: "",
      imagen: "",
      valor: "",
      id_pregunta: "",
      respuestaadd: ""
    });
    setFormSubmitted(false);
  };

  // Función para manejar el cambio en el select de preguntas
  const handleSelectChange = (event) => {
    const { value } = event.target;
    console.log('Valor seleccionado de actualizar :', value);
    setFormValues({
      ...formValues,
      id_pregunta: value// Actualiza el id de la pregunta seleccionada
    });
  };

  ///para enviar datos al formulario 
  const onSubmit = async (event) => {
      event.preventDefault();
      setFormSubmitted(true);
  
      if (formValues.nombre.trim().length <= 0) return;
  
      // console.log("Formulario enviado:", formValues);
      if (!formValues.id_pregunta) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, seleccione una pregunta.',
        });
        return; // No continuar si no se seleccionó una pregunta
      }
      try {
        console.log("Formulario enviado:", formValues);
        await startRespuesta(formValues);
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'El respuesta se guardó con éxito',
        });
        ///limpia el formulario cuando se envia los datos 
        setFormValues({
          nombre: '',
          imagen: '',
          valor: '',
          id_pregunta: '', // Esto almacenará el ID de la pregunta seleccionada
          respuestaadd: ''
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
  

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal} // Corregido "onRequestClise" a "onRequestClose"
      overlayClassName="modal-fondo"
      style={customStyles}
    >
      <Typography>Respuestas</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Nombre"
          margin="normal"
          name="nombre"
          value={formValues.nombre}
          onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })}
          fullWidth
        />
        <TextField
          label="Imagen"
          fullWidth
          margin="normal"
          name="imagen"
          value={formValues.imagen}
          onChange={(e) => setFormValues({ ...formValues, imagen: e.target.value })}
        />
        <TextField
          label="Valor"
          variant="outlined"
          margin="normal"
          name="valor"
          type="number"
          value={formValues.valor}
          onChange={(e) => setFormValues({ ...formValues, valor: e.target.value })}
          fullWidth
        />

        {/* Select para elegir la pregunta */}
        
      <FormControl fullWidth margin="normal">
      <InputLabel>Seleccione una pregunta</InputLabel>
      <Select
          value={formValues.id_pregunta || ''}  // Asegúrate de que esté bien asignado el ID de la pregunta
          onChange={handleSelectChange}
          label="Seleccione una pregunta"
          name="pregunta"
          type="number"
        >
          {events && events.length > 0 ? (
            events.map((pregunta) => (
              <MenuItem key={pregunta.id} value={pregunta.id}>
                {pregunta.pregunta} {/* Este es el texto que verá el usuario */}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">No hay preguntas disponibles</MenuItem>
          )}
        </Select>
    </FormControl>

        <TextField
          label="Respuesta Adicional"
          margin="normal"
          name="respuestaAdd"
          value={formValues.respuestaadd}
          onChange={(e) => setFormValues({ ...formValues, respuestaadd: e.target.value })}
          fullWidth
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          
        </Button>
      </form>
    </Modal>
  );
};