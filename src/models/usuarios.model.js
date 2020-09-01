'user strict';
var dbConn = require('../../config/db.config');

//Employee object create
var Usuarios = function(usuario){
    this.primeiroNome     = usuario.primeiroNome;
    this.segundoNome      = usuario.segundoNome;
    this.email            = usuario.email;
    this.senha            = usuario.senha;
    this.adm              = usuario.adm
    this.criadoEm       = new Date();
    this.editadoEm       = new Date();
};

Usuarios.create = function (novoUsuario, result) {    
    dbConn.query("INSERT INTO usuariosradar set ?", novoUsuario, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
Usuarios.findById = function (id, result) {
    dbConn.query("Select * from usuariosradar where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Usuarios.findAll = function (result) {
    dbConn.query("Select * from usuariosradar", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('employees : ', res);  
            result(null, res);
        }
    });   
};
Usuarios.update = function(id, usuario, result){
  dbConn.query("UPDATE usuariosradar SET primeiroNome=?,segundoNome=?,email=?,senha=?,adm=?,criadoEm=? WHERE id = ?", [usuario.primeiroNome,usuario.SegundoNome,usuario.email,usuario.senha, usuario.criadoEm, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Usuarios.delete = function(id, result){
     dbConn.query("DELETE FROM usuariosradar WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Usuarios ;