const express = require('express');
const router = express.Router();
const controller = require('../controllers/comentarioController');

// Comentarios
router.get('/:pelicula_id', controller.getComentariosByPelicula);
router.post('/', controller.createComentario);
router.put('/:id', controller.updateComentario);    
router.delete('/:id', controller.deleteComentario);  

module.exports = router;
