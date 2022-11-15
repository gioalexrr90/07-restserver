const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { valRole, valExistEmail, valUserByID } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( valUserByID ),
    check('role').custom( valRole ),
    validarCampos
],usuariosPut );

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email').custom(valExistEmail),
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('role').custom( (role) => valRole(role) ),
    check('role').custom( valRole ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( valUserByID ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );


module.exports = router;