const pool = require('../../../../../database/connexion');

async function listarEncuesta(params) {
    try {
        const query=`select 
            e.id,
            e.fecha_creacion,
            e.nombre,
			e.descripcion,
            e.fecha_inicio,
            e.fecha_fin,
            te.nombre as tipo_encuestas,
            e.id_periodo_academico as periodo_academico,
		    e.llave_abreviatura,
            CASE WHEN e.estado IS NULL THEN 'deshabilitada'
            ELSE 'habilitada' END as estado
            from  eva.encuestas e
            LEFT JOIN  eva.encuestas_preguntas ep on e.id=ep.id_encuesta
            inner JOIN eva.tipo_encuestas te on te.id= e.id_tipo_encuesta 
            ORDER BY id desc`
        const result= await pool.query(query);
        //console.log('respuesta', result.rows);
        return result.rows
        
    } catch (error) {
        console.log('error', error); 
    }
}

async function crearEncuesta(params) {   
    try {
        const queryPeriodo=(`SELECT id, periodo, anio FROM periodos_academicos where estado='2' `)
        const result2= await pool.query(queryPeriodo);
        const id_periodo_academico=result2.rows[0].id;
        const{nombre, descripcion,  fecha_inicio, fecha_fin,  id_usuario,  id_tipo_encuesta, llave_abreviatura}=params
        const query= (`insert into eva.encuestas (nombre, descripcion,  fecha_inicio, fecha_fin,  id_usuario, id_periodo_academico, id_tipo_encuesta, llave_abreviatura, estado) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,true);`);
        console.log('respuesta', query);
        const result= await pool.query(query,[nombre, descripcion,  fecha_inicio, fecha_fin,  id_usuario, id_periodo_academico, id_tipo_encuesta, llave_abreviatura]);
        console.log('datos encuesta',result);
        return result.rows
    } catch (error) {
      console.log('este error',error);
    }
}
async function buscarEncuesta(idcuestio) {
    try {
        const id = idcuestio;
        const query='select * from eva.encuestas where id=$1';
        const result= await pool.query(query,[id]);
        return result.rows.length>0;
    } catch (error) {
        console.log('error',error);  
    }
}
async function eliminarEncuesta(params) {
    try {
        const id=params;
        const query='DELETE from eva.encuestas WHERE id=$1';
        const result= await pool.query(query,[id]);
        console.log('resultado', result.row);
        return result.rows
        
    } catch (error) {
        console.log('error', error); 
    } 
}
async function actulizarEncuesta(params) {
    try {
        const queryPeriodo=(`SELECT id, periodo, anio FROM periodos_academicos where estado='2' `)
        const result2= await pool.query(queryPeriodo);
        const id_periodo_academico=result2.rows[0].id;

        const {id, nombre, descripcion,  fecha_inicio, fecha_fin,  id_usuario, id_tipo_encuesta,llave_abreviatura, estado}=params
        
        const query=`UPDATE eva.encuestas set  nombre=$2, 
        descripcion=$3, fecha_inicio=$4, fecha_fin=$5, 
        id_usuario=$6, id_periodo_academico=$7, id_tipo_encuesta=$8, 
        llave_abreviatura=$9, estado=t WHERE id=$1`;
        const result=await pool.query(query,[id, nombre, descripcion,  fecha_inicio, fecha_fin,  id_usuario, id_periodo_academico, id_tipo_encuesta, llave_abreviatura, estado]);
        console.log('respuesta', result.rows);
        return result.rows
    } catch (error) {
        console.log('error',error);
        
    } 
}
async function listarEncuesta(params) {
    try {
        const query=`select 
            e.id,
            e.fecha_creacion,
            e.nombre,
			e.descripcion,
            e.fecha_inicio,
            e.fecha_fin,
            te.nombre as tipo_encuestas,
            e.id_periodo_academico as periodo_academico,
		    e.llave_abreviatura,
            CASE WHEN e.estado IS NULL THEN 'deshabilitada'
            ELSE 'habilitada' END as estado
            from  eva.encuestas e
            LEFT JOIN  eva.encuestas_preguntas ep on e.id=ep.id_encuesta
            inner JOIN eva.tipo_encuestas te on te.id= e.id_tipo_encuesta 
            ORDER BY id desc`
        const result= await pool.query(query);
        //console.log('respuesta', result.rows);
        return result.rows
        
    } catch (error) {
        console.log('error', error); 
    }
}
async function listarTipoEncuesta(params) {
    try {
        const query=`select * from eva.tipo_encuestas`
        const resul=await pool.query(query);
        return resul.rows
    } catch (error) {
        console.log('error en la lista tipo de encuesta ',  error) 
    }
}
async function buscarperiodo(idperiodoacade) {
    try {
        const id=idperiodoacade
        const query='SELECT * FROM public.periodos_academicos WHERE id=$1';
        const result= await pool.query(query,[id])
        return result.rows.length>0;
    } catch (error) {
        
    }
}

module.exports={
    crearEncuesta,
    buscarEncuesta,
    eliminarEncuesta,
    actulizarEncuesta,
    listarEncuesta,
    buscarperiodo,
    listarTipoEncuesta
}