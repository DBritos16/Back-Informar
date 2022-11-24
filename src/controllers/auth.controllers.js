const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const ctrl = {};

ctrl.register = async (req, res)=>{
    
    const {nombre, apellido, usuario, correo, contraseña, recontraseña} = req.body;

    if(!(nombre && apellido && correo && usuario && contraseña && recontraseña)) {
        return res.status(400).json({
            msg: 'Rellene los campos y vuelva a intentarlo'
        });
    }

    if(contraseña != recontraseña){
        return res.status(400).json({
            msg: 'Las contraseñas no coinciden'
        });
    }

    const newPassword = bcrypt.hashSync(contraseña, 10);

    const newUser = new User({
        nombre, apellido, usuario, correo, contraseña: newPassword,
    })

    const saveUser = await newUser.save();

    if(saveUser){
        res.json({
            msg: 'Usuario creado con exito'
        })
    }

}

module.exports = ctrl;