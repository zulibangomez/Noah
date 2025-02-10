const {response}= require('express');
const jwt=require('jsonwebtoken');

const validarJWT=(req, res=response, next)=>{
    //token en ek header
    const token=req.header('x-token');
    //console.log(token)
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        })

    }
    try{
        const { id, nombre, id_usuario } = jwt.verify(token, process.env.SECRET_JWT_SEED); // Decodifica el token
        req.id = id; // Asigna los datos al request
        req.nombre = nombre;
        req.id_usuario=id_usuario;
        next();

    }catch(error){
        console.error('Error al validar el token:', error);
        return res.status(401).json({
            ok: false,
            msg:'TOKEN NO VALIDO '
        });

    }
    next();
 
}

module.exports={
    validarJWT
}
