import { useState } from "react"
import noahApi from "../../../api/noahApi"


export const useEncuestaPreguntas = () => {
    const [evenEncuestaPre, setevenEncuestaPre] = useState([])
    
    const listarEncuestaPre = async (id) => {
      try {
        console.log("Consultando preguntas con ID:", id);
        const result = await noahApi.get(`/evaDocente/listEncuestaPregunta/${id}`);
        
        console.log("Respuesta completa de la API:", result.data); // 📌 Verifica qué devuelve la API
        
        // Asegurar que `evenEncuestaPre` sea siempre un array
        setevenEncuestaPre(result.data.data || []);
        
      } catch (error) {
        console.error("Error al listar preguntas:", error);
      }
    };
  return {
    evenEncuestaPre,
    listarEncuestaPre

  }
}
