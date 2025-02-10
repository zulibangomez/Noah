import { useDispatch, useSelector } from "react-redux"
import { activarEvent, actualizarRespuesta, deleteRespuesta, onlistarRespuestas, addRespuesta} from "../hookRespuestas/respuestasSlice";
import noahApi from "../../../api/noahApi";
import Swal from "sweetalert2";

export const useRespuestaStore = () => {
  const dispatch=useDispatch();
  const {eventsResp,activaEvent}=useSelector(state=>state.respuesta);
  //accion 
  const setActivarEvento=(aspectoEvent)=>{///el evento creado 
  dispatch(activarEvent(aspectoEvent))
  }


  
  const listarRespuesta=async()=>{
    try {
      const {data}=await noahApi.get('/evaDocente/listRes');
      dispatch(onlistarRespuestas(data.data));
    } catch (error) {
      console.log('error cargando respuestas ', error)
    }

  }

  const startRespuesta = async (repuestaEvent) => {
    //console.log('Datos enviados a startRespuesta:', repuestaEvent); // Verificar los datos
    try {
     
  
      if (repuestaEvent.id) {
        ///console.log('respuesta zully ', repuestaEvent.id);
        
        // Si tiene un ID, actualizamos
        await noahApi.put(`/evaDocente/updateRes/${repuestaEvent.id}`, repuestaEvent);
        const data = response.data;
        if (response && response.data) {
          // Procesa la respuesta correctamente
          dispatch(actualizarRespuesta(repuestaEvent));
          Swal.fire('Éxito', 'respuesta actualizada correctamente', 'success');
        } else {
          console.error('No se recibió una respuesta válida');
        }
        
      } else {
        // Si no tiene ID, creamos una nueva respuesta
        if (!repuestaEvent.id_pregunta) {
          Swal.fire('Error', 'La pregunta no está seleccionada', 'error');
          return; // Si no se ha seleccionado pregunta, no continuar
        }
  
        const response = await noahApi.post('/evaDocente/createRes/', repuestaEvent);
        const data = response.data;
  
        // Verifica que la respuesta del servidor contiene el ID
        if (data && data.respuesta && data.respuesta.id) {
          // Aquí estás agregando el id a la respuesta para actualizar el estado
          dispatch(addRespuesta({ ...repuestaEvent, id: data.respuesta.id }));
          Swal.fire('Éxito', 'respuesta creada correctamente', 'success');
        } else {
          //console.error('Respuesta inesperada del servidor', data);
          Swal.fire('Error', 'Hubo un problema al crear la respuesta.', 'error');
        }
      }
    } catch (error) {
      console.error('Error con la pregunta:', error);
      const errorMsg = error.response?.data?.msg || 'Hubo un problema al procesar la solicitud.';
      Swal.fire('Error', errorMsg, 'error');
    }
   };

  const eliminarRespuesta = async (id) => {
    
    try {
      const respuesta = await noahApi.delete(`/evaDocente/deleteRes/${id}`, {
        data: { id: id } // Aquí se envía el id en el cuerpo de la solicitud
      });
      dispatch(deleteRespuesta(respuesta));
  
    } catch (error) {
      console.error('Error al eliminar la respuesta', error);
    }
  };
  


  return {
    //mpropiedades
    eventsResp, //evento activo
    activaEvent, ///evento activo

    //metodos
    setActivarEvento,
    listarRespuesta,
    eliminarRespuesta,
    startRespuesta
    
  }
}
