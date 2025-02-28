import { useState } from "react";
import noahApi from "../../../api/noahApi";


export const useListEncuestaStore = () => { 
    const [encuesta, setEncuesta] = useState([]);
    const [tipoPreguntas, setTipoPreguntas] = useState([]);

    const listarEncuesta = async (llave) => {
            console.log("Llave encuesta: ",llave);
            
        try {
            const respuesta = await noahApi.post(`/evaDocente/listEncuesta/${llave}`,{llave});
            console.log('Lista de Encuesta:', respuesta.data);
            
            if (respuesta.data.data && respuesta.data.data.length > 0) {
                setEncuesta(respuesta.data.data.map(item => item.resultado_json));
            } else {
                console.warn("La estructura del JSON no es la esperada:", respuesta.data);
            }
            
        } catch (error) {
            console.error('Error al buscar evaluadores:', error);
        }
    };

    const AddEncuesta = async (evaluadas, evaluadoras, resultados) => {
        try {
            const respuesta = await noahApi.post(`/evaDocente/addListEncuesta/${evaluadas.id_encuesta}`, {
                evaluadas,
                evaluadoras,
                resultados
            });

            console.log("Encuesta agregada con éxito:", respuesta.data);
            return respuesta.data;
        } catch (error) {
            console.error("Error al agregar la encuesta:", error.message);
        }
    };
    
    const listarTipo_pregunta = async (tipo) => {
        console.log("Tipo de pregunta: ", tipo);
        try {
            const respuesta = await noahApi.post(`/evaDocente/listTipoPreguntas`, { tipo });
            console.log('Lista de Tipo de Pregunta:', respuesta.data);
            
            if (respuesta.data.data && respuesta.data.data.length > 0) {
                setTipoPreguntas(respuesta.data.data);
            } else {
                console.warn("No se encontraron tipos de preguntas:", respuesta.data);
            }
        } catch (error) {
            console.error('Error al buscar tipos de preguntas:', error);
        }
    };

    return { encuesta, listarEncuesta, AddEncuesta, tipoPreguntas, listarTipo_pregunta};
};
