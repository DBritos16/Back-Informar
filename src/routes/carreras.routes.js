const router = require('express').Router();
const { getCarrera, getInfoCarrera, getOfertasAcademicas } = require('../controllers/carreras.controllers');
const incrementarVista = require('../middleware/incrementarVista');

router.post('/carreras', getCarrera);

router.get('/carreras/:id', incrementarVista, getInfoCarrera);

router.get('/ofertasacademicas', getOfertasAcademicas);

module.exports = router;