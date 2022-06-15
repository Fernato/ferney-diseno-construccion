const {Schema, model } = require('mongoose');

const usuarioSchema = Schema({

    usuario:{
        type: String,
        require: true,
        unique: false
    },

    password:{
        type: String,
    }
    
});

module.exports = model('usuarioModel', usuarioSchema);