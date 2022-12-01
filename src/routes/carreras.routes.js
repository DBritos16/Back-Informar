const router = require('express').Router();
const {getCarrera, postCarrera, putCarrera, deleteCarrera, getInfoCarrera, getMisCarreras} = require('../controllers/carreras.controllers');
const incrementarVista = require('../middleware/incrementarVista');
const validarInstituto = require('../middleware/validarInsituto');

router.get('/carreras', getCarrera);

router.get('/carreras/:id', incrementarVista, getInfoCarrera);

router.get('/miscarreras', validarInstituto, getMisCarreras);

router.post('/crearcarrera', validarInstituto, postCarrera);

router.put('/carreras/:id', putCarrera);

router.delete('/carreras/:id', deleteCarrera);

module.exports = router;