///el encargado de hacer la interacion 

import { useDispatch, useSelector } from "react-redux"
import { activarEvent, actualizarAspecto, addEvenAspecto, deleteAspecto, onListarAspecto } from "../";
import noahApi from "../../../api/noahApi";
import Swal from "sweetalert2";

export const useAspectoStore = () => {
    const dispatch=useDispatch();
   const{events,  activeEvent}= useSelector(state=>state.aspecto)

///accion 
  const setActivarEvent=(aspectoEvent)=>{///el evento creado 
  dispatch(activarEvent(aspectoEvent))
  }

  
  ///lo que llega del backen 

  const startAspecto=async(aspectoEvent)=>{
    try {
     
          //console.log("Enviando aspectoEvent:", aspectoEvent); // Verifica el contenido del objeto
          if (aspectoEvent.id) {
            // Si tiene ID, actualizar
            await noahApi.put(`/evaDocente/updateAspecto/${aspectoEvent.id}`, aspectoEvent);
            dispatch(actualizarAspecto(aspectoEvent)); // Actualiza el store
            Swal.fire('Éxito', 'Aspecto actualizado correctamente', 'success');
          } else {
            // Si no tiene ID, crear
            const response = await noahApi.post('/evaDocente/createAspecto', aspectoEvent);
            const data = response.data;
            dispatch(addEvenAspecto({ ...aspectoEvent, id: data.aspecto.id }));
            Swal.fire('Éxito', 'Aspecto creado correctamente', 'success');
          }
        } catch (error) {
          console.error('Error con el aspecto:', error);
          const errorMsg =
            error.response?.data?.msg || 'Hubo un problema al procesar la solicitud.';
          Swal.fire('Error', errorMsg, 'error');
        }
    

  };

    const deleteEventoAspecto = async (id) => {
      try {
        const aspectoId = parseInt(id, 10); // Convertir a número entero
        if (isNaN(aspectoId) || aspectoId <= 0) { // Verificar que no sea NaN ni menor o igual a cero
          throw new Error("El ID debe ser un número entero positivo válido.");
        }
        const response = await noahApi.delete(`/evaDocente/deleteAspecto/${aspectoId}`); 
        console.log("Respuesta de la API:", response);
        
        if (!response.status === 200) {
          throw new Error(`Error al eliminar el aspecto con ID ${aspectoId}`);
        }
  
        // Si la eliminación fue exitosa, actualizamos el estado
        dispatch(deleteAspecto(aspectoId));
        console.log(`Aspecto con ID ${aspectoId} eliminado correctamente`);
      } catch (error) {
        console.error("Error al eliminar el aspecto:", error.response?.data || error.message);
        throw error;
      }
    
  }


  
  const listaAspectos=async()=>{
    try {
      const{data}=await noahApi.get('/evaDocente/listAspecto');
      //console.log('llego aspecto',{data});
      dispatch(onListarAspecto(data.data));
    } catch (error) {
      console.log('error cargando aspectos ', error)
    }
  }

  
  return {

    //propiedades
    events,
    activeEvent,

    //metodos 
    setActivarEvent,
    startAspecto,
    deleteEventoAspecto,
    listaAspectos
  }
}
