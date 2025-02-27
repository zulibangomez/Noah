import { useState } from "react"
import noahApi from "../../../api/noahApi"


export const useEncuestaPreguntas = () => {
    const [evenEncuestaPre, setevenEncuestaPre] = useState([])
    const listarEncuestaPre=async(id)=>{
     try {
     const result=await noahApi.get(`evaDocente/listEncuestaPregunta/${id}`);
     console.log("Lista de preguntas recibidas:", result.data);
     setevenEncuestaPre(result.data.data)
        
     } catch (error) {
        console.log('error al listar encuesta pregunta ',error)
     }
     
    }
  return {
    evenEncuestaPre,
    listarEncuestaPre

  }
}
