const response =require('express');
const ListEncuesta = require('../listarEncuestas/listEncuesta.service');
const {AddPersonasEvaluadas, AddPersonasEvaluadoras, AddResultados} = require('../listarEncuestas/listEncuesta.service');
const TipoPregunta = require('../listarEncuestas/listEncuesta.service');

// ---------------------- lista preguntas y respuestas ----------------------//
const listencuesta=async(req, res=response)=>{
    try {
        console.log("Ubicados en el listEncuestaController: req",req);

        const params=req.body;
        console.log('esto llega en el params: ',params);
        
        const llave=params.llave
        
        const result= await ListEncuesta.listencuesta(llave);
        return res.status(200).json({msg: 'Lista de Encuentas', data:result})
    } catch (error) {
        return res.status(500).json({msg: 'Erro en el servidor, no se obtuvo la lista de Encuestas'})
    }
}

// ---------insert -> personas_evaluadas, personas_evaluadoras, resultados ----------//
const addencuesta = async (req, res) => {
    try {
        console.log("Ubicados en el listEncuestaController - addEncuesta: req", req.body);

        const { evaluadas, evaluadoras, resultados } = req.body;
        let response = {};

        if (evaluadas && Object.keys(evaluadas).length > 0) {
            const resultEvaluadas = await AddPersonasEvaluadas(evaluadas);
            response.personas_evaluadas = resultEvaluadas;
        }

        if (evaluadoras && Object.keys(evaluadoras).length > 0) {
            const resultEvaluadoras = await AddPersonasEvaluadoras(evaluadoras);
            response.personas_evaluadoras = resultEvaluadoras;
        }

        if (resultados && Object.keys(resultados).length > 0) {
            const resultResultados = await AddResultados(resultados);
            response.resultados = resultResultados;
        }

        console.log("Datos insertados en la BD:", response);

        return res.status(200).json({
            msg: 'Datos guardados correctamente',
            data: response
        });

    } catch (error) {
        console.error("Error en addEncuesta:", error);
        return res.status(500).json({
            msg: 'Error en el servidor, no se pudieron insertar los datos',
            error: error.message
        });
    }
};




module.exports={
    listencuesta,
    addencuesta,
}