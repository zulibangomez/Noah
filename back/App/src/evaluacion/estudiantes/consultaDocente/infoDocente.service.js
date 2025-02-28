const pool = require('../../../../../database/connexion');

async function datosdocente(codigo) {
    try {
        /// const codigo=params;
            const query=`select 
            p.numero_identificacion as "identificacion estudiant",
            "_getpersonname"(p.numero_identificacion) as nombres_completos_est,
            e.codigo,
            "_getsemestre"(sg.id) as semestre_general,
            pd.numero_identificacion as "Identificacion Docente",
            "_getpersonname"(pd.numero_identificacion) as nombres_completos_docent, 
            "_getsemestre"(s.id) as semestre_asignatura,
            a.nombre,
            pd.id as id_docente,
            d.id as idDocente

            from personas p 
            INNER JOIN estudiantes e on p.id=e.id_persona
            INNER JOIN zeus.matriculas m on e.id=m.id_estudiante
            INNER JOIN zeus.asignaturas_matriculas am on m.id=am.id_matricula
            INNER JOIN asignacion_academica aa on am.id_asignacion_academica=aa.id
            INNER JOIN docentes d on aa.id_docente=d.id
            INNER JOIN personas pd on d.id_persona=pd.id
            INNER JOIN asignaturas_plan_estudios ape on aa.id_asignaturas_plan_estudios=ape.id
            INNER JOIN asignaturas a on ape.id_asignatura=a.id
            INNER JOIN semestres s on aa.id_semestre=s.id
            INNER JOIN semestres sg on m.id_semestre=sg.id
            where 
            --e.codigo='2241303069' 
            e.codigo=$1 
            and m.id_periodo_academico=(selecT valor::int from parametros_generales where id=32)
            and am.estado=true
            and am.tipo_adicion_cancelacion->>'valor'!='3' `;
        const result= await pool.query(query, [codigo]);
        console.log('respuesta',result.rows);
        return result.rows;
        
    } catch (error) {
        console.log('error', error);
    }
    
}
module.exports={
    datosdocente
}

