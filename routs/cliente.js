/*
    Rutas de cliente 
    host + /api/cliente
*/

const {Router} = require('express');
const { check } = require( 'express-validator' );

const router = Router();

const { getClientes,getCliente,crearCliente, editarCliente, eliminarCliente } = require ('../controllers/cliente');

router.get('/', getClientes);
router.get('/:cedula', getCliente);

router.post(
    '/',
    [
        check('cedula', 'La cedula es obligatoria').not().isEmpty()
    ],
    crearCliente );

router.put('/:id', editarCliente);

router.delete('/:id', eliminarCliente);



module.exports = router;