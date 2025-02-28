const pool = require("../../../../../database/connexion");

async function datosdocente(codigo) {
  console.log('Esto se recibe en backend, codigo:', codigo);
  
  try {
    /// const codigo=params;
    const query = `
    SELECT 
    ti.abreviatura||' - '||p.numero_identificacion AS identificacion_estudiant,
    "_getpersonname"(p.numero_identificacion) AS nombres_completos_est,
    e.codigo,
    estado.nombre AS estado,
		pe.numero_plan||' - '|| j.label as plan_estudio,
    "_getsemestre"(sg.id) AS semestre_general,
    ti.abreviatura||' - '||pd.numero_identificacion AS Identificacion_Docente,
    "_getpersonname"(pd.numero_identificacion) AS nombres_completos_docent, 
    "_getsemestre"(s.id) AS semestre_asignatura,
    a.nombre,
    pd.id AS id_persona,
    d.id AS id_docente,
		pro.nombre as nombre_programa,
		aa.id as id_asignacion_academica,
		m.id_estudiante,
	'EVADOCENTEPROD' as llave_encuesta,
		   case
                when eep.nombre_documento is not null then 'https://appiruah.unicesmag.edu.co/api/upload/'||(ltrim(eep.ruta_documento||eep.nombre_documento,'./public/uploads'))
                when eep.ruta_documento is not null then 'https://appiruah.unicesmag.edu.co/api/upload/'||(ltrim(eep.ruta_documento,'./public/uploads'))
                when p.ruta_foto is null then '' else 'https://zeusacad.unicesmag.edu.co/'||p.ruta_foto
                end as "ruta_foto_estudiante",
			case
                when eepd.nombre_documento is not null then 'https://appiruah.unicesmag.edu.co/api/upload/'||(ltrim(eepd.ruta_documento||eepd.nombre_documento,'./public/uploads'))
                when eepd.ruta_documento is not null then 'https://appiruah.unicesmag.edu.co/api/upload/'||(ltrim(eepd.ruta_documento,'./public/uploads'))
                when pd.ruta_foto is null then '' else 'https://zeusacad.unicesmag.edu.co/'||pd.ruta_foto
                end as "ruta_foto_docente"					
		FROM personas p 
		INNER JOIN tipos_identificacion ti on p.id_tipo_identificacion=ti.id
		INNER JOIN estudiantes e ON p.id = e.id_persona
		INNER JOIN estudiantes_plan ep on ep.id_estudiante=e.id
		INNER JOIN planes_estudio pe on ep.id_plan_estudio=pe.id
		INNER JOIN jornadas j on pe.jornada::int=j.id
		INNER JOIN zeus.matriculas m ON e.id = m.id_estudiante
		INNER JOIN zeus.asignaturas_matriculas am ON m.id = am.id_matricula
		INNER JOIN asignacion_academica aa ON am.id_asignacion_academica = aa.id
		INNER JOIN docentes d ON aa.id_docente = d.id
		INNER JOIN personas pd ON d.id_persona = pd.id
		INNER JOIN asignaturas_plan_estudios ape ON aa.id_asignaturas_plan_estudios = ape.id
		INNER JOIN asignaturas a ON ape.id_asignatura = a.id
		INNER JOIN semestres s ON aa.id_semestre = s.id
		INNER JOIN semestres sg ON m.id_semestre = sg.id
		INNER JOIN estados_estudiantes estado ON e.id_estado_estudiante = estado.id  
		LEFT JOIN zeus.expediente_estudiante eep ON p.id = eep.id_persona AND eep.tipo_documento = '5'-- el estudiante
		LEFT JOIN zeus.expediente_estudiante eepd ON pd.id = eepd.id_persona AND eepd.tipo_documento = '5'-- el docente
		INNER JOIN programas pro on e.id_programa = pro.id
		WHERE 
    --- md5 con $1
    md5(e.id_persona::text||' '||p.numero_identificacion::text||' '||e.id||' '||e.codigo::text||'EVADOCENTEPROD')= $1 
	  --- md5 con un codigo
		-- md5(e.id_persona::text||' '||p.numero_identificacion::text||' '||e.id||' '||e.codigo::text||'EVADOCENTEPROD')= 'bd259ede129439e3c0c54d647137f432'
		--- e.codigo=$1 
    AND m.id_periodo_academico = (SELECT valor::int FROM parametros_generales WHERE id = 32)
    AND am.estado = TRUE
    AND am.tipo_adicion_cancelacion->>'valor' != '3'
    `;
    const result = await pool.query(query, [codigo]);
    console.log("respuesta", result.rows);
    return result.rows;
  } catch (error) {
    console.log("error", error);
    console.log("Query ejecutada, resultados:", result.rows);

  }
}
module.exports = {
  datosdocente,
};
    