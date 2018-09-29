'use strict'
require("dotenv").config()
var express = require('express');
var app = express();
var { mongoose } = require('./database');

// settings
app.set('port', process.env.PORT || 3800);

// Middlewares
app.use(express.json());

// Cargar rutas
app.use('/api/health_center', require('./routes/health_center.routes'));
app.use('/api/employee', require('./routes/employee.routes'));

// Cors

// Rutas
// app.get('/pruebas', (req, res) => {
//     res.status(200).send({
//         message: 'Prueba en servidor'
//     });
// });

// Crear servidor
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo');
});

// Exportar
module.exports = app;