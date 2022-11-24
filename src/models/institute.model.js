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

    tipo: {
        type: String,
        require: true
    },

    ubicacion: {
        type: String,
        require: true
    },

    contacto: {
        type: String,
        require: true
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {versionKey: false});

module.exports = model('instituciones', instituteSchema);