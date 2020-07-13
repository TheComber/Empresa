'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombre: String,
    direccion: String,
    departamento: String,
    telefono: String,

    empleado: [
        {   nombres: String,
            apellidos: String,
            puesto: String,
            departamento: String,
          }
    ]

})

module.exports = mongoose.model("empresa",EmpresaSchema)