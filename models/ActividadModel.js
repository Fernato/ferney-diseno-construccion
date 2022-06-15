const {Schema, model } = require('mongoose');

const actividadSchema = Schema({

    id_actividad:{
        type: String,
        require: true,
        unique: false
    },

    descripcion:{
        type: String,
    },
    unidad:{
        type: String,
    },
    precio_unitario:{
        type: Number,
    },
    cantidad_min:{
        type: Number,
    },
    cantidad_max:{
        type: Number,
    }
});

module.exports = model('actividadModel', actividadSchema);
