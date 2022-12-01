const carreraSchema = require('../models/carreras.model')
const ctrl = {};

ctrl.getMisCarreras = async (req, res)=>{

    const {_id} = req.instituto

    try {
        const getCarreras = await carreraSchema.find({idInsituto: _id});

        res.json(getCarreras);

    } catch (error) {
        res.json(`Ha ocurrido un error: ${error}`)
    }

}

ctrl.postCarrera = async (req, res)=>{

    const {_id} = req.instituto

    try {
        const {nombre, descripcion, ofertaAcademica, duracion, tipoDuracion, tipoCarrera} = req.body;

        if(!nombre || !descripcion || !duracion){
            res.status(400).json('Verifique los datos ingresados y vuelva a intentarlo')}
    
        const newCarrea = new carreraSchema({
            nombre, descripcion, ofertaAcademica, duracion, tipoDuracion, tipoCarrera, institucion: req.instituto.nombre, idInsituto: _id
        });
    
        const saveCarrera = await newCarrea.save();

        console.log(saveCarrera);
        res.json({
            id: saveCarrera._id,
            msg: 'La carrera ha sido creada con exito!'
        });

    } catch (error) {
        console.log(error.message)
        res.status(400).json('Ha ocurrido un error al intentar crear la tarea');
    }
}

ctrl.editInfoCarrera = async (req, res)=>{

    const {_id} = req.instituto
    const {id} = req.params

    try {
        const getCarrera = await carreraSchema.findOne({_id: id, idInsituto: _id});

        res.json(getCarrera);

    } catch (error) {
        res.json(`Ha ocurrido un error: ${error}`)
    }
}

ctrl.putCarrera = async (req, res)=>{
    
    try {
        const {id} = req.params

        if(!id){res.status(400).json('Es necesario un ID')}

        const {nombre, descripcion, duracion} = req.body;

        await carreraSchema.updateOne({_id:id,
        $set:{
            nombre, descripcion, duracion
        }});

        res.json(`Los datos han sido actualizados correctamente`);

    } catch (error) {
        console.log(error.message);
        res.status(400).json('Ha ocurrido un error al intentar acutalizar los datos');
    }
}

ctrl.deleteCarrera = async (req, res)=>{
    try {
        const {id} = req.params;

        if(!id){res.status(400).json('Es necesario un ID')}

        await carreraSchema.findByIdAndDelete(id);

        res.json('La carrera ha sido eliminada con exito');

    } catch (error) {
        console.log(error.message);
        res.status(400).json('Ha ocurrido un error al intentar eliminar la carrera');
    }
}

module.exports = ctrl;