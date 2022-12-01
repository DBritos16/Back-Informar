const PublicacionModel = require("../models/comunidad.model");

const ctrl = {};


ctrl.getPosts = async (req, res)=>{
    
    const getPosts = await PublicacionModel.find({isActive: true});

    res.json(getPosts)

}

ctrl.postPublicacion = async (req, res)=>{

    const {titutlo, descripcion} = req.body;

    const {tipo} = req.headers

    if(!titutlo || !descripcion || !tipo){
        return res.status(400).json({
            msg: 'Campos vacios'
        })
    }
    
    const newPost = new PublicacionModel({
        titutlo, descripcion, tipo: 'publicacion', idAutor: req.user._id
    }) 

    const savePost = await newPost.save();

    if(!savePost){
        return res.status(400).json({
            msg: 'Ha ocurrido un error'
        }
        )
    }

    return res.json({
        msg: 'Publicado con exito!'
    })

}

ctrl.postPregunta = async (req, res)=>{

    const {titulo, descripcion} = req.body;

    if(!titulo || !descripcion){
        return res.status(400).json({
            msg: 'Campos vacios'
        })
    }
    
    const newPost = new PublicacionModel({
        autor: req.user.nombre || req.user.usuario, titulo, descripcion, tipo: 'pregunta', idAutor: req.user._id
    }) 

    const savePost = await newPost.save();

    if(!savePost){
        return res.status(400).json({
            msg: 'Ha ocurrido un error'
        }
        )
    }

    return res.json({
        msg: 'Publicado con exito!'
    })

}


module.exports = ctrl;