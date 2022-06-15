const {Schema, model } = require('mongoose');
const {response} = require('express');
const actividadModel = require('../models/ActividadModel');
const presupuestoModel = require('../models/PresupuestoModel');
const { default: mongoose } = require('mongoose');
const { validationResult } = require('express-validator')

const getPresupuestos = async(req, res = response) => {
    try {
    
        const presupuestos = await presupuestoModel.find().populate(['cliente']).sort('fecha');

        res.status(201).json({
            presupuestos
        })

    } catch (error) {
        console.log(error)
        
    }
}

const getPresupuesto = async (req, res = response ) => {
    
    const id = req.params.id
    
    try {
        
        const presupuesto = await presupuestoModel.findById(id).populate('cliente')
        if(presupuesto){

            res.json({
                presupuesto
            })
        }else{
            res.json({
                ok: false,
                msg: 'No existe'
            })
        }
    } catch (error) {
        console.log(error)
        
    }
}


const crearPresupuesto = async(req, res = response) => {

 
    try {

        const errors = validationResult (req );
        if(!errors.isEmpty()){
            
            return res.json({
                ok: false,
                errors : errors.mapped()
            })
            
        }else{
            
            const pre={
                fecha:  req.body.fecha ,
                total: req.body.total ,
                listActividades: req.body.listActividades ,
                cliente: req.body.cliente, 
            }
            
            const presupuesto = new presupuestoModel(pre);
            await presupuesto.save();
            
            
            res.status(201).json({
                ok: true,
                msg: 'registrado',
              })
        }

    } catch (error) {
        //console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        })
    }
  
}


const calculoPresupuesto = async(req, res = response) => {

    try {
        const errors = validationResult (req );
        if(!errors.isEmpty()){
            
            return res.json({
                ok: false,
                errors : errors.mapped()
            })
            
        }else{
                const monto = req.params.monto
            
                let listPrueba = [];
                let listadoIndex = []; 
            
            
                const cantidadActividades =  await actividadModel.count();
            
            
                let suma = 0;
                
                while (suma < monto){
                    let id_actividad = parseInt((Math.random() * cantidadActividades + 1));
                    if (!listadoIndex.includes(id_actividad)) {
                        listadoIndex.push(id_actividad);
                        let prueba = await actividadModel.findOne({id_actividad});
                        let min = prueba.cantidad_min;
                        let max = prueba.cantidad_max;
                        let cantidad = (Math.random() * ((max + 1) - min)) + min;
                        let precio_unitario = prueba.precio_unitario;
                        let total = cantidad * precio_unitario;
            
                        suma += total;
            
                        let actividadPrueba = {
                            id_actividad: id_actividad,
                            descripcion: prueba.descripcion,
                            unidad: prueba.unidad,
                            cantidad: cantidad,
                            precio_unitario: precio_unitario,
                            total: total
                        }
                        listPrueba.push(actividadPrueba); 
                        listPrueba.sort(function (a, b) {
                            if (a.id_actividad > b.id_actividad) {
                            return 1;
                            }
                            if (a.id_actividad < b.id_actividad) {
                            return -1;
                            }
                            return 0;
                        });
                    
                        
                    }
                }
                
                res.json({
                    listPrueba,
                    suma
                })
            }
    } catch (error) {
        console.log(error)
    }

}



const parseId = ( id ) => {
    return mongoose.Types.ObjectId( id )
}


const actualizarPresupuesto = async(req, res = response) => {

    const { idPresupuesto } = req.params
    const id = parseId(idPresupuesto)
    
    try {
        
        const presupuesto = await presupuestoModel.findOne(id);
        if( !presupuesto ) {
            res.status(404).json({
                actualizado:false,
                msg: 'Presupuesto no existe por ID'
            })
            
        } else {

            
            
            let nuevoPresupuesto = req.body
            
            let suma = 0
            for(let actividad of nuevoPresupuesto.listActividades) {

                actividad.total = actividad.cantidad * actividad.precio_unitario

                suma += actividad.total
            }

            nuevoPresupuesto.total = suma

    
            const presupuestoActualizado = await presupuestoModel.updateOne({_id: nuevoPresupuesto._id}, nuevoPresupuesto)
            
    
            res.json({
                actualizado: true,
                presupuesto : nuevoPresupuesto
            })
        }


    } catch (error) {
        console.log(error)
        
    }

     

}

const deletePresupuesto = async (req, res = response) => {
    const {idEliminar} = req.params

    try {
        
        await presupuestoModel.deleteOne({ _id: idEliminar})
        res.json({
            eliminado: true
        })

    } catch (error) {
        console.log(error)
        
    }
}




module.exports = {
    calculoPresupuesto,
    crearPresupuesto,
    getPresupuestos,
    getPresupuesto,
    actualizarPresupuesto,
    deletePresupuesto

}
