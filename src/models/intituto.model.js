const {Schema, model} = require('mongoose');

const instituteSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },

    descripcion: {
        type: String,
        require: true
    },
    caracter: {
        type: String,
    },

    tipo: {
        type: String,
        require: true
    },

    ubicacion: {
        type: String,
        require: true
    },

    descripcion:{
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'instituto'
    },

    contacto: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, {versionKey: false});

module.exports = model('instituciones', instituteSchema);