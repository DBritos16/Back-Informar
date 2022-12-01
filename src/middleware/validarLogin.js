const jwt = require('jsonwebtoken');
const Instituto = require('../models/intituto.model');
const User = require('../models/users.model');

const validarLogin = async (req, res, next) => {

    const { token, role } = req.headers;

    if (!token) {
        return res.status(400).json({
            msg: 'No token received'
        })
    }

    const { uid } = jwt.verify(token, process.env.SECRET);

    try {
        if (role === 'estudiante') {

            const user = await User.findById(uid, {contraseña: 0, role: 0, correo: 0, nombre: 0, apellido: 0})
            console.log(user);
            
            if (!user) {
                return res.status(400).json({
                    msg: 'Error al autenticar'
                })
            }

            if (!user.isActive) {
                res.status(400).json({
                    msg: 'Cuenta deshabilitada'
                })
            }

            req.user = user;

            next();
        } else {
            const { uid } = jwt.verify(token, process.env.SECRET);

            const instituto = await Instituto.findById(uid, { contraseña: 0, descripcion: 0, tipo: 0, ubicacion: 0, contacto: 0, correo: 0 })
            console.log(instituto);

            if (!instituto) {
                return res.status(400).json({
                    msg: 'Error al autenticar'
                })
            }

            if (!instituto.isActive) {
                res.status(400).json({
                    msg: 'Cuenta deshabilitada'
                })
            }

            req.user = instituto;

            next();
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error de autenticacion'
        })
    }

}

module.exports = validarLogin;