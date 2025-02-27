import Modal from'react-modal';
import { useAuthStore, useUiStoreAsp } from '../../../../../hooks';
import { useEffect, useState } from 'react';
import { Box, Button, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { Close, SaveOutlined } from '@mui/icons-material';
import { useEncuestaStore } from './services/useEncuestaStore';
import Swal from 'sweetalert2';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addHours, differenceInSeconds, format} from 'date-fns';
import es from 'date-fns/locale/es';
import { useListaTipoEncuesta } from './services/useListaTipoEncuesta';
import "../styles";
import { Stack } from 'react-bootstrap';
import { onCloseDateModal } from '../../../../../shared/ui/uiSlice';

///para cambiar calendario en español 
registerLocale('es',es);

Modal.setAppElement('#root');


export const FromEncuestaModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStoreAsp();
  const{startEncuesta, activeEncuesta,setActivarEventEncuesta}=useEncuestaStore()
  const [formSubmitted, setFormSubmitted] = useState();
  const { listarTipoEncuesta, tipoEncuesta } = useListaTipoEncuesta();
  const [options, setOptions]=useState();///estado para la lista de encuesta 
  const [tipoEncuestaMap, setTipoEncuestaMap] = useState({});

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
    id_tipo_encuesta:tipoEncuesta,
    llave_abreviatura:'', 
    estado:''
  })

  useEffect(() => {
    if (activeEncuesta && activeEncuesta.id) {
      console.log("Actualizando formulario con activeEncuesta:", activeEncuesta);
      setFormValues({
        id: activeEncuesta.id || '',
        nombre: activeEncuesta.nombre || '',
        descripcion: activeEncuesta.descripcion || '',
        fecha_inicio: activeEncuesta.fecha_inicio ? new Date(activeEncuesta.fecha_inicio) : new Date(),
        fecha_fin: activeEncuesta.fecha_fin ? new Date(activeEncuesta.fecha_fin) : addHours(new Date(), 2),
        id_usuario: id_usuario || '',
        id_tipo_encuesta: tipoEncuestaMap[activeEncuesta.tipo_encuestas] || '',
        llave_abreviatura: activeEncuesta.llave_abreviatura || '',
        estado: activeEncuesta.estado || '',
      });
    } else {
      console.log("Reseteando formulario porque no hay activeEncuesta");
      setFormValues({
        nombre: '', 
        descripcion: '',
        fecha_inicio: new Date(),
        fecha_fin: addHours(new Date(), 2),
        id_usuario: id_usuario,
        id_tipo_encuesta: '',
        llave_abreviatura: '',
      });
    }
  }, [activeEncuesta, id_usuario]);

    ///////para listar tipo de pregunta ///
    useEffect(() => {
      listarTipoEncuesta(); 
    }, []);
    
    useEffect(() => {
      if (Array.isArray(tipoEncuesta) && tipoEncuesta.length > 0) {
        const map = tipoEncuesta.reduce((acc, item) => {
          acc[item.nombre] = item.id;
          return acc;
        }, {});
    
        setTipoEncuestaMap(map);
      }
    }, [tipoEncuesta]);


   
    const handleSelectChange = ({ target }) => {
      const selectValue = Number(target.value); // Convertir a número
      console.log('Opción seleccionada:', selectValue);
    
      setFormValues((prevValues) => ({
        ...prevValues,
        id_tipo_encuesta: selectValue || "",
      }));
    };

    useEffect(() => {
      if (Array.isArray(tipoEncuesta) && tipoEncuesta.length > 0) {
        setOptions(tipoEncuesta.map((item) => ({
          value: item.id, 
          label: item.nombre
        })));
      } else {
        setOptions([]); // Si no hay datos, devuelve un array vacío
      }
    }, [tipoEncuesta]);

  ///////////////////calendario encuesta 
  
  const onInputChange=({target})=>{// se recibe el evento pero se destructura el target 
    setFormValues({// se llama todos los valores que tiene 
     ...formValues,
     [target.name]:target.value,
   }); //se actualiza le valor 
};

