var express = require('express');
var app = express();
const configMensaje = require('../config/configMensaje');


// Rutas
app.post('/', (req, res, next) => {

    configMensaje(req.body);
    /* res.status(200).send(); */
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });

});



module.exports = app;