const carreraSchema = require('../models/carreras.model')
const ctrl = {};


ctrl.getCarrera = async (req, res)=>{

    try {
        const getCarreras = await carreraSchema.find({isActive: true});

        res.json(getCarreras);

    } catch (error) {
        res.json(`Ha ocurrido un error: ${error}`)
    }

}


ctrl.getInfoCarrera = async (req, res)=>{

    const id = req.params.id

    try {
        const getCarreras = await carreraSchema.findById(id);

        if(!getCarreras){
            return res.status(404).json({
                msg: 'No se encontraron resultados'
            })
        }
        res.json(getCarreras);

    } catch (error) {
        console.log(error);
        res.status(400).json('Ha ocurrido un error')
    }

}

module.exports = ctrl;