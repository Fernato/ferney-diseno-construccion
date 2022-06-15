
const express = require('express');
require('dotenv').config();
const dbConnection = require('./database/config');
const cors = require('cors');

require('dotenv').config();


//Crear el servidor de express

const app = express();

//base de datos

dbConnection();

app.use(cors());

// Directorio publico

app.use(express.static('public'));

// Lectura y parseo del body

app.use( express.json() );

//Rutas

app.use('/api/cliente', require('./routs/cliente'));
app.use('/api/actividad', require('./routs/actividad'));
app.use('/api/presupuesto', require('./routs/presupuesto'));
app.use('/api/login', require('./routs/usuario'));

// Escuchar peticiones

const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log(`Servidor corriendo en puerto ${port}` );
} )