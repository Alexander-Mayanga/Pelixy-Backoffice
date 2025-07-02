class Usuario {
  constructor(id, nombre, apellido, correo, contraseña, avatar_url, fecha_nacimiento, pais, fecha_registro) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contraseña = contraseña;
    this.avatar_url = avatar_url;
    this.fecha_nacimiento = fecha_nacimiento;
    this.pais = pais;
    this.fecha_registro = fecha_registro;
  }
}

module.exports = Usuario;

