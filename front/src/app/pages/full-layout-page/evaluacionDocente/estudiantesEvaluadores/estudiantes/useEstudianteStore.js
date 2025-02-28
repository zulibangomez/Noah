import noahApi from '../../../api/noahApi';
import { useState } from 'react';



export const useEstudianteStore = () => { 
    const [evaluador, setEvaluador] = useState([]);

    const buscar = async (codigo) => {
            console.log("codigo url",codigo);
            
        try {
            const respuesta = await noahApi.post(`/evaDocente/doc/${codigo}`,{codigo});
            console.log('Lista de evaluadores:', respuesta.data);
            
            if (Array.isArray(respuesta.data.data)) {
                setEvaluador(respuesta.data.data);
            } else {
                console.warn("La respuesta no es un array:", respuesta.data);
            }
        } catch (error) {
            console.error('Error al buscar evaluadores:', error);
        }
    };

    return { evaluador, buscar };
};
