import {  Button, IconButton, MenuItem, TextField, Typography } from "@mui/material"
import Modal from'react-modal';
import { useUiStoreAsp } from "../../../../../hooks";
import { SaveOutlined, UploadFile, UploadOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import {usePreguntasStore, useTipoPreguntaStore  } from "./";

import Swal from "sweetalert2";


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
export const FormPreguntaModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStoreAsp();
     ///estado adicional para validar campo, por defecto no se ha realizado el submit del formulario
     const [formSubmitted, setformSubmitted] = useState(false);
    const {listaTipoPregunta, tipoPregunta}=useTipoPreguntaStore();
    const { activeEvent, setActivarEvent, startPregunta} = usePreguntasStore();
    const [options, setOptions] = useState([]); // Estado para las opciones de la lista
   // const [selectedOption, setSelectedOption] = useState(''); // Estado para la opción seleccionada
    const subirImagen=useRef();//ref: funcion para simulacion del boton de archivos
      
       ///para activar los los datos 
       const [formValues, setformValues] = useState({
        titulo:'',
        subtitulo:'',
        imagen:'',
        valor:'',
        id_tipo_pregunta:'',
  
      })
  
      useEffect(() => {
        console.log("activeEvent actualizadar:", activeEvent); // Asegúrate de que activeEvent tiene los datos correctos
        if (activeEvent) {
            setformValues({
                titulo: activeEvent.titulo || '',
                subtitulo: activeEvent.subtitulo || '',
                imagen: activeEvent.imagen || '',
                valor: activeEvent.valor || '',
                id_tipo_pregunta: activeEvent.id_tipo_pregunta || '',
            });
        } else {
            setformValues({
                titulo: '',
                subtitulo: '',
                imagen: '',
                valor: '',
                id_tipo_pregunta: '',
            });
        }
    }, [activeEvent]);

 
 
//////la lista del tipo de pregunata 

useEffect(() => {
  const fetchData = async () => {
      // Cargar los datos solo si tipoPregunta está vacío
      if (tipoPregunta.length === 0) {
          await listaTipoPregunta();
      }
  };
  fetchData();
}, [tipoPregunta.length, listaTipoPregunta]); // Dependemos solo de tipoPregunta.length

useEffect(() => {
  if (Array.isArray(tipoPregunta)) {
    setOptions(
      tipoPregunta.map((tipoPregu) => ({
        value: tipoPregu.id, // Esto debe coincidir con el valor que se pasa en el Select
        label: tipoPregu.nombre,
      }))
    );
  }
}, [tipoPregunta]);
    //////////PARA CERRAR MODAL 
    const onCloseModal = () => {
      closeDateModal();
      setformValues({
          titulo: '',
          subtitulo: '',
          imagen: '',
          valor: '',
          id_tipo_pregunta: '',
      }); // Resetea el formulario
      setformSubmitted(false);
      setActivarEvent(null); // Limpia el estado activo
  };
////////para la imagen //////
        const onFileInputChange = ({ target }) => {
          setformValues({
            ...formValues,
            imagen: target.files[0]?.name || "",
          });const onFileInputChange = ({ target }) => {
            setformValues({
              ...formValues,
              imagen: target.files[0]?.name || "",
            });
          };
        };

      const handleSelectChange = ({target}) => {
        //setSelectedOption(target.value);
        const selectedValue = target.value;
        console.log('Opción seleccionada:', target.value);  // Debería ser el id del tipo de pregunta
        setformValues({
            ...formValues,
           // tipoPregunta: target.value,  // El value es el id de tipo de pregunta
            id_tipo_pregunta: selectedValue,
          });
    };

      ///en el campo del formulario deje agregar los datos 
      const onInputChange=({target})=>{
        setformValues({
          ...formValues,
          [target.name]:target.value,
        });

      };

      const onSubmit = async (event) => {
        event.preventDefault();
        setformSubmitted(true);
        //console.log("Enviando datos al backend:", formValues); // Verifica los valores antes de enviarlos
        //await startPregunta(formValores);
        //se valida datos 
    
        if (formValues.titulo.trim().length <= 0) {
          Swal.fire('Error', 'El título es obligatorio.', 'error');
          return;
         }
        if (!formValues.id_tipo_pregunta) {
          Swal.fire('Error', 'Debe seleccionar un tipo de pregunta.', 'error');
          return;
        }
    
        console.log("Formulario enviado:", formValues);
    
        try {
          await startPregunta(formValues); // Enviar datos al backend
          Swal.fire({
              icon: 'success',
              title: 'Guardado',
              text: 'La pregunta se guardó con éxito',
          });
            //await listPregunta();///actualiza la lista 
            setformValues({
              titulo: '',
              subtitulo: '',
              imagen: '',
              valor: '',
              id_tipo_pregunta: '',
          });
        setformSubmitted(false);
        closeDateModal();
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar la pregunta. Por favor, intenta de nuevo.',
            });
            console.log('error formulario pregunta', error);
        }
    };
      
       
      
       
  return (
    <Modal
    isOpen={isDateModalOpen }
    onRequestClose={onCloseModal}// Cierra el modal al hacer clic fuera
    style={customStyles}
   // className="modal"
    //overlayClassName="modal-fondo"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
                      PREGUNTA
                </Typography>
        <form onSubmit={onSubmit}>
            <TextField 
            label="Titulo"
            variant="outlined"
            fullWidth
            margin="normal"
            name="titulo"
            value={formValues.titulo || ''}
            onChange={onInputChange}
            error={formSubmitted && formValues.titulo.trim().length === 0}
            helperText={formSubmitted && formValues.titulo.trim().length === 0 ? 'El título es obligatorio' : ''}
            />

            <TextField
            label="Subtitulo"
            variant="outlined"
            fullWidth
            margin="normal"
            name="subtitulo"
            value={formValues.subtitulo || ''}
            onChange={onInputChange}
            />
            <Typography>Ingrese la imagen</Typography>

             <TextField
            label="Imagen"
            variant="outlined"
            fullWidth
            margin="normal"
            name="imagen"
            value={formValues.imagen || ''}
            onChange={onInputChange}
            />

           <TextField
            label="Valor"
            variant="outlined"
            fullWidth
            margin="normal"
            name="valor"
            value={formValues.valor || ''}
            onChange={(e) => {
              const value = e.target.value;
              // Convierte el valor a un número entero
              setformValues({
                ...formValues,
                valor: value === '' ? '' : parseInt(value, 10) || ''// Si el valor es vacío, lo dejamos vacío
              });
          }}
            type="number"
            />
            
            {/* Campo de lista */}
      {/* Campo de lista */}
      <TextField
          select
          label="Seleccione una opción"
          value={formValues.id_tipo_pregunta || ''}  // Asegúrate de que sea un valor válido
          onChange={handleSelectChange}
          fullWidth
          margin="normal"
        >
          {options.length > 0 ? (
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No hay opciones disponibles</MenuItem>
          )}
        </TextField>

            <Button  variant="contained" color="primary" type="submit" fullWidth  >
                       <SaveOutlined sx={{fontSize:30, mr:1}}/>
                    </Button>
            

        </form>

    </Modal>
  )
}
