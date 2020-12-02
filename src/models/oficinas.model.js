"user strict";
var dbConn = require("../../config/db.config");

//Employee object create
var Oficinas = function (oficina) {
  this.nome = oficina.nome;
  this.cnpj = oficina.cnpj;
  this.rua = oficina.rua;
  this.numero = oficina.numero;
  this.bairro = oficina.bairro;
  this.cidade = oficina.cidade;
  this.estado = oficina.estado;
  this.latitude = oficina.latitude;
  this.longitude = oficina.longitude;
  this.id_usuario = oficina.id_usuario;
  this.criadoEm = new Date();
  this.atualizadoEm = new Date();
  this.cep = oficina.cep;
  this.ddd = oficina.ddd;
  this.telefone1 = oficina.telefone1;
  this.telefone2 = oficina.telefone2;
};

Oficinas.create = function (novaOficina, result) {
  dbConn.query("INSERT INTO oficinas set ?", novaOficina, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Oficinas.findById = function (id, result) {
  dbConn.query("Select * from oficinas where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Oficinas.findByBairro = function (Bairro, result) {
  dbConn.query(
    "Select * from oficinas where bairro = ? ",
    Bairro,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Oficinas.findByCat = function (CategoriaId, page, limit, result) {
  const pagina = parseInt(page);
  const offset = (pagina - 1) * limit;
  dbConn.query(
    "Select * from oficinas where veiculos_aceitos = " +
      CategoriaId +
      "limit " +
      limit +
      " OFFSET " +
      offset,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Oficinas.getPagination = function (page, limit, result) {
  const pagina = parseInt(page);
  const offset = (pagina - 1) * limit;
  dbConn.query(
    "Select * from oficinas limit " + limit + " OFFSET " + offset,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Oficinas.findBairro = function (result) {
  dbConn.query("Select bairro from oficinas", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("oficinas : ", res);
      result(null, res);
    }
  });
};

Oficinas.findAll = function (result) {
  dbConn.query("Select * from oficinas limit 20", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("oficinas : ", res);
      result(null, res);
    }
  });
};
Oficinas.update = function (id, oficinas, result) {
  dbConn.query(
    "UPDATE oficinas SET nome=?,cnpj=?,rua=?,numero=?,bairro=?,cidade=?, estado=?, latitude=?, longitude=?, id_usuario =?, criadoEm=?, atualizadoEm=?,cep=?, ddd=?, telefone1=?, telefone2=?, WHERE id = ?",
    [
      oficinas.nome,
      oficinas.cnpj,
      oficinas.rua,
      oficinas.numero,
      oficinas.bairro,
      oficinas.cidade,
      oficinas.estado,
      oficinas.latitude,
      oficinas.longitude,
      oficinas.id_usuario,
      oficinas.criadoEm,
      oficinas.editadoEm,
      oficinas.cep,
      oficinas.ddd,
      oficinas.telefone1,
      oficinas.telefone2,
      id,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Oficinas.delete = function (id, result) {
  dbConn.query("DELETE FROM oficinas WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Oficinas;
