const express = require('express');
const router = express.Router();
const controller = require('../controllers/peliculaController');

// CRUD de películas
router.get('/totales/peliculas', controller.getTotalPeliculas);
router.post('/', controller.createPelicula);
router.get('/:id', controller.getPeliculaById);
router.put('/:id', controller.updatePelicula);
router.delete('/:id', controller.deletePelicula);

router.get('/', controller.getPeliculas);
module.exports = router;
