const jwt = require('jsonwebtoken');
const Instituto = require('../models/intituto.model')

const validarInstituto = async (req, res, next) => {

    const token = req.headers.token;

    if (!token) {
        return res.status(400).json({
            msg: 'No token received'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET);

        if(!uid){
            return res.status(400).json({
                msg: 'Sesion expirada'
            })
        }
        
        const instituto = await Instituto.findById(uid, {contraseña: 0, descripcion: 0, tipo: 0, ubicacion: 0, contacto: 0, correo: 0})

        if(!instituto){
            return res.status(400).json({
                msg: 'Error al autenticar'
            })
        }

        if(!instituto.isActive){
            res.status(400).json({
                msg: 'Cuenta deshabilitada'
            })
        }

        req.instituto = instituto;

        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error de autenticacion'
        })
    }

}

module.exports = validarInstituto;