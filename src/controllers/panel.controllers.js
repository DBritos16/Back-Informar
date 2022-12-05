const carreraSchema = require('../models/carreras.model')
const ctrl = {};

ctrl.getMisCarreras = async (req, res)=>{

    const {_id} = req.instituto

    try {
        const getCarreras = await carreraSchema.find({idInsituto: _id}).sort({createdAt: -1});

        console.log(getCarreras);
        res.json(getCarreras);

    } catch (error) {
        res.json(`Ha ocurrido un error: ${error}`)
    }

}

ctrl.setTopCarreras = async(req, res)=>{
    const {_id} = req.instituto

    try {
        const topCarreras = await carreraSchema.find({idInsituto: _id}).sort({visitas: -1}).limit(5);
        
        console.log(topCarreras);
        res.json(topCarreras);

    } catch (error) {
        res.json(`Ha ocurrido un error: ${error}`)
    }
}

ctrl.postCarrera = async (req, res)=>{

    const {_id} = req.instituto

    try {
        const {nombre, categoria, tipoCarrera, duracion, tipoDuracion, modalidad, caracter, isActive, descripcion, ofertaAcademica, requisitos} = req.body;

        if(!nombre || !duracion){
            res.status(400).json('Verifique los datos ingresados y vuelva a intentarlo')}
    
        const newCarrea = new carreraSchema({
            nombre, categoria, tipoCarrera, duracion, tipoDuracion, modalidad, caracter, isActive, descripcion, ofertaAcademica, requisitos, institucion: req.instituto.nombre, idInsituto: _id
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

        const idCarrera = req.params.id
        const {nombre, categoria, tipoCarrera, duracion, tipoDuracion, modalidad, caracter, isActive, descripcion, ofertaAcademica, requisitos} = req.body;

        //VERIFICACION DE CAMPOS
        if (!idCarrera || !nombre || !descripcion || !ofertaAcademica || !duracion || !tipoDuracion || !tipoCarrera) {
            return res.status(400).json({
                message: 'Falta completar campos',
                respuesta: ["nombre", "descripcion", "ofertaAcademica", "duracion", "tipoDuracion", "tipoCarrera"]
        });
        }

        let carrera = await carreraSchema.findOne({_id: idCarrera})

        //VERIFICAR CARRERA
        if(!carrera){res.status(400).json({message:'Carrera no encontrada'})}

        //ACTUALIZAR
        const updateCarrera = await carrera.updateOne({nombre, categoria, tipoCarrera, duracion, tipoDuracion, modalidad, caracter, isActive, descripcion, ofertaAcademica, requisitos});
        
        if(!updateCarrera){
            return res.status(400).json({
                msg: 'Ha ocurrido un error, intentelo de nuevo',
            })
        }

        carrera = await carreraSchema.findOne({_id: idCarrera})

        return res.json(carrera);

    } catch (error) {
        console.log(error.message);
        res.status(400).json('Ha ocurrido un error al intentar acutalizar los datos');
    }
}


ctrl.deleteCarrera = async (req, res)=>{
    try {
        const idCarrera = req.params.id
        const carrera = await carreraSchema.findOne({_id:idCarrera})

        //VERIFICACION DE CARRERA
        if(!carrera){res.status(400).json({message:'No se encontró carrera'})}

        //ELIMINAR TAREA
        const deleteCarrera = await carreraSchema.findByIdAndDelete(carrera._id);
        
        if(!deleteCarrera){
            return res.status(400).json({
                msg: 'Ha ocurrido un error'
            })
        }
        
        return res.status(200).json({message: 'Usuario eliminado correctamente'});

    } catch (error) {
        console.log(error.message);
        res.status(400).json('Ha ocurrido un error al intentar eliminar la carrera');
    }
}

module.exports = ctrl;