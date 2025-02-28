import { useState } from "react"
import noahApi from "../../../api/noahApi"


export const useEncuestaPreguntas = () => {
    const [evenEncuestaPre, setevenEncuestaPre] = useState([])

    const listarEncuestaPre = async (id) => {
      try {
        console.log("Consultando preguntas con ID:", id);
        
        const response = await noahApi.get(`/evaDocente/listEncuestaPregunta/${id}`);
        
        console.log("Respuesta cruda de la API:", response);
        const data = response.data; 
    
        console.log("Respuesta completa de la API:", data);
    
        if (data.ok && Array.isArray(data.data)) {
          setevenEncuestaPre(data.data); 
        } else {
          console.error("Los datos recibidos no son un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener preguntas:", error);
      }
    };
  return {
    evenEncuestaPre,
    listarEncuestaPre

  }
}
