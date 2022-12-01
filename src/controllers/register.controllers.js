const generarJWT = require("../helpers/generarJWT");
const instituto = require("../models/intituto.model")
const bcrypt = require('bcrypt')
const ctrl = {};

ctrl.crearToken = async (req, res)=>{

    const token = await generarJWT({auth: true, type: 60});

    res.json(token)
}

ctrl.registerInstituto = async(req, res)=>{

    const {nombre, tipo, caracter, ubicacion, descripcion, contacto, correo, contraseña, recontraseña} = req.body;

    if(contraseña != recontraseña){
        return res.status(400).json({
            msg: 'Las contraseñas no coinciden'
        });
    }

    const newPassword = bcrypt.hashSync(contraseña, 10);

    const nuevoIntituto = new instituto({
        nombre, tipo, caracter, ubicacion, descripcion, contacto, correo, contraseña: newPassword,
    })

    const saveNuevoInstituto = await nuevoIntituto.save()

    if(saveNuevoInstituto){
        return res.json({
            msg: 'Creado con exito'
        })
    }
}

module.exports = ctrl