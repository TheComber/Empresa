'use strict'

var express = require('express')
var empleadoController = require("../controllers/empleadoControllers")
var md_auth = require("../middlewares/authentication")

//Subir Imagen
var multiparty = require('connect-multiparty')
var md_subir = multiparty({uploadDir: './src/uploads/empleado'})

var api = express.Router()
api.post('/registrarEmpleado', empleadoController.registrarEmpleado)
api.put('/editarEmpleado/:idEmpleado', empleadoController.editarEmpleado)
api.get('/verEmpleados', empleadoController.verEmpleados)
api.get('/verEmpleadoId/:idEmpleado', empleadoController.verEmpleadoId)
api.delete('/eliminarEmpleado/:idEmpleado', empleadoController.eliminarEmpleado)
api.get('/verEmpleadoNombre/:nombreEmpleado', empleadoController.verEmpleadoNombre)
api.get('/verEmpleadoApellido/:apellidoEmpleado', empleadoController.verEmpleadoApellido)
api.get('/verEmpleadoPuesto/:puestoEmpleado', empleadoController.verEmpleadoPuesto)
api.get('/verEmpleadoDepartamento/:departamentoEmpleado', empleadoController.verEmpleadoDepartamento)
api.get('/verEmpleadoEmpresa/:empresaEmpleado', empleadoController.verEmpleadoEmpresa)

api.get('/contarEmpleados', empleadoController.contarEmpleados)



module.exports = api;