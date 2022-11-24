const instituteSchema = require('../models/institute.model')
const ctrl = {};

ctrl.getInstitucion = async (req, res)=>{

    try {
        const getInstituciones = await instituteSchema.find({isActive:true});

        res.json(getInstituciones);

    } catch (error) {
        res.json(`Ha ocurrido un error: ${error}`)
    }

}

ctrl.postInstitucion = async (req, res)=>{

    try {
        const {nombre, descripcion, tipo, ubicacion, contacto } = req.body;

        if(!nombre || !descripcion || !duracion || !tipo || !ubicacion || !contacto){
            res.status(400).json('Verifique los datos ingresados y vuelva a intentarlo')}
    
        const newInstitucion = new instituteSchema({
            nombre, descripcion, tipo, ubicacion, contacto
        });
    
        await newInstitucion.save();

        res.json('La institucion ha sido subida con exito!');

    } catch (error) {
        console.log(error.message)
        res.status(400).json('Ha ocurrido un error al intentar subir la institucion');
    }
}

ctrl.putInstitucion = async (req, res)=>{
    
    try {
        const {id} = req.params

        if(!id){res.status(400).json('Es necesario un ID')}

        const {nombre, descripcion, tipo, ubicacion, contacto} = req.body;

        await instituteSchema.updateOne({$and:[{_id:id},{isActive:true}],
        $set:{
            nombre, descripcion, tipo, ubicacion, contacto
        }});

        res.json(`Los datos han sido actualizados correctamente`);

    } catch (error) {
        console.log(error.message);
        res.status(400).json('Ha ocurrido un error al intentar acutalizar los datos');
    }
}

ctrl.deleteInstitucion = async (req, res)=>{
    try {
        const {id} = req.params;

        if(!id){res.status(400).json('Es necesario un ID')}

        await instituteSchema.findByIdAndDelete(id);

        res.json('La carrera ha sido eliminada con exito');

    } catch (error) {
        console.log(error.message);
        res.status(400).json('Ha ocurrido un error al intentar eliminar la carrera');
    }
}

module.exports = ctrl;