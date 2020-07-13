'use strict'

var express = require('express')
var empresaControllers = require("../controllers/empresaControllers")
var md_auth = require("../middlewares/authentication")

//Subir Imagen
var multiparty = require('connect-multiparty')
var md_subir = multiparty({uploadDir: './src/uploads/empresa'})

var api = express.Router()
api.post('/registrarEmpresa', empresaControllers.registrarEmpresa)
api.put('/editarEmpresa/:idEmpresa', empresaControllers.editarEmpresa)
api.delete('/eliminarEmpresa/:idEmpresa', empresaControllers.eliminarEmpresa)
api.get('/verEmpresas', empresaControllers.verEmpresas)
api.get('/verEmpresaId/:idEmpresa', empresaControllers.verEmpresaId)
api.get('/verEmpresaNombre/:nombreEmpresa', empresaControllers.verEmpresaNombre)
api.get('/verEmpresaDireccion/:direccionEmpresa', empresaControllers.verEmpresaDireccion)
api.get('/verEmpresaDepartamento/:departamentoEmpresa', empresaControllers.verEmpresaDepartamento)
api.get('/verEmpresaTelefono/:telefonoEmpresa', empresaControllers.verEmpresaTelefono)

api.get('/contarEmpresas', empresaControllers.contarEmpresa)


// Rutas Empleados
api.put('/registraEmpleado/:id',empresaControllers.AgregarEmpleado)
api.put('/editarempleado/:idempresa/:idempleado' , empresaControllers.EditarEmpleado)
api.put('/eliminaempleado/:idempresa/:idempleado', empresaControllers.eliminarEmpleado)
api.get('/conteoEmpleados/:idempresa', empresaControllers.Contar_Empleados)
api.get('/busqueda/:idempresa/:nombreEmpleado', empresaControllers.busqueda)

module.exports = api;