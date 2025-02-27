const {response}=require('express');
const EncuestaPregunta=require('./encuestasPreguntas.service')

const getEncuestaPreguntas=async(req, res=response)=>{
    try {
        const { id } = req.params;
        console.log("ID recibido:", id);
        const encuestaRespu=await EncuestaPregunta.listEncuestaPre(id);
        return res.json({ok:true, msg:'listado', data:encuestaRespu})
    } catch (error) {
        console.res.status(500).json({msg:'no se pudo listar'}) 
    }

};

module.exports={
    getEncuestaPreguntas,
}