'use strict';

const Usuarios = require('../models/usuarios.model');

exports.findAll = function(req, res) {
    Usuarios.findAll(function(err, employee) {
     if (err)
    res.send(err);
    console.log('res', employee);
    res.send(employee);
  });
};


exports.create = function(req, res) {
    const novo_usuario = new Usuarios(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por Favor, preencha os Campos Obrigatorios' });
    }else{
        Usuarios.create(novo_usuario, function(err, usuario) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Usuario Cadastrado com Sucesso!!",data:usuario});
        });
    }
};


exports.findById = function(req, res) {
    Usuarios.findById(req.params.id, function(err, usuario) {
        if (err)
        res.send(err);
        res.json(usuario);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por Favor, preencha os Campos Obrigatorios' });
    }else{
        Usuarios.update(req.params.id, new Usuarios(req.body), function(err, usuario) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Usuario Atualizado com Sucesso' });
        });
    }
  
};

exports.delete = function(req, res) {
    Usuarios.delete( req.params.id, function(err, usuario) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Usuario Removido com Sucesso' });
  });
};