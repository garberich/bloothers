'use strict'
require("dotenv").config()
var express = require('express');
var app = express();
var { mongoose } = require('./database');

// settings
var port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());

// Cargar rutas
app.get('/api/health_center', require('./routes/health_center'));
app.get('/api/employee', require('./routes/employee'));

// Cors

// Rutas
// app.get('/pruebas', (req, res) => {
//     res.status(200).send({
//         message: 'Prueba en servidor'
//     });
// });

// Crear servidor
app.listen(port, () => {
    console.log('Servidor corriendo');
});