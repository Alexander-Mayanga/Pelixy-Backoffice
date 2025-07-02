class Comentario {
  constructor(id, usuario_id, pelicula_id, contenido, fecha_comentario) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.pelicula_id = pelicula_id;
    this.contenido = contenido;
    this.fecha_comentario = fecha_comentario;
  }
}

module.exports = Comentario;
