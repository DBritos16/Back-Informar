const { getInstitutos } = require('../controllers/instituciones.controllers');

const router = require('express').Router();


router.get('/getinstituciones', getInstitutos);


module.exports = router;