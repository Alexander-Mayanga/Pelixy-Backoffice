const db = require('../config/database');

// Listar calificaciones por película
exports.getCalificacionesByPelicula = async (req, res) => {
  const { pelicula_id } = req.params;
  try {
    const result = await db.query(
      `SELECT c.id, c.usuario_id, c.pelicula_id, c.puntuacion, c.fecha_calificacion, u.nombre AS nombre_usuario 
       FROM calificaciones c 
       JOIN usuarios u ON c.usuario_id = u.id 
       JOIN peliculas p ON c.pelicula_id = p.id
       WHERE c.pelicula_id = $1
       ORDER BY c.fecha_calificacion DESC`,       
      [pelicula_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener calificaciones' });
  }
};

// Registrar calificación
exports.createCalificacion = async (req, res) => {
  const { usuario_id, pelicula_id, puntuacion } = req.body;

  // Validar
  if(!usuario_id || !pelicula_id || !puntuacion){
    return res.status(400).json({error: 'Todos los campos son obligatorios'});
  }

  if(puntuacion < 1 || puntuacion > 5){
    return res.status(400).json({error: 'La puntuación debe ser entre 1 y 5'});
  }

  try {
    await db.query(
      `INSERT INTO calificaciones (usuario_id, pelicula_id, puntuacion)
       VALUES ($1, $2, $3)`,
      [usuario_id, pelicula_id, puntuacion]
    );
    res.status(201).json({ mensaje: 'Calificación registrada correctamente' });
  } catch (error) {
    if(error.code === '23503'){
       return res.status(400).json({error:'Usuario o pelicula no existe'});
    }
    res.status(500).json({ error: 'Error al registrar calificación' });
  }
};

// Ver promedio de calificaciones
exports.getPromedioByPelicula = async (req, res) => {
  const { pelicula_id } = req.params;

  if(!pelicula_id){
    return res.status(400).json({error: 'ID de pelicula no encontrada'});
  }

  try {
    const result = await db.query(
      `SELECT AVG(c.puntuacion)::numeric(10,2) AS promedio,
       COUNT(*) AS total_calificaciones,
       p.titulo 
       FROM calificaciones c
       JOIN peliculas p ON c.pelicula_id = p.id 
       WHERE pelicula_id = $1
       GROUP BY p.titulo`,
      [pelicula_id]
    );

    if(result.rows.length === 0){
      return res.json({
        pelicula_id: Number(pelicula_id),
        titulo: 'Película sin título',
        promedio: 0.00,
        total_calificaciones: 0,
        calificaciones: []
      });
    }

    const { promedio, total_calificaciones, titulo } = result.rows[0];

    // Obtener detalles
    const detallesResult = await db.query(
      `SELECT 
        c.id,
        c.usuario_id,
        u.nombre AS nombre_usuario,
        c.puntuacion,
        c.fecha_calificacion
      FROM calificaciones c
      JOIN usuarios u ON c.usuario_id = u.id
      WHERE c.pelicula_id = $1
      ORDER BY c.fecha_calificacion DESC`,
      [pelicula_id]
    );

    res.json({
      pelicula_id: Number(pelicula_id),
      titulo,
      promedio: Number(promedio),
      total_calificaciones: Number(total_calificaciones),
      calificaciones: detallesResult.rows
    });

  } catch (error) {
    console.error('Error al obtener promedio:', error);
    res.status(500).json({ error: 'Error al obtener promedio' });
  }
};
