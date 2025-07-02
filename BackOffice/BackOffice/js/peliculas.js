function inicializarPeliculas() {
  if (!document.getElementById('body-peliculas')) {
    return;
  }
  const modal = document.getElementById('modal-peliculas');
  const btnAbrir = document.querySelector('.btn-abrir-modal'); 
  const btnCerrar = document.getElementById('btn-cerrar-modal');
  const form = document.getElementById('form-pelicula');
  const tbody = document.getElementById('body-peliculas');

  if (!modal || !btnAbrir || !btnCerrar || !form || !tbody) {
    console.warn('Algunos elementos no están presentes en la vista actual.');
    return;
  }

 function cargarPeliculas() {
  fetch('http://localhost:3000/api/v1/peliculas')
    .then(res => res.json())
    .then(peliculas => {
      peliculas.sort((a, b) => a.id - b.id);
      tbody.innerHTML = '';

        peliculas.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${u.id}</td>
          <td>${u.titulo}</td>
          <td>${u.descripcion}</td>
          <td>${u.anio}</td>
          <td>${u.duracion}</td>
          <td>${u.director}</td>
          <td>${u.clasificacion}</td>
          <td>${u.idioma}</td>
          <td>${u.url_portada ? `<img src="${u.url_portada}" width="40">` : 'Sin avatar'}</td>
          <td>
            <button class="btn-editar" data-id="${u.id}">✏️</button>
            <button class="btn-eliminar" data-id="${u.id}">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });

      agregarEventosBotones();
    });
  }
  cargarPeliculas();
  actualizarTotales();

  // Mostrar y ocultar modal
  btnAbrir.addEventListener('click', () => modal.classList.remove('oculto'));
  btnCerrar.addEventListener('click', () => modal.classList.add('oculto'));

  function agregarEventosBotones() {
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (confirm('¿Seguro que deseas eliminar este usuario?')) {
        fetch(`http://localhost:3000/api/v1/peliculas/${id}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(respuesta => {
          alert('Película eliminado correctamente');
          cargarPeliculas();
          actualizarTotales();
        })
        .catch(err => console.error('Error al eliminar:', err));
      }
    });
  });

    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        editarPelicula(id);
        });
    });
    }

    function editarPelicula(id) {
        fetch(`http://localhost:3000/api/v1/peliculas/${id}`)
        .then(res => res.json())
        .then(peliculas => {
        // Rellenar el formulario
        document.querySelector('#form-pelicula [name="titulo"]').value = peliculas.titulo;
        document.querySelector('#form-pelicula [name="descripcion"]').value = peliculas.descripcion;
        document.querySelector('#form-pelicula [name="anio"]').value = peliculas.anio;
        document.querySelector('#form-pelicula [name="duracion"]').value = peliculas.duracion;
        document.querySelector('#form-pelicula [name="director"]').value = peliculas.director;
        document.querySelector('#form-pelicula [name="clasificacion"]').value = peliculas.clasificacion;
        document.querySelector('#form-pelicula [name="idioma"]').value = peliculas.idioma;
        document.querySelector('#form-pelicula [name="url-portada"]').value = peliculas.url_portada || '';

        // Mostrar el modal
        document.getElementById('modal-peliculas').classList.remove('oculto');

        // Cambiar comportamiento del submit
        const form = document.getElementById('form-pelicula');
        form.onsubmit = function (e) {
            e.preventDefault();
            const datos = Object.fromEntries(new FormData(form));
            fetch(`http://localhost:3000/api/v1/peliculas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
            })
            .then(res => res.json())
            .then(() => {
            alert('Pelicula actualizada');
            form.reset();
            document.getElementById('modal-peliculas').classList.add('oculto');
            cargarPeliculas();
            form.onsubmit = null; 
            });
        };
        });
    }
  // Enviar formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form));
    fetch('http://localhost:3000/api/v1/peliculas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(respuesta => {
        if (respuesta.error) {
          alert('Error: ' + respuesta.error);
        } else {
          alert('Película agregada correctamente');
          form.reset();
          modal.classList.add('oculto');
          cargarPeliculas();
          actualizarTotales(); 
        }
      })
    .catch(err => console.error('Error:', err));
  });
}