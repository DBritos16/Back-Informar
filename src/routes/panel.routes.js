const { getMisCarreras, postCarrera, putCarrera, deleteCarrera, editInfoCarrera } = require('../controllers/panel.controllers');
const validarInstituto = require('../middleware/validarInsituto');

const router = require('express').Router();

router.get('/miscarreras', validarInstituto, getMisCarreras);

router.post('/crearcarrera', validarInstituto, postCarrera);

router.get('/getvalues/:id', validarInstituto, editInfoCarrera)

router.put('/carreras/:id', putCarrera);

router.delete('/carreras/:id', deleteCarrera);

module.exports = router;