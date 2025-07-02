const express = require('express');
const router = express.Router();
const controller = require('../controllers/calificacionController');

// Listar calificaciones de una película
router.get('/:pelicula_id', controller.getCalificacionesByPelicula);

// Obtener promedio de calificación de una película
router.get('/promedio/:pelicula_id', controller.getPromedioByPelicula);

// Crear nueva calificación
router.post('/', controller.createCalificacion);

module.exports = router;
