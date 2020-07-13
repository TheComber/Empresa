'use strict'
//Imports
var bcrypt = require("bcrypt-nodejs");
var Empresa = require("../models/empresa")
var jwt = require("../services/jwt")
var path = require("path")
var fs = require("fs")

function registrarEmpresa(req, res){
    var empresa =  new Empresa();
    var params = req.body;

    if(params.nombre && params.direccion && params.departamento && params.telefono){
        empresa.nombre = params.nombre;
        empresa.direccion = params.direccion;
        empresa.departamento = params.departamento;
        empresa.telefono = params.telefono;

            empresa.save((err, empresaGuardado)=>{
                if(err) return res.status(500).send({message: 'Error al guardar la empresa'})
                    if(empresaGuardado){
                        res.status(200).send({empresa: empresaGuardado})
                }else{
                    res.status(404).send({message: 'No se ha registrado la empresa'})
                }
            })
    }else{
        res.status(200).send({
            message: 'Rellene todos los comapos necesarios'
         })
    }
}

function editarEmpresa(req, res){
    var empresaId = req.params.idEmpresa;
    var params = req.body

    Empresa.findByIdAndUpdate(empresaId, params, {new: true}, (err, empresaActualizado)=>{
        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!empresaActualizado) return res.status(404).send({message: "No se ha podido actulizar los datos del empleado"})

        return res.status(200).send({empresa: empresaActualizado})
        
    })

}

function eliminarEmpresa(req, res){
    var empresaId = req.params.idEmpresa;

    Empresa.findByIdAndDelete(empresaId , (err, empresaEliminado)=>{
        if(err) res.status(500).send({message: "Error en la peticion"})
        if(!empresaEliminado) res.status(404).send({message: "Error al eliminar la empresa"})
        return res.status(200).send({empleado: empresaEliminado})
    })
}

function AgregarEmpleado(req , res) {
    var id_empresa = req.params.id
    var params = req.body;

    Empresa.findOneAndUpdate({_id: id_empresa},{$push:{empleado:{nombres: params.nombres,apellidos: params.apellidos,puesto: params.puesto,departamento: params.departamento},
                }},{new: true},(err,registrado)=>{

            if(err) return res.status(500).send({message: 'Error en la peticion '})

            if(!registrado) return res.status(404).send({message: 'Error en Agregar Empleado'})

            return res.status(200).send({registrado})
                })
    
}

function  EditarEmpleado(req , res) {
    var id_empresa = req.params.idempresa
    var ed_empleado = req.params.idempleado
    var params = req.body;

    Empresa.findOneAndUpdate({_id:id_empresa ,'empleado._id':ed_empleado },{'empleado.$.nombres': params.nombres,
                                                                            'empleado.$.apellidos': params.apellidos,
                                                                            'empleado.$.puesto': params.puesto,
                                                                            'empleado.$.departamento': params.departamento},{new: true},(err,actualizado)=>{
    if(err) return res.status(500).send({message:'Error en la peticion'})

    if(!actualizado) return res.status(404).send({message: 'Error en actualizar empleado'})

    return res.status(200).send({actualizado})

     })
}

function eliminarEmpleado(req, res){
    var id_empresa = req.params.idempresa;
    var ed_empleado = req.params.idempleado;
    
    Empresa.findOneAndUpdate({_id:id_empresa},{ $pull:{empleado:{'_id':ed_empleado}}},(err,eliminado)=>{

        if(err) return res.status(500).send({message: 'Error en la peticion'})

        if(!eliminado) return res.status(404).send({message: 'Error en eliminar Empleado'})

        return res.status(200).send({eliminado})
    })

}


function Contar_Empleados(req , res) {
    var id_empresa = req.params.idempresa;

    Empresa.findOne({_id:id_empresa},(err,total)=>{
       
        if(err) return res.status(500).send({message: 'Error en la peticion'})

         if(!total){ return res.status(404).send({message: 'Error en contar empleados'})

         }else{

            return res.status(200).send({message: "Hay " + total.empleado.length + " empleados registrados"})

         }

    })
    
}

function busqueda(req ,res ) {
    var id_empresa = req.params.idempresa;
    var empleadoNombre = req.params.nombreEmpleado;

    Empresa.find({_id:id_empresa},{$regex:{empleado:{nombre:{$regex:empleadoNombre}}}}, (err, nombreEmpleado)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!nombreEmpleado) return res.status(404).send({message: "Error al encontrar el empleado"})
        return res.status(300).send({nombreEmpleado})

    })
}

function verEmpresas(req, res){
    Empresa.find((err, empresa)=>{
        if(err) return res.status(500).send({message: "Error en la peticion las empresas"})
        if(!empresa) return res.status(60).send({message: "Error en la consulta las empresas"})
        return res.status(200).send({empresa})
    }) 
}

function verEmpresaId(req, res){
    var empresaId = req.params.idEmpresa;
    Empresa.findById(empresaId, (err, empresa)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!empresa) return res.status(404).send({message: "Error al encontrar la empresa"})
        return res.status(300).send({empresa})
    })
}

function verEmpresaNombre(req, res){
    var empresaNombre = req.params.nombreEmpresa;
    Empresa.find({nombre: {$regex:empresaNombre}}, (err, nombreEmpresa)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!nombreEmpresa) return res.status(404).send({message: "Error al encontrar la empresa"})
        return res.status(300).send({nombreEmpresa})
    })
}

function verEmpresaDireccion(req, res){
    var empresaDireccion = req.params.direccionEmpresa;
    Empresa.find({direccion: {$regex:empresaDireccion}}, (err, direccionEmpresa)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!direccionEmpresa) return res.status(404).send({message: "Error al encontrar la empresa"})
        return res.status(300).send({direccionEmpresa})
    })
}

function verEmpresaDepartamento(req, res){
    var empresaDepartamento = req.params.departamentoEmpresa;
    Empresa.find({departamento: {$regex:empresaDepartamento}}, (err, departamentoEmpresa)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!departamentoEmpresa) return res.status(404).send({message: "Error al encontrar la empresa"})
        return res.status(300).send({departamentoEmpresa})
    })
}

function verEmpresaTelefono(req, res){
    var empresaTelefono = req.params.telefonoEmpresa;
    Empresa.find({telefono: {$regex:empresaTelefono}}, (err, telefonoEmpresa)=>{

        if(err) return res.status(500).send({message: "Error en la peticion"})
        if(!telefonoEmpresa) return res.status(404).send({message: "Error al encontrar la empresa"})
        return res.status(300).send({telefonoEmpresa})
    })
}

function contarEmpresa(req, res){
    Empresa.countDocuments((err, count)=>{

        if(err) return res.status(404).send({message: "Error en la peticion"})
        return res.status(300).send({message: "Hay " + count + " Empresas Registradas"});
    })
}

module.exports = {
    registrarEmpresa,
    editarEmpresa,
    eliminarEmpresa,
    verEmpresas,
    verEmpresaId,
    verEmpresaNombre,
    verEmpresaDireccion,
    verEmpresaDepartamento,
    verEmpresaTelefono,
    contarEmpresa,
    AgregarEmpleado,
    EditarEmpleado,
    eliminarEmpleado,
    Contar_Empleados,
    busqueda
}