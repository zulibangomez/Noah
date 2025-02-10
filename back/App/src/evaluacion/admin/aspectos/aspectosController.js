//const express=require('express');
const Aspecto= require('./aspectos.service');
const Pregunta = require('../preguntas/preguntas.service');
const {response}=require('express');

const getAspectos=async(req, res= response)=>{
    try {
        const params=(req.body)
        const aspecto= await Aspecto.lisAapectos(params)
        return res.json({ok:true,msg:'listado', data:aspecto });
        
    } catch (error) {
       return res.status(500).json({msg:'no se pudo listar'}) 
    }
    
}
const buscarAspectos=async(req, res= response)=>{
  try {
    const params=(req.body)
    const aspectoid=params.id
    const aspecto= await Aspecto.buscarAspecto(aspectoid)
    return res.status(404).json(aspecto);  
  } catch (error) {
    return res.status(500),json({msg:"no se realizo la biusqueda"});
  }
   
}

const crearAspectos= async(req, res= response)=>{
   try {
    const params=(req.body)
    const aspecto = await Aspecto.Aspectos(params)
   
    res.json({
        ok:true,
        msg:'aspecto creado',
        aspecto
    });
  
   } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'no se pudo guardar aspecto '
    })
   }
}

const actualizarAspectos = async (req, res) => {

    try {
        const params=(req.body);
        const aspectoid=(params.id);
        
        const aspectoExiste = await Aspecto.buscarAspecto(aspectoid);
        if (!aspectoExiste) {
          return res.status(404).json({ mensaje: 'Aspecto no encontrado' });
        }
      const resultado = await Aspecto.actualizarAspectos(params);
      
      return res.json({ mensaje: 'Aspecto actualizado', data: resultado });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al actualizar el aspecto' });
    }
};

const eliminarAspectos= async(req, res= response)=>{
   try {
    //const params=(req.body);
    //const aspectoid=params.id;
    console.log("Parámetros recibidos:", req.params);
    const aspectoid = parseInt(req.params.id, 10);  // Convertir el ID a número
    if (isNaN(aspectoid) || aspectoid <= 0) {
      // Si no es un número válido, lanzamos un error
      return res.status(400).json({ mensaje: 'El ID debe ser un número válido' });
    }
    
    const aspectoExiste=await Aspecto.buscarAspecto(aspectoid);

    if(!aspectoExiste){
        return res.status(404).json({ mensaje: 'Aspecto no encontrado' });
    }

    const aspectoUtilizadoFor= await Pregunta.buscarPreguntaPorAspeto(aspectoid);
    if (aspectoUtilizadoFor.length > 0) {
        return res.status(400).json({msg:'no se puede elimira el aspecto porque tiene preguntas asociadas al aspecto'});
        
    }

    const resultado = await Aspecto.eliminarAspecto(aspectoid);
    return res.status(200).json({ mensaje: 'Aspecto eliminado', data: resultado });

   } catch (error) {
    console.error(error);
    
    res.status(500).json({
        msg:'no se elimino Aspectos'
    })
   }
}

module.exports={
   getAspectos,
    crearAspectos,
    actualizarAspectos,
    eliminarAspectos,
    buscarAspectos
   
}


