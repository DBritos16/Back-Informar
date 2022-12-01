const carrerasModel = require("../models/carreras.model");

const incrementarVista = async (req, res, next) =>{
    const carrera = await carrerasModel.findById(req.params.id)

    const sumarVista = await carrerasModel.findByIdAndUpdate(req.params.id, {visitas: carrera.visitas+1})

    console.log(sumarVista);

    next()

}


module.exports = incrementarVista;