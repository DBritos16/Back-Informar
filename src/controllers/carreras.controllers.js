const carreraSchema = require('../models/carreras.model')
const ctrl = {};


ctrl.getCarrera = async (req, res)=>{

    try {
        const getCarreras = await carreraSchema.find({isActive: true});

        res.json(getCarreras);

    } catch (error) {
        res.json(`Ha ocurrido un error: ${error}`)
    }

}


ctrl.getInfoCarrera = async (req, res)=>{

    const id = req.params.id

    try {
        const getCarreras = await carreraSchema.findById(id);

        if(!getCarreras){
            return res.status(404).json({
                msg: 'No se encontraron resultados'
            })
        }
        res.json(getCarreras);

    } catch (error) {
        console.log(error);
        res.status(400).json('Ha ocurrido un error')
    }

}


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


ctrl.putCarrera = async (req, res)=>{
    
    try {

        const idCarrera = req.params.id
        const {nombre, descripcion, ofertaAcademica, duracion, tipoDuracion, tipoCarrera} = req.body;
        
        //VERIFICACION DE CAMPOS
        if (!idCarrera || !nombre || !descripcion || !ofertaAcademica || !duracion || !tipoDuracion || !tipoCarrera) {
            return res.status(400).json({
                message: 'Falta completar campos',
                respuesta: ["nombre", "descripcion", "ofertaAcademica", "duracion", "tipoDuracion", "tipoCarrera"]
        });
        }

        const carrera = await carreraSchema.findOne({$and:[{_id: idCarrera},{isActive: true}]})

        //VERIFICAR CARRERA
        if(!carrera){res.status(400).json({message:'Carrera no encontrada'})}

        //ACTUALIZAR
        await carrera.updateOne({nombre, descripcion, ofertaAcademica, duracion, tipoDuracion, tipoCarrera});
        return res.json(`Los datos han sido actualizados correctamente`);

    } catch (error) {
        console.log(error.message);
        res.status(400).json('Ha ocurrido un error al intentar acutalizar los datos');
    }
}


ctrl.deleteCarrera = async (req, res)=>{
    try {
        const idCarrera = req.params.id
        const carrera = await carreraSchema.findOne({$and:[{_id:idCarrera},{isActive:true}]})

        //VERIFICACION DE CARRERA
        if(!carrera){res.status(400).json({message:'No se encontró carrera'})}

        //ELIMINAR TAREA
        await carreraSchema.updateOne({isActive:false});
        return res.status(200).json({message: 'Usuario eliminado correctamente'});

    } catch (error) {
        console.log(error.message);
        res.status(400).json('Ha ocurrido un error al intentar eliminar la carrera');
    }
}


module.exports = ctrl;