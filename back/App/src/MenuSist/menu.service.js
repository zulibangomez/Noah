const pool = require('../../../database/connexion');
async function listarMenuSit(params) {
    console.log('si llego ');
    
    try {
      const query ='select * from zeus.fn_obtener_menu_usuario(54990)';
      const result= await pool.query(query)
        console.log('respuesta',result.rows);
        return result.rows;
      
    } catch (error) {
      console.log('error',error);
    }
}
  

  module.exports={
    listarMenuSit
  }