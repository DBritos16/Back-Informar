const carreraSchema = require('../models/carreras.model')
const ctrl = {};

ctrl.getCarrera = async (req, res)=>{

    try {
        const getCarreras = await carreraSchema.find();

        res.json(getCarreras);

    } catch (error) {
        res.json(`Ha ocurrido un error: ${error}`)
    }

}

ctrl.postCarrera = async (req, res)=>{

    try {
        const {nombre, descripcion, duracion, tipoDuracion, tipoCarrera, institucion} = req.body;

        if(!nombre || !descripcion || !duracion){
            res.status(400).json('Verifique los datos ingresados y vuelva a intentarlo')}
    
        const newCarrea = new carreraSchema({
            nombre, descripcion, duracion, tipoDuracion, tipoCarrera, institucion
        });
    
        await newCarrea.save();

        res.json('La carrera ha sido creada con exito!');

    } catch (error) {
        console.log(error.message)
        res.status(400).json('Ha ocurrido un error al intentar crear la tarea');
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