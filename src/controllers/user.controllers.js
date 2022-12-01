//IMPORTACION DEL MODELO DE USUARIO 
const userSchema = require('../models/users.model');
const bcrypt = require('bcrypt');

//CONTROLADOR DE USUARIO
const ctrlUser = {};


//UPDATE, ACTUALIZAR USUARIO
ctrlUser.putUser = async (req, res) => {
    try {
        const idUser = req.user._id;
        const {nombre, apellido, correo, contraseña} = req.body;

        //VERIFICACION DE CAMPOS
        if (!idUser || !nombre || !apellido || !contraseña || !correo) {
            return res.status(400).json({
                message: 'Falta completar campos',
                respuesta: ["nombre", "apellido", "correo", "contraseña"]
        });
        }

        //VERIFICAR RANGO DE CONTRASEÑA
        if (contraseña.length <8) {
            return res.status(400).json({
                message: 'La contraseña debe ser mayor o igual a 8 caracteres'});
        }

        const User = await userSchema.findOne({$and:[{_id: idUser}, {isActive: true}]});

        //VERIFICAR USUARIO
        if (!User) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        const newPassword = bcrypt.hashSync(contraseña,10);

        //ACTUALIZAR
        await User.updateOne({nombre, apellido, correo, contraseña:newPassword});
        return res.status(200).json({message: 'Usuario actualizado correctamente'});

} catch (error) {
    return res.status(500).json({message: 'Error al actualizar usuario'});
    }
}


//DELETE, ELIMINAR USUARIO
ctrlUser.deleteUser = async (req, res) => {
    try {
        const idUser = req.user._id;
        const user = await userSchema.findOne({$and:[{_id: idUser},{isActive: true}]});

        //VERIFICAR USUARIO
        if (!user){
            return res.status(404).json({message: 'El usuario ya no existe'});
        }

        //ELIMINAR USUARIO
        await user.updateOne({isActive: false})
        return res.status(200).json({message: 'Usuario eliminado correctamente'});

} catch (error) {
    return res.status(500).json({message: 'Error interno del servidor'});
    }
}


module.exports = ctrlUser;