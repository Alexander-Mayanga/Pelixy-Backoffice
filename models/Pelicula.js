class Pelicula {
  constructor(id, titulo, descripcion, anio, duracion, director, clasificacion, idioma, url_portada, fecha_registro) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.anio = anio;
    this.duracion = duracion;
    this.director = director;
    this.clasificacion = clasificacion;
    this.idioma = idioma;
    this.url_portada = url_portada;
    this.fecha_registro = fecha_registro;
  }
}

module.exports = Pelicula;
