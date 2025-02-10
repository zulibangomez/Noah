const { Router } = require('express');

const router = Router();

// Se extrae el 'check' del validador
const { check } = require('express-validator');

// Exportamos el controlador o función 
const { crearUsuario, revalidarToken, sesion, login, renewToken} = require('../../src/login/authController');
const { validarCampos } = require('../../../middlewares/validarcampos');
const{ validarJWT}=require('../../../middlewares/validarjwt')

////////ruta prueba /////
router.post(
    '/onlogin',
    [
        check('nombre_usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('clave_acceso', 'la password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

// Ruta para crear un nuevo usuario con validaciones
router.post(
   '/new',
  [
        // Se valida un campo a la vez - El nombre es obligatorio y no puede estar vacío
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
crearUsuario
);

// Ruta para el login del usuario

// router.post(
//     '/',
//     [
//         check('nombre_usuario', 'El usuario es obligatorio').not().isEmpty(),
//         check('clave_acceso', 'la password es obligatorio').not().isEmpty(),
//         validarCampos
//     ],
//     sesion
// );

// Ruta para renovar el token
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
