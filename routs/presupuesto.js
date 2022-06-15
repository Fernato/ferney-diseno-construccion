/*
    Rutas de presupuesto
    host + /api/presupuesto
*/

const {Router} = require('express');
const { check } = require( 'express-validator' );

const router = Router();

const {  calculoPresupuesto, crearPresupuesto, getPresupuestos, actualizarPresupuesto, getPresupuesto, deletePresupuesto } = require ('../controllers/presupuesto');


router.get(
    '/:monto',
    [
        check('monto', 'Ingrese el monto').not().isEmpty()
    ],
    calculoPresupuesto);
router.post(
    '/',
    [
        check('cliente', 'Tiene que hacer una busqueda de cliente primero').not().isEmpty()
    ],
    crearPresupuesto);
router.get('/', getPresupuestos);
router.put('/:idPresupuesto', actualizarPresupuesto);
router.get('/getpresupuesto/:id', getPresupuesto);
router.delete('/:idEliminar', deletePresupuesto)








module.exports = router;