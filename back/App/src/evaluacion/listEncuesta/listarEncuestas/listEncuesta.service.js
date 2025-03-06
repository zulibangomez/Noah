const pool = require("../../../../../database/connexion");

// listar preguntas-respuestas.
async function listencuesta(llave) {
  console.log(
    "Ubicados en el listEncuestaservice, esto recibe el backend:",
    llave
  );
  try {
    const query = `
                SELECT json_build_object(
    'id_encuesta', e.id,
    'nombre_encuesta', e.nombre,
    'descripcion_encuesta', e.descripcion,
    'nombre_tipo_encuesta', te.nombre,
    'llave_abreviatura', e.llave_abreviatura,
    'aspectos', COALESCE((
        SELECT json_agg(aspecto_json ORDER BY aspecto_json.orden_preguntas DESC)
        FROM (
            SELECT 
                asp.id AS id_aspecto,
                asp.nombre AS nombre_aspecto,
                asp.descripcion AS descripcion_aspecto,
                MAX(ep.orden_pregunta) AS orden_preguntas, -- Se usa para el ORDER BY
                (
                    SELECT json_agg(pregunta_json ORDER BY pregunta_json.orden_preguntas ASC)
                    FROM (
                        SELECT 
                            pt.id AS id_pregunta,
                            ep.orden_pregunta AS orden_preguntas,
                            pt.titulo AS titulo_pregunta,
                            pt.subtitulo AS subtitulo_pregunta,
                            tp.nombre AS tipo_pregunta,  -- Se obtiene desde encuestas_preguntas
                            tp.tipo_dato as tipo_de_dato,
                            (
                                -- Agrupar todas las respuestas de una pregunta en un solo array
                                SELECT json_agg(
                                    json_build_object(
                                        'id_respuesta', ors.id,
                                        'nombre_opcion_respuesta', ors.nombre,
                                        'valor_opcion_respuesta', ors.valor,
                                        'id_encuesta_pregunta', ep2.id

                                    )
                                ) 
                                FROM eva.opciones_respuestas ors
                                JOIN eva.encuestas_preguntas ep2 
                                    ON ep2.id_opciones_respuestas = ors.id
                                WHERE ep2.id_pregunta = pt.id
                            ) AS opciones_respuesta
                        FROM eva.preguntas pt
                        JOIN eva.encuestas_preguntas ep ON pt.id = ep.id_pregunta
                        LEFT JOIN eva.tipo_preguntas tp ON ep.id_tipo_pregunta = tp.id  -- Cambio aquí
                        WHERE ep.id_aspecto = asp.id
                        GROUP BY pt.id, ep.orden_pregunta, pt.titulo, pt.subtitulo, tp.nombre, tp.tipo_dato
                    ) AS pregunta_json
                ) AS preguntas
            FROM eva.aspectos asp
            JOIN eva.encuestas_preguntas ep ON asp.id = ep.id_aspecto
            WHERE ep.id_encuesta = e.id
            GROUP BY asp.id, asp.nombre, asp.descripcion
        ) AS aspecto_json
    ), '[]'::json)
) AS resultado_json
FROM eva.encuestas e
LEFT JOIN eva.tipo_encuestas te ON e.id_tipo_encuesta = te.id 
WHERE e.llave_abreviatura = $1
  AND e.estado = TRUE
GROUP BY e.id, te.nombre;

    `;
    const result = await pool.query(query, [llave]);
    console.log("respuesta de result.rows", result.rows);
    return result.rows;
  } catch (error) {
    console.log("error", error);
    console.log("Query ejecutado, resultados: ", result.rows);
  }
}

//insertar personas_evaluadas
async function AddPersonasEvaluadas(evaluadas) {
  try {
    console.log(
      "Recibiendo respuestas para guardar en la tabla AddPersonas_Evaluadas:",
      evaluadas
    );

    const {
      id_persona,
      id_encuesta,
      id_docente,
      id_asignacion_academica,
      id_personas_externas,
    } = evaluadas;

    const {rows} = await pool.query(
      `
          INSERT INTO eva.personas_evaluadas (id_persona, id_encuesta, id_docente, id_asignacion_academica, id_personas_externas) 
          VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
      [
        id_persona,
        id_encuesta,
        id_docente,
        id_asignacion_academica,
        id_personas_externas,
      ]
    );
    return rows[0]?.id;
  } catch (error) {
    console.error("Error al insertar en AddPersonasEvaluadas:", error);
    throw error;
  }
}

// insertar personas_evaluadoras
async function AddPersonasEvaluadoras(evaluadoras) {
  try {

    const { id_persona, id_estudiante, id_persona_externa } = evaluadoras;

    const  {rows}  = await pool.query(
      `
          INSERT INTO eva.personas_evaluadoras (id_persona, id_estudiante, id_persona_externa) 
          VALUES ($1, $2, $3) RETURNING id ;`,
      [id_persona, id_estudiante, id_persona_externa]
    );

    return rows[0]?.id;
  } catch (error) {
    console.error("Error al insertar en AddPersonasEvaluadoras:", error);
    throw error;
  }
}

// insert resultado
async function AddResultados(resultados,IdPersona_evaludadora,IdPersona_evaluada,) {
  try {

    const result = await pool.query(
      `
          INSERT INTO eva.resultados (fecha_resultado, id_encuesta_pregunta, resultado_adicional, promedio, id_persona_evaluadora, id_persona_evaluada) 
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ;`,
      [
       'now()',
        resultados.idEncuestaPregunta,
        resultados.resultadoAdd,
        resultados.promedio,
        IdPersona_evaludadora,
        IdPersona_evaluada
      ]
    );

    console.log("Respuesta AddResultados: ", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error al insertar en AddResultados:", error);
    throw error;
  }
}


module.exports = {
  listencuesta,
  AddPersonasEvaluadas,
  AddPersonasEvaluadoras,
  AddResultados,
};
