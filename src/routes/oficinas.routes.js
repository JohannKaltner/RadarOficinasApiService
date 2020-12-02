const express = require("express");
const router = express.Router();
const oficinasController = require("../controllers/oficinas.controller");

router.get("/listarTodos", oficinasController.findAll);

router.get("/listaBairros", oficinasController.findBairro);

router.get(
  "/ListaPorCategorias/:CategoriaId",
  oficinasController.findByCategory
);

router.get("/", oficinasController.getPagination);

router.post("/", oficinasController.create);

router.get("/:id", oficinasController.findById);

router.put("/:id", oficinasController.update);

router.delete("/:id", oficinasController.delete);

module.exports = router;
