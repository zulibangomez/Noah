import { useDispatch, useSelector } from "react-redux"
import noahApi from "../../../api/noahApi";
import { onListarPregunta, activarEvent, deletePregunta, actualizarPregunta, addEventPregunta} from "../";
import Swal from "sweetalert2";


export const usePreguntasStore = () => {

    const dispatch=useDispatch();
    const {eventsP, activeEvent}=useSelector(state=>state.pregunta)


    const setActivarEvent=(preguntaEvent)=>{///el evento creado 
        dispatch(activarEvent(preguntaEvent))
    }

    const startPregunta=async(preguntaEvent)=>{
        try {
           // console.log("Enviando datos de preguntas :", preguntaEvent);
            // Verifica que `preguntaEvent` tenga un id o que sea un nuevo objeto
            if (preguntaEvent && preguntaEvent.id) {
                console.log(preguntaEvent.id);
                
                await noahApi.put(`/evaDocente/updatePregunta/${preguntaEvent.id}`, preguntaEvent)
                const data= response.data;
                console.log('lleeega data user', data );
                
                dispatch(actualizarPregunta(preguntaEvent));
                Swal.fire('Exito', 'pregunta actualizada correctamente');
            } else if (preguntaEvent) {
                // Si no tiene id (es una nueva pregunta)
                const response=await noahApi.post(`/evaDocente/createPregunta`, preguntaEvent);
                
             //   console.log('repuesta api ', response);
                const data= response.data;

               if (data && data.pregunta && data.pregunta.id) {
                dispatch(addEventPregunta({ ...preguntaEvent, id: data.pregunta.id }));
                Swal.fire('Éxito', 'Pregunta creada correctamente', 'success');
            } else {
                Swal.fire('Error', 'La API no devolvió un ID válido para la nueva pregunta.', 'error');
            }
        } else {
            Swal.fire('Error', 'Los datos de la pregunta no son válidos.', 'error');
        }
            
        } catch (error) {
         //   console.log('error',error);
            const errorMsg =
            error.response?.data?.msg || 'Hubo un problema al procesar la solicitud.';
            Swal.fire('Error', errorMsg, 'error');
        }
    }
    const eliminarPregunta=async(preguntaId)=>{
        try {
            const respuesta=await noahApi.delete(`/evaDocente/deletePregunta/${preguntaId}`);
           // console.log("la pregunta de bd ", respuesta);
            if (!respuesta.status === 200) {
                throw new Error(`Error al eliminar el pregunta con ID ${preguntaId}`);
              }
             dispatch(deletePregunta(preguntaId))
            //  console.log(`Pregunta con ID ${preguntaId} eliminado correctamente`);
        } catch (error) {
            console.error("Error al eliminar el pregunta:", error.response?.data || error.message);
        }
    }

    const listPregunta=async()=>{
        try {
            const{data}=await noahApi.get(`/evaDocente/listPregunta`);
            
            dispatch(onListarPregunta(data.data));
           // console.log('lista de pre bd',data);
        } catch (error) {
           console.log('error en cargar los datos de la preguntas', error);
          
        }
    }
///console.log('Eventos cargados desde Redux:', events);

 

return{
    ///propiedades
    eventsP, 
    activeEvent, 
    //metodos
    // addPreguunta,
    listPregunta,
    eliminarPregunta,
    //updatePregunta,
    setActivarEvent,
    startPregunta
    

}
}
