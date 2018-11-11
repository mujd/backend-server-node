var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// ==================================================
// Verificar Token
// ==================================================
exports.verificaToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
        /* res.status(200).json({
            ok: true,
            decoded: decoded
        }); */
    });
}

// ==================================================
// Verificar ADMIN
// ==================================================
exports.verificaADMIN_ROLE = function(req, res, next) {

    var usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });
    }
}

// ==================================================
// Verificar ADMIN o Mismo Usuario
// ==================================================
exports.verificaADMIN_o_MismoUsuario = function(req, res, next) {

    var usuario = req.usuario;
    var id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        /* console.log(usuario.role); */
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador ni es el mismo usuario',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });
    }
}

// ==================================================
// Verificar ADMIN o Mismo Usuario cambia role
// ==================================================
exports.verificaUSerRoleCambiaRole = function(req, res, next) {

    var usuario = req.usuario;
    var id = req.params.id;
    var role = req.body.role;

    if (usuario._id != id && role === 'ADMIN_ROLE') {
        /* console.log(usuario.role); */
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Error al actualizar ROLE.',
            errors: { message: 'Si desea cambiar el ROLE, debe de hablar con otro administrador.' }
        });
    }
}