///posteo del formulario 
  const onSubmit = async (event) => {
        event.preventDefault();
        //detener 
        // const diferenciafecha=differenceInSeconds(formValues.fecha_fin, formValues.fecha_inicio)
        // console.log('diferencia en las fechas ',diferenciafecha);
        //si esto no es un numero 
        // if(isNaN(diferenciafecha)|| diferenciafecha <= 0){
        //   Swal.fire('revisar')    
        //   return;
        // }
        if (!(formValues.fecha_inicio instanceof Date) || isNaN(formValues.fecha_inicio.getTime())) {
          Swal.fire("Error", "La fecha de inicio es inválida", "error");
          return;
        }

        if (!(formValues.fecha_fin instanceof Date) || isNaN(formValues.fecha_fin.getTime())) {
          Swal.fire("Error", "La fecha de fin es inválida", "error");
          return;
        }
        setFormSubmitted(true);
        if (formValues.nombre.trim().length <= 0) return;
        // console.log("Formulario enviado:", formValues);
            // Formatear fechas antes de enviarlas
        const formattedFormValues = {
            ...formValues,
            fecha_inicio: format(formValues.fecha_inicio, "yyyy-MM-dd HH:mm:ss"),
            fecha_fin: format(formValues.fecha_fin, "yyyy-MM-dd HH:mm:ss"),
        };
        try {
          console.log("Formulario enviado:", formattedFormValues);
          await startEncuesta(formattedFormValues);
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'El respuesta se guardó con éxito',
          });
          ///limpia el formulario cuando se envia los datos 
          setFormValues({
            nombre:'', 
            descripcion:'',
            fecha_inicio:new Date(),///se mantiene como date
            fecha_fin:addHours(new Date(), 2),
            id_usuario:id_usuario,
            id_tipo_encuesta:'',
            llave_abreviatura:'', 
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
  setFormValues({
    nombre: "", 
    descripcion: "",
    fecha_inicio: new Date(),
    fecha_fin: addHours(new Date(), 2),
    id_usuario: id_usuario,
    id_tipo_encuesta: '',
    llave_abreviatura: "", 
  });
  setFormSubmitted(false);
  setActivarEventEncuesta(null); // Limpia el evento activo
  closeDateModal();
};
  return ( 

    <Modal
    isOpen={isDateModalOpen}
    onRequestClose={onCloseModal}
    aria-labelledby="server-modal-title"
    aria-describedby="server-modal-description"
    style={{
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
      },
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        borderRadius: "10px",
        padding: "20px",
         overflow: "visible"
      },
    }}
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
                    onBlur={() => document.activeElement.blur()} // Cierra el calendario
                  />
              
              <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <div>
                <Typography>Ingrese la fecha de inicio</Typography>
                <DatePicker
                  name="fecha_inicio"
                  className="custom-datepicker"
                  selected={formValues.fecha_inicio ? new Date(formValues.fecha_inicio) : new Date()} 
                  onChange={(date) => {
                    if (date) {
                      setFormValues({
                        ...formValues, 
                        fecha_inicio: date, 
                        fecha_fin: date > formValues.fecha_fin ? addHours(date, 1) : formValues.fecha_fin
                      });
                    }
                  }}
                  minDate={new Date()} 
                  showTimeSelect
                  dateFormat="yyyy-MM-dd HH:mm"
                  locale="es"
                />
              </div>

              <div>
                <Typography>Ingrese la fecha fin</Typography>
                <DatePicker
                  name='fecha_fin'
                  className="custom-datepicker"
                  selected={formValues.fecha_fin ? new Date(formValues.fecha_fin) : null} 
                  onChange={(date) => {
                    if (date) {
                      setFormValues({...formValues, fecha_fin: date});
                    }
                  }}
                  calendarClassName="react-datepicker" 
                  dateFormat="yyyy-MM-dd HH:mm"
                  showTimeSelect
                  locale="es"
                  timeCaption="Hora"
                  minDate={formValues.fecha_inicio ? new Date(formValues.fecha_inicio) : new Date()} 
                />
              </div>
            </Stack>
          </Stack>
    
          <TextField
            select
            label="Tipo de Encuesta"
            margin="normal"
            name="id_tipo_encuesta"
            value={formValues.id_tipo_encuesta || ""}
            onChange={handleSelectChange}
            fullWidth
          >
            {Array.isArray(options) && options.length > 0 ? (
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No hay opciones disponibles</MenuItem>
            )}
          </TextField>
              

           <TextField
          label="llave abreviatura"
          margin="normal"
          name="llave_abreviatura"
          value={formValues.llave_abreviatura}
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
