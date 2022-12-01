const { registerInstituto, crearToken } = require('../controllers/register.controllers');
const validarToken = require('../middleware/validarToken');

const router = require('express').Router()

router.get('/creartoken', crearToken);

router.post('/register/instituto', registerInstituto);


module.exports = router;