'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta_Empresa'

exports.createToken = function(empleado){
    var payload = {
        sub: user._id,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        puesto: empleado.puesto,
        departamento: empleado.departamento,
        empresa: empleado.empresa,
        int: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }

    return jwt.encode(payload, secret)
}