'use strict'

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
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/achievement', require('./routes/achievement.routes'));
app.use('/api/donation_type', require('./routes/donation_type.routes'));
app.use('/api/campaign', require('./routes/campaign.routes'));

// Cors

// Rutas
// app.get('/pruebas', (req, res) => {
//     res.status(200).send({
//         message: 'Prueba en servidor'
//     });
// });

// Crear servidor
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en ' + app.get('port'));
});

// Exportar
module.exports = app;