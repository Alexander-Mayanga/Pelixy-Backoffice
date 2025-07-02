const db = require('../config/database');

// Obtener comentarios por película
exports.getComentariosByPelicula = async (req, res) => {
  const { pelicula_id } = req.params;

  if(!pelicula_id){
    return res.status(400).json({error: 'ID de película requerido'});
  }

  try {
    const result = await db.query(
      `SELECT 
        c.id, 
        c.usuario_id,
        u.nombre AS nombre_usuario,
        c.pelicula_id,
        c.contenido,
        c.fecha_comentario 
       FROM comentarios c 
       JOIN usuarios u ON c.usuario_id = u.id 
       WHERE c.pelicula_id = $1 
       ORDER BY fecha_comentario DESC`,
      [pelicula_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

// Agregar comentario
exports.createComentario = async (req, res) => {
  const { usuario_id, pelicula_id, contenido } = req.body;

  //Validar
  if(!usuario_id || !pelicula_id || !contenido){
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  if(contenido.trim().length === 0){
    return res.status(400).json({ error: 'El contenido no puede estar vacío' });
  }

  try {
    await db.query(
      `INSERT INTO comentarios (usuario_id, pelicula_id, contenido)
       VALUES ($1, $2, $3)`,
      [usuario_id, pelicula_id, contenido]
    );
    res.status(201).json({ mensaje: 'Comentario agregado correctamente' });

  } catch (error) {

    if(error.code === '23503'){
      return res.status(400).json({ error: 'Usuario o película no existen' });
    }

    console.error('Error al agregar comentario:', error);
    res.status(500).json({ error: 'Error al agregar comentario' });
  }
};

// Editar comentario
exports.updateComentario = async (req, res) => {
  const { id } = req.params;
  const { contenido } = req.body;

  //Validar
  if(!id){
    return res.status(400).json({ error: 'ID de comentario requerido' });
  }

  if(!contenido || contenido.trim().length === 0){
    return res.status(400).json({ error: 'El contenido no puede estar vacío' });
  }

  try {
    //Verificar si el comentario existe
    const existe = await db.query(
      `SELECT id FROM comentarios WHERE id = $1`,
      [id]
    );

    if(existe.rows.length === 0 ){
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    //Actualizar
    await db.query(
      `UPDATE comentarios SET contenido = $1 WHERE id = $2`,
      [contenido.trim(), id]
    );

    res.json({ mensaje: 'Comentario actualizado correctamente' });
  } catch (error) {
    console.error( 'Error al actualizar comentario: ', error);
    res.status(500).json({ error: 'Error al actualizar comentario' });
  }
};

// Eliminar comentario
exports.deleteComentario = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).json({ error: 'ID de comentario requerido' });
  }

  try {
    //Verificar si el comentario existe
    const existe = await db.query(
      `SELECT id FROM comentarios WHERE id = $1`,
      [id]
    );

    if (existe.rows.length === 0) {
      return res.status(404).json({error: 'Comentario no encontrado'});
    }
    //Eliminar comentario
    await db.query(`DELETE FROM comentarios WHERE id = $1`, [id]);

    res.json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ error: 'Error al eliminar comentario' });
  }
};
