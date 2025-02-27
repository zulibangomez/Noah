const {response}=require('express');
const EncuestaPregunta=require('./encuestasPreguntas.service')

const getEncuestaPreguntas=async(req, res=response)=>{
    try {
        const params=req.body;
        const encuestaRespu=await EncuestaPregunta.listEncuestaPre(params);
        return res.json({ok:true, msg:'listado', data:encuestaRespu})
    } catch (error) {
        console.res.status(500).json({msg:'no se pudo listar'}) 
    }

};

module.exports={
    getEncuestaPreguntas,
}