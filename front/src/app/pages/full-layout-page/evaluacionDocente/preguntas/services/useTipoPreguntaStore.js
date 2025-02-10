import { useDispatch, useSelector } from "react-redux"
import { onListartipoPregunta } from "../";
import noahApi from "../../../api/noahApi";


export const useTipoPreguntaStore = () => {
    const dispatch =useDispatch();
   const {tipoPregunta, activeTipoPre}=useSelector(state=>state.tPregunta)
 

   const listaTipoPregunta=async()=>{
    try {
        const{data}=await noahApi.get(`/evaDocente/listTipoPregunta`);
        dispatch(onListartipoPregunta(data.data));
        //console.log('lista de tipo de preguntas bd de tipoPregunta',data);
    } catch (error) {
        console.log('error al cargar tipo de pregunta', error);
        
    }


  }

  return{
    tipoPregunta,
    activeTipoPre,

    /////metodos
    listaTipoPregunta,
  }

}
