const {response}=require('express');
const Pregunta = require('../preguntas/preguntas.service');
const service = require("../../../login/sesion.service");
const Encuesta=require('./encuesta.service');

const getEncuesta=async(req=response, res)=>{
    try {
        const params=req.body;
        const resul = await Encuesta.listarEncuesta(params);
        return res.status(202).json({msg:'listado cuestionario',data:resul})
        
    } catch (error) {
        res.status(404).json({
            ok:false,
            msg:'no lis cuestionario' })
    }
}
const listarTipoEncuesta=async(req=response, res)=>{
    try {
        const params=req.body;
        const resul= await Encuesta.listarTipoEncuesta(params);
        return res.status(202).json({msg:'lista tipo de encuesta', data:resul})
    } catch (error) {
        console.log('error al listar tipo de encuesta',error);
    }
}
const crearEncuesta=async(req=response, res)=>{ 
    try {
        const params=req.body;
        //console.log('llega encuesta ', params);
        
        // const preguntaid=params.id_pregunta;
        // const usuario=params.id_usuario;
        // const idperiodoacade=params.id_periodo_academico;
        // const existepregunt= await Pregunta.buscarpregunta(preguntaid);
        // const existeusuario= await service.buscarusuario(usuario);
        // const existeperiodo= await Encuesta.buscarperiodo(idperiodoacade);
        // if(!existepregunt){
        //     return res.status(404).json({msg:'no valido id pregunta'})
        // }
        // if (!existeusuario) {
        //     return res.status(404).json({msg:'no valido usuario'})
        // }
        // if (!existeperiodo) {
        //     return res.status(404).json({msg:'no valido periodo'})
        // }
        const result = await Encuesta.crearEncuesta(params);
        return res.status(202).json({msg:'creado Encuesta', data:result})   
    } catch (error) {
        console.log('este es error',error);
        
        res.status(404).json({
            ok:false,
            msg:'no se creao encuesta'

        }) 
    }
    
}

const actualizarEncuesta=async(req=response, res)=>{
    
    
    try {
        const params=req.body;
        console.log('actualizarrrrrrr encuesta',params );
       // console.log('llega info encuestaddd', params);
        
        // const idcuestio=params.id;
        // const preguntaid=params.id_preguntas;
        // const usuario=params.id_usuario;
        // const idperiodoacade=params.id_periodo_academico;
        // const existecuestio= await Encuesta.buscarEncuesta(idcuestio);
        // const existepregunt= await Pregunta.buscarpregunta(preguntaid);
        // const existeusuario= await service.buscarusuario(usuario);
        // const existeperiodo= await Encuesta.buscarperiodo(idperiodoacade);
        // if (!existecuestio) {
        //     return res.status(404).json({msg:'no valido id cuestionario'})
        // }
    
        // if(!existepregunt){
        //     return res.status(404).json({msg:'no valido id pregunta'})
        // }
        // if (!existeusuario) {
        //     return res.status(404).json({msg:'no valido usuario'})
        // }
        // if (!existeperiodo) {
        //     return res.status(404).json({msg:'no valido periodo'})
        // }
        const result = await Encuesta.actulizarEncuesta(params);
        return res.status(202).json({msg:'actualizado cuestionario', data:result}) 
        
    } catch (error) {
        console.log('error',error);
        res.json({
            ok:false,
            msg:'actualizar encuesta'
        })
    }
   
}
 const eliminarEncuesta=async(req=response, res)=>{
    try {
        const params=req.body;
        const idcuestio=params.id;
        const existeCuestio= await Encuesta.buscarEncuesta(idcuestio);
        if (!existeCuestio) {
            return res.status(404).json({msg:'no valido no existe custionario'})    
        }
        const result= await Encuesta.eliminarEncuesta(idcuestio);
        return res.status(200).json({msg:'eliminado', data:result})
        
    } catch (error) {
        res.json({
            ok:false,
            msg:'eliminarencuesta'
        })
    }
    
 }

 module.exports={
    crearEncuesta,
    getEncuesta,
    actualizarEncuesta,
    eliminarEncuesta,
    listarTipoEncuesta
 }