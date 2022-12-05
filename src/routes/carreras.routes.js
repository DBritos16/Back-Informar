const router = require('express').Router();
const { getCarrera, getInfoCarrera } = require('../controllers/carreras.controllers');
const incrementarVista = require('../middleware/incrementarVista');

router.post('/carreras', getCarrera);

router.get('/carreras/:id', incrementarVista, getInfoCarrera);

module.exports = router;