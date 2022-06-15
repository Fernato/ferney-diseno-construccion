/*
    Rutas de login
    host + /api/login
*/

const {Router} = require('express');
const {check} = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, login, revalidadToken } = require ('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();


router.get('/', getUsuarios)
router.post(
    '/new',
    [//middleware
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearUsuario 
)

router.post(
    '/',
    [//middleware
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
    ],
    login
)

router.get('/renew', validarJWT, revalidadToken);




module.exports = router;