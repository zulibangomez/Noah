import { useState } from "react";
import noahApi from "../../../api/noahApi";


export const useListaTipoEncuesta = () => {
    const [tipoEncuesta, settipoEncuesta] = useState([])

    const listarTipoEncuesta = async()=>{
        try {
            const respuesta= await noahApi.get('/evaDocente/listTipoEncuesta');
            console.log('lista', respuesta.data );
            settipoEncuesta(respuesta.data.data);//guarda los datos en el estado 
        } catch (error) {
            console.log('error al caragar la lista tipo encuesta',error);
            
        }

    };


  return {
    tipoEncuesta,
    ////metodo
    listarTipoEncuesta
};
};
