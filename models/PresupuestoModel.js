const {Schema, model } = require('mongoose');

const presupuestoSchema = Schema({

    fecha:{
        type: Date,
        default: Date.now
    },
    total:{
        type: Number,
    },

    listActividades:[{
        id_actividad:{
            type: String,
        },
    
        descripcion:{
            type: String,
        },
        unidad:{
            type: String,
        },
        cantidad:{
            type: Number,
        },
        precio_unitario:{
            type: Number,
        },
        total:{
            type: Number,
        }
    }],
  
    cliente:{

        type: Schema.ObjectId,
        ref: 'clienteModel'
        
    }

});


module.exports = model('presupuestoModel', presupuestoSchema);