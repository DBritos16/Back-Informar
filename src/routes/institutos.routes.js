const { getInstitutos, getInfoInstituto } = require('../controllers/instituciones.controllers');

const router = require('express').Router();


router.get('/getinstituciones', getInstitutos);


router.get('/getinfoinstituto/:id', getInfoInstituto);


module.exports = router;