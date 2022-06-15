const {Schema, model } = require('mongoose');

const clienteSchema = Schema({

    cedula:{
        type: String,
        require: true,
        unique: false
    },

    nombre:{
        type: String,
    },
    apellido:{
        type: String,
    },
    direccion:{
        type: String,
    },
    ciudad:{
        type: String,
    },
    
});

module.exports = model('clienteModel', clienteSchema);