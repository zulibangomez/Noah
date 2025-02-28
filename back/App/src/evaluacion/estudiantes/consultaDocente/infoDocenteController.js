const response =require('express');
const InfoDocente = require('../consultaDocente/infoDocente.service');

const datosdocente=async(req, res=response)=>{
    try {
        console.log("req",req);
        
        const params= req.body;
        const codigo=params.codigo

        const result= await InfoDocente.datosdocente(codigo);
        return res.status(200).json({msg:'datos docente::', data:result})
    } catch (error) {
        return res.status(500).json({msg:'no datos docente'});
    }
    
}

module.exports={
    datosdocente
}

