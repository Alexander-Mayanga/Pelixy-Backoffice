const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

// Usuarios
router.get('/totales/usuarios', controller.getTotalUsuarios);
router.post('/register', controller.registerUsuario);
router.post('/login', controller.loginUsuario);
router.get('/', controller.getUsuarios);
router.get('/:id', controller.getUsuarioById);
router.put('/:id', controller.updateUsuario);  
router.delete('/:id', controller.deleteUsuario);

module.exports = router;
