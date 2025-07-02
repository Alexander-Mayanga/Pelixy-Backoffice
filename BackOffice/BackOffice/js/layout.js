document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem("logueado") !== "true") {
    window.location.href = "index.html";
    return; 
  }

  // Cargar HEADER
  fetch('partials/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    });

  // Cargar SIDEBAR
  fetch('partials/sidebar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('sidebar').innerHTML = data;

      // Agregar evento al botón de cerrar sesión
      const btnCerrar = document.getElementById("cerrarSesion");
      if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
          localStorage.removeItem("logueado");
          window.location.href = "index.html";
        });
      }
    });

  // Cargar DASHBOARD (reportes)
  fetch('views/dashboard.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('contenido').innerHTML = data;
    });
});