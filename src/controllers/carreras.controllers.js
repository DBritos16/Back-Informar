const carreraSchema = require('../models/carreras.model')
const ctrl = {};


ctrl.getCarrera = async (req, res) => {

    const filtros = req.body
    const { limite, texto } = req.headers

    for (const key in filtros) {
        if (filtros[key].length === 0) {
            delete filtros[key]
        }
    }

    console.log(filtros);

    try {
        if (texto) {
            carreraSchema.find(filtros)
                .find({ nombre: { $regex: texto, $options: "i" } })
                .find({isActive: true})
                .sort({updatedAt: -1})
                .limit(limite)
                .exec((err, carreras) => {
                    if (err) return res.status(400).json({ msg: 'Ha ocurrido un error' })
                    return res.status(200).json(carreras)
                })
        } else {
            carreraSchema.find(filtros)
                .find({isActive: true})
                .sort({updatedAt: -1})
                .limit(limite)
                .exec((err, carreras) => {
                    if (err) return res.status(400).json({ msg: 'Ha ocurrido un error' })
                    return res.status(200).json(carreras)
                })
        }

    } catch (error) {
        res.json({
            msg: 'Ha ocurrido un error'
        })
    }

}


ctrl.getInfoCarrera = async (req, res) => {

    const id = req.params.id

    try {
        const getCarreras = await carreraSchema.findById(id);

        if (!getCarreras) {
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