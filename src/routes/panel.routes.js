const { getMisCarreras, postCarrera, putCarrera, deleteCarrera, editInfoCarrera, setTopCarreras, getInfoInstituto, putInsitutos } = require('../controllers/panel.controllers');
const validarInstituto = require('../middleware/validarInsituto');

const router = require('express').Router();

router.get('/miscarreras', validarInstituto, getMisCarreras);

router.get('/topcarreras', validarInstituto, setTopCarreras);

router.post('/crearcarrera', validarInstituto, postCarrera);

router.get('/getvalues/:id', validarInstituto, editInfoCarrera)

router.put('/updatecarrera/:id', putCarrera);

router.delete('/carreras/:id', deleteCarrera);

router.get('/config', validarInstituto, getInfoInstituto);

router.put('/update', validarInstituto, putInsitutos);

module.exports = router;