const pool=require('../../../../../database/connexion');

async function listEncuestaPre(id) {
    try {
        const query=`select 
        epre.id,
        pre.titulo AS pregunta,
        en.nombre AS encuesta,
        asp.nombre AS aspecto,
        opres.nombre AS opciones_respuestas
        from eva.encuestas_preguntas epre
        INNER JOIN eva.aspectos asp on asp.id=epre.id_aspecto
        INNER JOIN eva.preguntas pre on pre.id=epre.id_pregunta
        INNER JOIN eva.encuestas en on en.id=epre.id_encuesta
        inner JOIN eva.opciones_respuestas opres on opres.id=epre.id_opciones_respuestas
        where en.id=$1 ;  `;
        const resul=await pool.query(query,[id]);
        console.log('resultado', resul.rows);
        return resul.rows
    } catch (error) {
        console.log('error en evaluacon pregunat',error);
    }   
};

module.exports={
    listEncuestaPre,
}