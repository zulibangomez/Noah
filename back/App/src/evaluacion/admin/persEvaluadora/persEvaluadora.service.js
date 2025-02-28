const pool = require('../../../../../database/connexion');

async function listarPersonasEvaluadoras(params) {
    try {
        const query='select * from eva.personas_evaluadoras';
        const result= await pool.query(query)
        console.log('respuesta', result.rows);
        return result.rows;
    } catch (error) {
        console.log('error', error);
        
    }
    
}

async function buscarpersonaEvaluadora(params) {
    try {
        const id=params.id;
        const query=`select p.id, e.id as idestudiante, e.codigo, "_getpersonname"(p.numero_identificacion) as nombres,
         evaper.id from personas p INNER JOIN estudiantes e on e.id_persona=p.id INNER JOIN eva.personas_evaluadoras evaper on evaper.id_persona= e.id_persona
          where evaper.id=$1`;
        const result= await pool.query(query, [id]);
        console.log('respuesta', result.rows);
        
        return result.rows
    } catch (error) {
        console.log('errpor', error);
        
    }
    
}
async function desifrar(params) {
  
    
}
module.exports={
    buscarpersonaEvaluadora,
    listarPersonasEvaluadoras
}