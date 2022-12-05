const ctrl = {};
const institutoModel = require('../models/intituto.model')

ctrl.getInstitutos = async (req, res)=>{

    const getAllInstitutos = await institutoModel.find({isActive: true})
    
   /*  if(!getAllInstitutos){
        return res.status(400).json({
            msg: 'Ah ocurrido un error'
        })
    } */

    return res.json(getAllInstitutos);


}


module.exports = ctrl;