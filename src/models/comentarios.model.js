const {Schema, model, SchemaTypes} = require('mongoose');

const comentariosSchema = new Schema({
    Autor: {
        type: String,
        require: true
    },

    texto: {
        type: String,
        require: true
    },

    idAutor: {
        type: SchemaTypes.ObjectId
    },

    idPost: {
        type: SchemaTypes.ObjectId
    },

}, {versionKey: false, timestamps: true});

module.exports = model('comentarios', comentariosSchema);