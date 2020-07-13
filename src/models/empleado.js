'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var EmpleadoSchema = Schema({
    nombres: String,
    apellidos: String,
    puesto: String,
    departamento: String,
    empresa: String,

})

module.exports = mongoose.model("empleado",EmpleadoSchema)