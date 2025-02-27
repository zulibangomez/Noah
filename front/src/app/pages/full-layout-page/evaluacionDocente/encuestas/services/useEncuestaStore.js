import { useDispatch, useSelector } from "react-redux"
import { activarEvent } from '../index';
import noahApi from "../../../api/noahApi";
import{addEncuesta,eliminarEncuesta,actualizarEncuesta,onListarEncuesta} from '../index'
import Swal from "sweetalert2";


export const useEncuestaStore = () => {

    const dispatch=useDispatch();
    const{encuetaEvents,activeEncuesta}=useSelector(state=>state.encuesta);
    // const [tipoEncuesta, settipoEncuesta] = useState([])

    // const listarTipoEncuesta = async()=>{
    //     try {
    //         const respuesta= await noahApi.get('/evaDocente/listTipoEncuesta');
    //         console.log('lista', respuesta.data );
    //         settipoEncuesta(respuesta.data.data);//guarda los datos en el estado 
    //     } catch (error) {
    //         console.log('error al caragar la lista tipo encuesta',error);
            
    //     }

    // };
    
    ///accion 
    const setActivarEventEncuesta=(encuestaEvent)=>{//evento creado
     dispatch(activarEvent(encuestaEvent))
    }
    ///////lista encuesta ///

    const listarEncuesta=async()=>{
    
        try {
            const{data}=await noahApi.get('/evaDocente/listEncuesta');
            dispatch(onListarEncuesta(data.data))
           // console.log('data', data.data);
            
        } catch (error) {
            console.log('error al acargar la encuesta ',error);
        }

    }

    ////conexion del api del backen
    const startEncuesta=async(encuestaEvent)=>{
        try {
        //  let response;
            if (encuestaEvent.id){
                await noahApi.put(`/evaDocente/updateEncuesta/${encuestaEvent.id}`, encuestaEvent);
                const data = response.data;
                console.log('data encuesta',data);
                
                if (response && response.data) {
                          // Procesa la respuesta correctamente
                          dispatch(actualizarEncuesta(encuestaEvent))
                          Swal.fire('Éxito', 'Respuesta actualizada correctamente', 'success');
                        } else {
                          console.error('No se recibió una respuesta válida');
                          Swal.fire('Error', 'No se pudo actualizar la encuesta', 'error');
                        }
            }else {
            
                const response = await noahApi.post('/evaDocente/createEncuesta', encuestaEvent);
                //console.log('Crear encuesta con datos:', encuestaEvent);
                if (response && response.data && response.data.encuesta) {
                  const data = response.data;
                  dispatch(addEncuesta({ ...encuestaEvent, id: data.encuesta.id })); // Aquí recibimos el id generado por el backend
                  Swal.fire('Éxito', 'Encuesta creada correctamente', 'success');
                } else {
                 /// console.error('Respuesta no válida al crear encuesta');
                  Swal.fire('Error', 'Error al crear encuesta', 'error');
                }
              }
        }  catch (error) {
              console.error('Error con la encuesta:', error);
              const errorMsg = error.response?.data?.msg || 'Hubo un problema al procesar la solicitud.';
              Swal.fire('Error', errorMsg, 'error');
        } 
    

        const eliminarEncuesta=async()=>{

        }

    }



  return {
     ////propiedades 
     encuetaEvents,
     activeEncuesta,
    // tipoEncuesta,
   //metodos 
   setActivarEventEncuesta,
   listarEncuesta,
   startEncuesta,

   //listarTipoEncuesta,
  }
  
  
}
