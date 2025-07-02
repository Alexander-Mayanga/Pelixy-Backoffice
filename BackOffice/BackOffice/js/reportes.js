function actualizarTotales() {
  // Total de usuarios
  fetch('http://localhost:3000/api/v1/usuarios/totales/usuarios')
    .then(res => res.json())
    .then(data => {
      const spanUsuarios = document.getElementById('total-usuarios');
      if (spanUsuarios) {
        spanUsuarios.textContent = data.total;
      }
    })
    .catch(err => console.error('Error al obtener total de usuarios:', err));

  const spanPeliculas = document.getElementById('total-peliculas');
  if (spanPeliculas) {
    fetch('http://localhost:3000/api/v1/peliculas/totales/peliculas')
      .then(res => res.json())
      .then(data => {
        spanPeliculas.textContent = data.total;
      })
      .catch(err => console.error('Error al obtener total de películas:', err));
  }
}