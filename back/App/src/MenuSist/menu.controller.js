const MenuService= require('./menu.service');

const {response}=require('express');

const obtenerMenu=async(req, res= response)=>{

    
    
    try {
        const params=(req.body)
        const lista= await MenuService.listarMenuSit(params)
        return res.json({ok:true,msg:'listado', dato:lista });
        
    } catch (error) {
       return res.status(500).json({msg:'no se pudo listar'}) 
    }
    
}

module.exports={
    obtenerMenu

}