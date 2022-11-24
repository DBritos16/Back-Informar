const {Schema, model} = require('mongoose');

const carreraSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },

    descripcion: {
        type: String,
        require: true
    },

    duracion: {
        type: Number,
        require: true
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {versionKey: false});

module.exports = model('carreras', carreraSchema);