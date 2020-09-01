const express = require('express')
const router = express.Router()
const usuariosControler = require('../controllers/usuarios.controller');

// Retrieve all employees
router.get('/', usuariosControler.findAll);

// Create a new employee
router.post('/', usuariosControler.create);

// Retrieve a single employee with id
router.get('/:id', usuariosControler.findById);

// Update a employee with id
router.put('/:id', usuariosControler.update);

// Delete a employee with id
router.delete('/:id', usuariosControler.delete);

module.exports = router