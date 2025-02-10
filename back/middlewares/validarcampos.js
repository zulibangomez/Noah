const {response}= require('express');
const {validationResult}=require('express-validator')

const validarCampos=(req, res=response, next)=>{
   ///manejo de errores
   const errors=validationResult(req);  
   //console.log(errors);

   if(!errors.isEmpty()){
     return res.status(400).json({
      ok:false,
      errors:errors.mapped()//recorre y muestra el mensaje del error 
       })
    }

next();
}
module.exports={
    validarCampos,
}