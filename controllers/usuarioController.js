const db = require('../config/database');

// Registrar usuario
exports.registerUsuario = async (req, res) => {
  const { nombre, apellido, correo, contraseña, avatar_url, fecha_nacimiento, pais } = req.body;
  //Validacion
  if(!nombre || nombre.trim() === ''){
    return res.status(400).json({error: 'El nombre es obligatorio'});
  }
  if(!correo || correo.trim() === ''){
    return res.status(400).json({error: 'El correo es obligatorio'});
  }
  if(!contraseña || contraseña.trim().length < 4){
    return res.status(400).json({error: 'La contraseña debe tener al menos 4 caracteres'});
  }

  try {
    const result = await db.query(
      `INSERT INTO usuarios (nombre, apellido, correo, contraseña, avatar_url, fecha_nacimiento, pais)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, nombre, apellido, correo, avatar_url, fecha_nacimiento, pais, fecha_registro`,
      [nombre.trim(), 
       apellido || '',
       correo.trim().toLowerCase(),
       contraseña.trim(),
       avatar_url || '',
       fecha_nacimiento || null, 
       pais || ''
      ]
    );

    res.status(201).json({ 
      mensaje: 'Usuario registrado correctamente',
      usuario: result.rows[0]
    });
  } catch (error) {
    if(error.code === '23505'){
      return res.status(400).json({error: 'El correo ya está registrado'});
    }
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login usuario
exports.loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;
  //Validar campos
  if(!correo || !contraseña){
    return res.status(400).json({error: 'Correo y contraseña son obligatorios'});
  }

  try {
    //Buscar usuario
    const result = await db.query(
      'SELECT * FROM usuarios WHERE correo = $1', 
      [correo.trim().toLowerCase()]
    );

    const usuario = result.rows[0];

    if(!usuario){
      return res.status(401).json({error: 'Usuario no encontrado'});
    }

    //Validar contraseña
    if(usuario.contraseña !== contraseña.trim()){
      return res.status(401).json({error: 'Contraseña incorrecta'});
    }

    //Eliminar campo contraseña antes de enviar 
    delete usuario.contraseña;

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario
    });

  } catch (error) {
    console.error('Error al iniciar sesión', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Listar todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        id,
        nombre,
        apellido,
        correo,
        avatar_url,
        fecha_nacimiento,
        pais,
        fecha_registro
        FROM usuarios
        ORDER BY fecha_registro DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  } 
};

// Obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  //Validar
  if(!id || isNaN(id)){
    return res.status(400).json({error: 'ID de usuario inválido'});
  }

  try {
    const result = await db.query(
      `SELECT id, nombre, apellido, correo, avatar_url, fecha_nacimiento, pais, fecha_registro 
       FROM usuarios 
       WHERE id = $1`, 
       [id]
    );

    if (result.rows.length === 0){
      return res.status(404).json({ error: 'Usuario no encontrado' });
    } 

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Eliminar usuario por ID
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  //Validar
  if(!id || isNaN(id)){
    return res.status(400).json({error: 'ID inválido'});
  }

  try {
    const existe = await db.query(
      'SELECT id, nombre, correo FROM usuarios WHERE id = $1', 
      [id]
    );

    if(existe.rows.length === 0 ){
      return res.status(404).json({error: 'Usuario no encontrado'});
    }

    const usuario = existe.rows[0];
    //Eliminar usuario
    await db.query('DELETE FROM usuarios WHERE id = $1', [id]);

    res.json({ 
      mensaje: 'Usuario eliminado correctamente',
      usuario_eliminado: usuario
    });

  } catch (error) {
    console.error('Error al eliminar usuarios:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

// Editar usuario
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, avatar_url, fecha_nacimiento, pais } = req.body;
  
  //Validar
  if(!id || isNaN(id)){
    return res.status(400).json({error: 'ID inválido'});
  }

  if(!nombre || nombre.trim().length === 0 ){
    return res.status(400).json({error: 'El nombre es obligatorio'});
  }

  try {
    //Verificar si usuario existe
    const existe = await db.query('SELECT id FROM usuarios WHERE id = $1', [id]);
    if(existe.rows.length === 0 ){
      return res.status(404).json({error: 'Usuario no encontrado'});
    }

    //Actualizar usuario
    await db.query(
      `UPDATE usuarios 
       SET nombre = $1, apellido = $2, avatar_url = $3, fecha_nacimiento = $4, pais = $5 
       WHERE id = $6`,
      [
        nombre.trim(),
        apellido || '',
        avatar_url || '',
        fecha_nacimiento || null,
        pais || '',
        id
      ]
    );
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario: ', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

  //Obtener total de usuarios
  exports.getTotalUsuarios = async (req, res) => {
    try {
      const result = await db.query('SELECT COUNT(*) AS total FROM usuarios');
      res.json({ total: parseInt(result.rows[0].total) });
    } catch (error) {
      console.error('Error al contar usuarios:', error);
      res.status(500).json({ error: 'Error al contar usuarios' });
    }
  };
