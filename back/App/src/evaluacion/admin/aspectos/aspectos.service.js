const pool = require('../../../../../database/connexion');


async function Aspectos(params) {
    try {
      const nombre=params.nombre;
    const descripcion=params.descripcion;
    const estado=params.estado;
    //const valorbooleano=params.estado==='true'? true:false;
    
        
      const result= await pool.query(`
    INSERT INTO eva.aspectos (nombre, descripcion, estado)
    VALUES ($1::text, $2::text, $3::boolean);`, [nombre, descripcion, estado]

      )
      console.log('respuesta',result.rows);
      return result.rows;
    } catch (error) {
        console.log('error',error);
    }
    
}

async function lisAapectos(params) {
  try {
    const nombre=params.nombre;
    const descripcion=params.descripcion;
    
    const query ='select * from eva.aspectos order by id  desc';
    const result= await pool.query(query )
      console.log('respuesta',result.rows);
      return result.rows;
    
  } catch (error) {
    console.log('error',error);
  }
}

async function buscarAspecto(aspectoid) {

  try {
    const id=aspectoid;
  
    const query='select * from eva.aspectos where id=$1';
    const result = await pool.query(query,[id]);

    return result.rows.length > 0 ? result.rows[0] : null;
    
  } catch (error) {
    console.log('error',error);
  }
  
}

async function actualizarAspectos(params) {
  
  try {
    const{id, nombre, descripcion }=params;
    console.log('id:', id);
    console.log('nombre:', nombre);
    console.log('descripcion:', descripcion);
   
      

     const query='UPDATE eva.aspectos set nombre =$2, descripcion=$3, estado=$4 where id=$1 RETURNING *';
     const result=await pool.query(query,[id, nombre, descripcion, true])

     if (result.rows.length === 0) {
      console.log('No se encontró el aspecto con ese ID');
      return null; 
             }

     console.log('respuesta', result.rows);
    return result.rows;
  } catch (error) {
    console.log('error',error);
  }
}

async function eliminarAspecto(aspectoid) {
  try {
    const id=aspectoid;
    const query=`DELETE FROM eva.aspectos WHERE id = $1`;
    const resultado=await pool.query(query,[id])

    console.log('resopuesta', resultado.rows);
    return resultado.rows;
    
    
  } catch (error) {
    console.error('Error al eliminar el aspecto', error);
  }
  
}



module.exports={
Aspectos,
lisAapectos,
actualizarAspectos,
buscarAspecto,
eliminarAspecto
}