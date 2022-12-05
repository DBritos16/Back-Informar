const {Schema, model, SchemaTypes} = require('mongoose');

const carreraSchema = new Schema({
    
    nombre: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    tipoCarrera:{
        type: String,
        require: true
    },
    duracion: {
        type: Number,
        require: true
    },
    tipoDuracion: {
        type: String,
        require: true
    },
    modalidad:{
        type: String,
        require: true
    },
    caracter:{
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    ofertaAcademica: {
        type: String,
        require: true
    },
    requisitos: {
        type: String,
        require: true
    },
    institucion: {
        type: String,
        require: true
    },
    idInsituto: {
        type: SchemaTypes.ObjectId
    },
    visitas: {
        type: Number,
        default: 0
    }

}, {versionKey: false, timestamps: true});

module.exports = model('carreras', carreraSchema);