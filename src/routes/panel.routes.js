const { getMisCarreras, postCarrera, putCarrera, deleteCarrera, editInfoCarrera, setTopCarreras } = require('../controllers/panel.controllers');
const validarInstituto = require('../middleware/validarInsituto');

const router = require('express').Router();

router.get('/miscarreras', validarInstituto, getMisCarreras);

router.get('/topcarreras', validarInstituto, setTopCarreras);

router.post('/crearcarrera', validarInstituto, postCarrera);

router.get('/getvalues/:id', validarInstituto, editInfoCarrera)

router.put('/updatecarrera/:id', putCarrera);

router.delete('/carreras/:id', deleteCarrera);

module.exports = router;