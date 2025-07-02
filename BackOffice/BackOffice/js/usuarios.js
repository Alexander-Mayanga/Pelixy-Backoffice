function inicializarUsuarios() {
  if (!document.getElementById('body-usuarios')) {
    return;
  }
  const modal = document.getElementById('modal-usuario');
  const btnAbrir = document.querySelector('.btn-abrir-modal'); 
  const btnCerrar = document.getElementById('btn-cerrar-modal');
  const form = document.getElementById('form-usuario');
  const tbody = document.getElementById('body-usuarios');

  if (!modal || !btnAbrir || !btnCerrar || !form || !tbody) {
    console.warn('Algunos elementos no están presentes en la vista actual.');
    return;
  }

 function cargarUsuarios() {
  fetch('http://localhost:3000/api/v1/usuarios')
    .then(res => res.json())
    .then(usuarios => {
      usuarios.sort((a, b) => a.id - b.id);
      tbody.innerHTML = '';

      usuarios.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${u.id}</td>
          <td>${u.nombre}</td>
          <td>${u.apellido}</td>
          <td>${u.correo}</td>
          <td>${u.pais}</td>
          <td>${u.avatar_url ? `<img src="${u.avatar_url}" width="40">` : 'Sin avatar'}</td>
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
  cargarUsuarios();
  actualizarTotales();

  // Mostrar y ocultar modal
  btnAbrir.addEventListener('click', () => modal.classList.remove('oculto'));
  btnCerrar.addEventListener('click', () => modal.classList.add('oculto'));

  function agregarEventosBotones() {
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (confirm('¿Seguro que deseas eliminar este usuario?')) {
        fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(respuesta => {
          alert('Usuario eliminado correctamente');
          cargarUsuarios();
          actualizarTotales();
        })
        .catch(err => console.error('Error al eliminar:', err));
      }
    });
  });

    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        editarUsuario(id);
        });
    });
    }

    function editarUsuario(id) {
        fetch(`http://localhost:3000/api/v1/usuarios/${id}`)
        .then(res => res.json())
        .then(usuario => {
        // Rellenar el formulario
        document.querySelector('#form-usuario [name="nombre"]').value = usuario.nombre;
        document.querySelector('#form-usuario [name="apellido"]').value = usuario.apellido;
        document.querySelector('#form-usuario [name="correo"]').value = usuario.correo;
        document.querySelector('#form-usuario [name="pais"]').value = usuario.pais;
        document.querySelector('#form-usuario [name="contraseña"]').value = usuario.contraseña || '';
        document.querySelector('#form-usuario [name="avatar_url"]').value = usuario.avatar_url || '';

        // Mostrar el modal
        document.getElementById('modal-usuario').classList.remove('oculto');

        // Cambiar comportamiento del submit
        const form = document.getElementById('form-usuario');
        form.onsubmit = function (e) {
            e.preventDefault();
            const datos = Object.fromEntries(new FormData(form));
            fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
            })
            .then(res => res.json())
            .then(() => {
            alert('Usuario actualizado');
            form.reset();
            document.getElementById('modal-usuario').classList.add('oculto');
            cargarUsuarios();
            form.onsubmit = null; 
            });
        };
        });
    }
  // Enviar formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form));
    fetch('http://localhost:3000/api/v1/usuarios/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(respuesta => {
        if (respuesta.error) {
          alert('Error: ' + respuesta.error);
        } else {
          alert('Usuario agregado correctamente');
          form.reset();
          modal.classList.add('oculto');
          cargarUsuarios();
          actualizarTotales(); 
        }
      })
    .catch(err => console.error('Error:', err));
  });
}