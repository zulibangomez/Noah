//se instala el moment para para validar fechas 
const moment = require('moment');

const isDate=(value)=>{
    if (!value){
        return false;

    }
    const fecha=moment(value, moment.ISO_8601, true);

    
  // Retorna true si es válida y está en formato ISO 8601
  return fecha.isValid();
};

module.exports={isDate};