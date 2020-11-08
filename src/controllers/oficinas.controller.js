'use strict';

const Oficinas = require('../models/oficinas.model');

exports.findAll = function(req, res) {
 
  Oficinas.findAll(function(err, oficina) {
    console.log('chegou')
     if (err)
    res.send(err);
    console.log('res', oficina);
    res.send(oficina);
  });
};


exports.findBairro = function(req, res) {
 
  Oficinas.findBairro(function(err, oficina) {
    console.log('chegou')
     if (err)
    res.send(err);
    console.log('res', oficina);
    res.send(oficina);
  });
};




// exports.findBairro = function (res) {
//   Oficinas.findBairro(function (err, oficina) {
//     console.log('chegou')
//     if (err)
//       res.send(err);
//     console.log('res', oficina);
//     res.send(oficina);
//   });
// };


exports.create = function(req, res) {
    const nova_oficina = new Oficinas(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por Favor, preencha os Campos Obrigatorios' });
    }else{
      Oficinas.create(nova_oficina, function(err, oficina) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Oficina Cadastrado com Sucesso!!",data:oficina});
        });
    }
};

exports.getPagination = function(req, res){
  const pagina =  req.query.page 
   Oficinas.getPagination(pagina , 5, function(err, oficina) {
     if (err)
    res.send(err);
    res.json(oficina);
  });
}


exports.findById = function(req, res) {
  Oficinas.findById(req.params.id, function(err, oficina) {
        if (err)
        res.send(err);
        res.send(oficina);
     });
};




exports.findByBairro = function(req, res) {
  Oficinas.findByBairro(req.params.bairro, function(err, oficina) {
        if (err)
        res.send(err);
        res.json(oficina);
     });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por Favor, preencha os Campos Obrigatorios' });
    }else{
      Oficinas.update(req.params.id, new Oficinas(req.body), function(err, oficina) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Oficina Atualizado com Sucesso' });
        });
    }
  
};

exports.delete = function(req, res) {
  Oficinas.delete( req.params.id, function(err, oficina) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Oficina Removida com Sucesso' });
  });
};