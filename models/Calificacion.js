class Calificacion {
  constructor(id, usuario_id, pelicula_id, puntuacion, fecha_calificacion) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.pelicula_id = pelicula_id;
    this.puntuacion = puntuacion;
    this.fecha_calificacion = fecha_calificacion;
  }
}

module.exports = Calificacion;
