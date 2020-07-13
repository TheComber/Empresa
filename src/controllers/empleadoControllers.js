'use strict'
//Imports
var  bcrypt = require("bcrypt-nodejs");
var Empleado = require("../models/empleado")
var jwt = require("../services/jwt")
var path = require("path")
var fs = require("fs")

function registrarEmpleado(req, res){
    var empleado =  new Empleado();
    var params = req.body;

    if(params.nombres && params.apellidos && params.puesto && params.departamento && params.empresa){
        empleado.nombres = params.nombres;
        empleado.apellidos = params.apellidos;
        empleado.puesto = params.puesto;
        empleado.departamento = params.departamento;
        empleado.empresa = params.empresa;

            empleado.save((err, empleadoGuardado)=>{
                if(err) return res.status(500).send({message: 'Error al guardar el empleado'})
                    if(empleadoGuardado){
                        res.status(200).send({empleado: empleadoGuardado})
                }else{
                    res.status(404).send({message: 'No se ha registrado el empleado'})
                }
            })
    }else{
        res.status(200).send({
            message: 'Rellene todos los comapos necesarios'
         })
    }
}

function editarEmpleado(req, res){
    var empleadoId = req.params.idEmpleado;
    var params = req.body

    Empleado.findByIdAndUpdate(empleadoId, params, {new: true}, (err, empleadoActualizado)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!empleadoActualizado) return res.status(404).send({message: "No se ha podido actulizar los datos del empleado"})

        return res.status(200).send({empleado: empleadoActualizado})
        
    })

}

function eliminarEmpleado(req, res){
    var empleadoId = req.params.idEmpleado;

    Empleado.findByIdAndDelete(empleadoId , (err, empleadoEliminado)=>{
        if(err) res.status(500).send({message: "Error en la peticion"})
        if(!empleadoEliminado) res.status(404).send({message: "Error al eliminar el empleado"})
        return res.status(200).send({empleado: empleadoEliminado})
    })

}

function verEmpleados(req, res){
    Empleado.find((err, empleado)=>{
        if(err) return res.status(500).send({message: "Error en la peticion de empleados"})
        if(!empleado) return res.status(60).send({message: "Error en la consulta de empleados"})
        return res.status(200).send({empleado})
    }) 
}

function verEmpleadoId(req, res){
    var empleadoId = req.params.idEmpleado;
    Empleado.findById(empleadoId, (err, empleado)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!empleado) return res.status(404).send({message: "Error al encontrar el empleado"})
        return res.status(300).send({empleado})
    })
}

function verEmpleadoNombre(req, res){
    var empleadoNombre = req.params.nombreEmpleado;
    Empleado.find({nombres: {$regex:empleadoNombre}}, (err, nombreEmpleado)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!nombreEmpleado) return res.status(404).send({message: "Error al encontrar el empleado"})
        return res.status(300).send({nombreEmpleado})
    })
}

function verEmpleadoApellido(req, res){
    var empleadoApellido = req.params.apellidoEmpleado;
    Empleado.find({apellidos: {$regex:empleadoApellido}}, (err, apellidoEmpleado)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!apellidoEmpleado) return res.status(404).send({message: "Error al encontrar el empleado"})
        return res.status(300).send({apellidoEmpleado})
    })
}

function verEmpleadoPuesto(req, res){
    var empleadoPuesto = req.params.puestoEmpleado;
    Empleado.find({puesto: {$regex:empleadoPuesto}}, (err, puestoEmpleado)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!puestoEmpleado) return res.status(404).send({message: "Error al encontrar el empleado"})
        return res.status(300).send({puestoEmpleado})
    })

}

function verEmpleadoDepartamento(req, res){
    var empleadoDepartamento = req.params.departamentoEmpleado;
    Empleado.find({departamento: {$regex:empleadoDepartamento}}, (err, departamentoEmpleado)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!departamentoEmpleado) return res.status(404).send({message: "Error al encontrar el empleado"})
        return res.status(300).send({departamentoEmpleado})
    })
}
1
function verEmpleadoEmpresa(req, res){
    var empleadoEmpresa = req.params.empresaEmpleado;
    Empleado.find({empresa: {$regex:empleadoEmpresa}}, (err, empresaEmpleado)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!empresaEmpleado) return res.status(404).send({message: "Error al encontrar el empleado"})
        return res.status(300).send({empresaEmpleado})
    })
}

function contarEmpleados(req, res){
    Empleado.countDocuments((err, count)=>{

        if(err) return res.status(404).send({message: "Error en la peticion"})
        return res.status(300).send({message: "Hay " + count + " Empleados Registrados"});
    })
}

module.exports = {
    registrarEmpleado,
    editarEmpleado,
    eliminarEmpleado,
    verEmpleadoId,
    verEmpleados,
    verEmpleadoNombre,
    verEmpleadoDepartamento,
    verEmpleadoApellido,
    verEmpleadoPuesto,
    verEmpleadoEmpresa,
    contarEmpleados
}