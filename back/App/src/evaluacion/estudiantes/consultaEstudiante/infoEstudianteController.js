const InfoEstudiante =require('./infoEstudiante.service');

const datosEstudiante=async(req, res)=>{
try {
    const params =req.body
    const codigo=params.codigo;
    
    const resultado = await InfoEstudiante.infoEstudiantes(codigo);
    return res.status(202).json({msg:'informacion de estudiante', data:resultado})
    
} catch (error) {
    return res.status(404).json({msg:'no existe estudiante'})
    
}
}

module.exports={
    datosEstudiante

}