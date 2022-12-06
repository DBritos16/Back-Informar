const ctrl = {};
const institutoModel = require('../models/intituto.model')

ctrl.getInstitutos = async (req, res)=>{

    const getAllInstitutos = await institutoModel.find({isActive: true}, {contraseña: 0, correo: 0})
    
    if(!getAllInstitutos){
        return res.status(400).json({
            msg: 'Ah ocurrido un error'
        })
    }

    return res.json(getAllInstitutos);


}



ctrl.getInfoInstituto = async (req, res)=>{

    const {id} = req.params

    const getInfoInsituto = await institutoModel.findById({_id: id}, {contraseña: 0, correo: 0})

    if(!getInfoInsituto){
        return res.status(400).json({
            msg: 'Ah ocurrido un error'
        })
    }


    return res.json(getInfoInsituto);

}


module.exports = ctrl;