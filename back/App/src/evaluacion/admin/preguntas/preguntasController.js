const {response} = require('express');
const Pregunta= require('./preguntas.service');
const Aspecto= require('../aspectos/aspectos.service');
const Respuesta=require('../respuestas/respuestas.service');

const getPreguntas=async(req=response, res)=>{
    try {
        const listapreguntas=await Pregunta.listapregunta(req);
        return res.status(200).json({msg:'lis pregunta', data:listapreguntas})
        
    } catch (error) {
        res.json({
            ok:true,
            msg:'getpreguntas'
        })
    } 
}
const getTipoPreguntas=async(req=response, res)=>{
    try {
        const listaTipopreguntas=await Pregunta.listaTipoPregnta(req);
        return res.status(200).json({msg:'lis pregunta', data:listaTipopreguntas})
        
    } catch (error) {
        res.status(500).json({msg:'no se pudo listar el tipo pregunta', error })
    } 
}



const crearPreguntas=async(req, res)=>{
    try {
        const params= req.body;
       
        
       
        const tipopreid=params.id_tipo_pregunta;
        ///se validara el id si existeen tipo pregunta
       
        const existetipo= await Pregunta.buscartipopregunta(tipopreid);
      
        if(!existetipo){
            return res.status(404).json({msg:'tipo de pregunta no valido'})
        }

        console.log('Creando pregunta');
        const pregunta = await Pregunta.crearPregunta(params);
        console.log('Pregunta creada', pregunta);
        return res.status(200).json({ msg: 'preguntas', data: pregunta });
        
    } catch (error) {
        console.error('Error en crearPreguntas', error);
        res.status(500).json({msg:'no se pudo crear preguntas'})
    }
   
}



const actualizarPreguntas=async(req, res )=>{
    try {
        const params=req.body;
        const preguntaid=params.id;
        const tipopreid=params.id_tipo_pregunta;
        const existePregunta=await Pregunta.buscarpregunta(preguntaid);
        const existetipo= await Pregunta.buscartipopregunta(tipopreid);
        if(!existePregunta){
            return res.status(404).json({msg:'no existe pregunta '})
        }
        if(!existetipo){
            return res.status(404).json({msg:'tipo de pregunta no valido'})
        }
        const result= await Pregunta.actualizarPregunta(params)
        return res.status(200).json({msg:'pregunta actualizada', data:result});
    } catch (error) {
        res.statu(500).json({
            ok:true,
            msg:'no se actualizo preguntas'
        })
    }
   
}
const eliminarPreguntas = async(req, res  )=>{
    try {
        console.log("Parámetros recibidos:", req.params);
        const preguntaid = parseInt(req.params.id, 10);  // Convertir el ID a número
        if (isNaN(preguntaid) || preguntaid <= 0) {
          // Si no es un número válido, lanzamos un error
          return res.status(400).json({ mensaje: 'El ID debe ser un número válido' });
        }
        
        const existePregunta=await Pregunta.buscarpregunta(preguntaid);
        if(!existePregunta){
            return res.status(404).json({msg:'no existe pregunta '})
        }
        const preguntaUtilizada= await Respuesta.respuestaPorPregunta(preguntaid)
        if (preguntaUtilizada.length > 0) {
            return res.status(400).json({msg:'no se puede elimira la pregunta, '});
        }
        const result= await Pregunta.eliminarPregunta(preguntaid);
        return res.status(200).json({msg:'se elimino las preguntas',data:result})
    } catch (error) {
        res.status(500).json({ok:false,msg:'no se elimino preguntas'})
    }

   
}
const buscarpreguntaPorAaspecto=async(req, res= response)=>{
    try {
      const params=(req.body);
      const aspectoid=params.id_aspectos;
      const aspecto= await Pregunta.buscarPreguntaPorAspeto(aspectoid);
      if (!aspecto || aspecto.length === 0) {
        return res.status(404).json({ msg: 'No existe Aspecto o no tiene preguntas asociadas' });
      }
      
      return res.status(200).json({msg:'preguntas por aspecto',data:aspecto}); 
    } catch (error) {
      console.error(error);
        return res.status(500).json({ mensaje: 'Error id aspecto' });
    }
       
  }

module.exports={
    getPreguntas,
    crearPreguntas,
    actualizarPreguntas,
    eliminarPreguntas,
    buscarpreguntaPorAaspecto,
    getTipoPreguntas

}