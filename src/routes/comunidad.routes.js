const { postPublicacion, postPregunta, getPosts } = require('../controllers/comunidad.controllers');
const validarInstituto = require('../middleware/validarInsituto');
const validarLogin = require('../middleware/validarLogin');

const router = require('express').Router();


router.get('/comunidad', getPosts);

router.post('/publicacion', validarInstituto, postPublicacion);

router.post('/preguntar', validarLogin,  postPregunta);

module.exports = router;