const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'estudiante'
    },

    correo: {
        type: String,
        require: true
    },

    contraseña: {
        type: String, 
        require: true
    }
}, {versionKey: false, timestamps: true})

module.exports = model('usuarios', userSchema);