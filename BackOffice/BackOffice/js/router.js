document.addEventListener('DOMContentLoaded', () => {
  function cargarVista(ruta) {
    fetch(ruta)
      .then(response => response.text())
      .then(html => {
        document.getElementById('contenido').innerHTML = html;

        if (ruta.includes('usuarios.html')) {
          const script = document.createElement('script');
          script.src = 'js/usuarios.js'; 
          script.onload = () => inicializarUsuarios(); 
          document.body.appendChild(script);
        }

        if (ruta.includes('peliculas.html')) {
          const script = document.createElement('script');
          script.src = 'js/peliculas.js'; 
          script.onload = () => inicializarPeliculas(); 
          document.body.appendChild(script);
        }

        if (ruta.includes('dashboard.html')) {
          const script = document.createElement('script');
          script.src = 'js/reportes.js';
          script.onload = () => {
            if (typeof actualizarTotales === 'function') {
              actualizarTotales(); 
            }
          };
          document.body.appendChild(script);
        }
      })
      .catch(err => {
        document.getElementById('contenido').innerHTML = '<p>Error al cargar la vista</p>';
        console.error('Error al cargar vista', err);
      });
  }

  // Cargar la vista principal al iniciar
  cargarVista('views/dashboard.html');

  // Cargar el sidebar y enlazar eventos de navegación
  fetch('partials/sidebar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('sidebar').innerHTML = html;

      document.getElementById('sidebar').addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
          e.preventDefault();
          const vista = link.getAttribute('href');
          cargarVista(vista);
        }
      });
    });
});