const User = require('../models/users.model')
const Insituto = require('../models/intituto.model')
const bcrypt = require('bcrypt');
const generarJWT = require('../helpers/generarJWT');
const ctrl = {};

ctrl.register = async (req, res) => {

    const { nombre, apellido, usuario, correo, contraseña, recontraseña } = req.body;

    if (!(nombre && apellido && correo && usuario && contraseña && recontraseña)) {
        return res.status(400).json({
            msg: 'Rellene los campos y vuelva a intentarlo'
        });
    }

    if (contraseña != recontraseña) {
        return res.status(400).json({
            msg: 'Las contraseñas no coinciden'
        });
    }

    const newPassword = bcrypt.hashSync(contraseña, 10);

    const newUser = new User({
        nombre, apellido, usuario, correo, contraseña: newPassword,
    })

    const saveUser = await newUser.save();

    if (saveUser) {
        res.json({
            msg: 'Usuario creado con exito'
        })
    }

}

ctrl.login = async (req, res) => {

    try {
        const { email, password, soy } = req.body;

        if (soy === 'estudiante') {
            const user = await User.findOne({ correo: email });

            if (!user) {
                return res.status(404).json({
                    msg: 'No se encontro un usuario'
                })
            }

            if (!user.isActive) {
                return res.status(400).json({
                    msg: 'No exite usuario'
                });
            }

            const passwordIsValid = bcrypt.compareSync(password, user.contraseña);

            if (!passwordIsValid) {
                return res.status(400).json({
                    msg: 'Error al loguearse'
                })
            }

            const token = await generarJWT({ uid: user._id })

            return res.json({
                isLogged: true,
                usuario: user.usuario,
                role: user.role,
                token
            })
        } else {
            const instituto = await Insituto.findOne({ correo: email });

            if (!instituto) {
                return res.status(404).json({
                    msg: 'No se encontro un usuario'
                })
            }

            if (!instituto.isActive) {
                return res.status(400).json({
                    msg: 'No exite usuario'
                });
            }

            const passwordIsValid = bcrypt.compareSync(password, instituto.contraseña);

            if (!passwordIsValid) {
                return res.status(400).json({
                    msg: 'Error al loguearse'
                })
            }

            const token = await generarJWT({ uid: instituto._id })

            return res.json({
                isLogged: true,
                usuario: instituto.nombre,
                role: instituto.role,
                token
            })

        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Ha ocurrido un error, intentelo de nuevo'
        })
    }
}

module.exports = ctrl;