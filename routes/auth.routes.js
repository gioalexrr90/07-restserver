const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/google', [
    check('id_token', 'id_token de Google es necesario').not().isEmpty(),
    validarCampos
], googleSingIn );


module.exports = router;