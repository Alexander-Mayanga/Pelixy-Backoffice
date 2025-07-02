const express = require('express');
const cors = require('cors');
const app = express();

// Importar rutas
const peliculaRoutes = require('./routes/peliculas');
const usuarioRoutes = require('./routes/usuarios');
const comentarioRoutes = require('./routes/comentarios');
const calificacionRoutes = require('./routes/calificaciones');

// Middleware
app.use(cors());
app.use(express.json());
// Prefijos de rutas
app.use('/api/v1/peliculas', peliculaRoutes);
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/comentarios', comentarioRoutes);
app.use('/api/v1/calificaciones', calificacionRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

