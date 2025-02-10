const pool = require('../../../../../database/connexion');
async function infoEstudiantes(codigo) {
    try {
    ////const id= params;
        const query=`select 
            p.numero_identificacion as "identificacion estudiant",
            "_getpersonname"(p.numero_identificacion) as nombres_completos_est,
            e.codigo,
            estado.nombre as estado,
            "_getsemestre"(sg.id) as semestre_general,
            prg.nombre
            from personas p 
            INNER JOIN estudiantes e on p.id=e.id_persona
            INNER JOIN zeus.matriculas m on e.id=m.id_estudiante
            INNER JOIN semestres sg on m.id_semestre=sg.id
            inner join estados_estudiantes estado on e.id_estado_estudiante= estado.id
            INNER JOIN programas prg on e.id_programa=prg.id
            where 
            e.codigo=$1 
            and m.id_periodo_academico=(selecT valor::int from parametros_generales where id=32)
            and m.confirmacion=true`
        const resultado = await pool.query(query,[codigo]);
        console.log('respuesta', resultado.rows);
        
        return resultado.rows
        
    } catch (error) {
        console.log('error', error);
        
    }
    
}
module.exports={
    infoEstudiantes
}