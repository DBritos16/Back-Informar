const router = require('express').Router();
const {getCarrera, postCarrera, putCarrera, deleteCarrera} = require('../controllers/carreras.controllers');

router.get('/carreras', getCarrera);

router.post('/carreras', postCarrera);

router.put('/carreras/:id', putCarrera);

router.delete('/carreras/:id', deleteCarrera);

module.exports = router;