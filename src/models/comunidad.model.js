const {Schema, model, SchemaTypes} = require('mongoose');

const postSchema = new Schema({
    autor: {
        type: String,
        require: true
    },

    titulo: {
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

    idAutor: {
        type: SchemaTypes.ObjectId
    },

    fechaPublicacion: {
        type: Object,
        default: new Date().toLocaleDateString('es-es', { weekday:"long", year:"numeric", month:"long", day:"numeric"})
    },

    visitas: {
        type: Number,
        default: 0
    },
    
    isActive: {
        type: Boolean,
        default: true
    }

}, {versionKey: false, timestamps: true});

module.exports = model('comunidad', postSchema);