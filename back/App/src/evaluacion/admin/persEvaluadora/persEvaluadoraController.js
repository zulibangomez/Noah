const PersonaEvaluadora=require('../persEvaluadora/persEvaluadora.service');

const  getpersEvaluadora=async(req, res)=>{
try {
    const params = req.body;
 
    const result= await PersonaEvaluadora.listarPersonasEvaluadoras(params);
    return res.status(202).json({msg:'lista', data:result})
    
} catch (error) {
    res.json({ok:false,msg:'no lis lispersEvaluadora'}) 
}
    
}

const buscarpersonaEvaluadora = async(req, res)=>{
    try {
        const params=req.body;
       
        const result= await PersonaEvaluadora.buscarpersonaEvaluadora(params);
        return res.status(200).json({msg:'lista personas evaluadoras', data:result});
    } catch (error) {
         res.json({ok:false,msg:' buscar usu Evaluadora'})
    }

}

module.exports={
    getpersEvaluadora,
    buscarpersonaEvaluadora
  
}