function toggleMobileNavbar() {
  document.getElementById("nav-links-container").classList.toggle("active");
}

const buttons = document.querySelectorAll(".card");
buttons.forEach((button) => {
  // const ruta = button.dataset.ruta;
  button.addEventListener("click", function () {
    window.location.href = "/Municipalidad v1.1rev/perfiles/admin/d-0003.html";
  // window.location.href = `/perfiles/admin/${ruta}`;
  });
});

//Iniciar sesion
const loginButton = document.getElementById('iniciarSesionButton');
if (loginButton) {
  loginButton.addEventListener("click", function() {
    window.location.href = "/Municipalidad v1.1rev/login.html";
  });
}

const loginButton2 = document.getElementById('iniciarSesionButton2');
if (loginButton2) {
  loginButton2.addEventListener("click", function() {
    window.location.href = "/Municipalidad v1.1rev/login.html";
  });
}
// Función para mostrar el contenido completo
document.querySelectorAll('.leer-mas-btn').forEach(button => {
  button.addEventListener('click', function() {
    const contenidoExpandido = this.previousElementSibling; // Selecciona el contenedor de texto adicional
    if (contenidoExpandido.style.maxHeight) {
      // Si ya está abierto, lo cerramos
      contenidoExpandido.style.maxHeight = null;
      this.textContent = 'Leer más';
    } else {
      // Si está cerrado, lo abrimos
      contenidoExpandido.style.maxHeight = contenidoExpandido.scrollHeight + "px";
      this.textContent = 'Leer menos';
    }
     // Recalcular el tamaño del contenedor tarjetaTop1. No funciona
     requestAnimationFrame(() => {
      tarjeta.style.height = "auto";  // Forzamos un ajuste automático de la altura
    });
  });
});

// Función para editar el TÍTULO del servicio
function editarTitulo() {
  const servicioTitle = document.getElementById('servicio-title');

  const tituloActual = servicioTitle.childNodes[0].textContent.trim(); // Solo el texto sin íconos

  servicioTitle.innerHTML = `
    <input type="text" id="edit-title" value="${tituloActual}" />
    <i class="bi bi-check-circle" onclick="guardarTitulo()"></i>`;
}

// Función para guardar el nuevo título
function guardarTitulo() {
  const nuevoTitulo = document.getElementById('edit-title').value;
  const servicioTitle = document.getElementById('servicio-title');

  servicioTitle.innerHTML = `
    ${nuevoTitulo}
    <i class="bi bi-pencil-fill edit-icon" onclick="editarTitulo()"></i>
  `;
}

function editarTexto() {
  const textoCorto = document.getElementById('servicio-texto-corto');
  const textoExpandido = document.getElementById('servicio-texto-expandido');

  const textoActualCorto = textoCorto.innerText.trim();
  const textoActualExpandido = textoExpandido.innerText.trim();

  // Oculta la parte expandida mientras se edita
  textoExpandido.style.display = 'none';

  // Une los textos y muestra un textarea para editar todo
  textoCorto.innerHTML = `
    <textarea id="edit-text" rows="6">${textoActualCorto + '\n\n' + textoActualExpandido}</textarea>
    <i class="bi bi-check-circle" onclick="guardarTexto()"></i>
  `;
}

function guardarTexto() {
  const nuevoTexto = document.getElementById('edit-text').value;

  // Dividir el texto si quieres seguir usando el "Leer más"
  const partes = nuevoTexto.split('\n\n');
  const textoCortoNuevo = partes[0];
  const textoExpandidoNuevo = partes.slice(1).join('\n\n'); // Lo que sigue

  const textoCorto = document.getElementById('servicio-texto-corto');
  const textoExpandido = document.getElementById('servicio-texto-expandido');

  // Usar innerText para evitar insertar otro lápiz dentro del texto
  textoCorto.innerText = textoCortoNuevo;
  textoExpandido.innerHTML = `<p>${textoExpandidoNuevo}</p>`;
  textoExpandido.style.display = ''; // Mostrarlo de nuevo

  // Eliminar el textarea después de guardar
  const textarea = document.getElementById('edit-text');
  textarea.remove();  // Esto eliminará el <textarea> una vez se haya guardado.
}


// Función para guardar todos los cambios abiertos (título y texto)
function guardarTodosLosCambios() {
  // Guardar el título
  guardarTitulo();

  // Encuentra todos los elementos de texto editables (en este caso los textareas)
  const textareas = document.querySelectorAll('textarea');

  // Recorre todos los textareas y guarda los cambios
  textareas.forEach((textarea) => {
    const nuevoTexto = textarea.value;
    const contenedor = textarea.closest('.tarjeta'); // Encuentra la tarjeta contenedora

    // Ahora buscamos el elemento donde se debe actualizar el texto
    const textoCorto = contenedor.querySelector('.tarjeta-texto');
    const textoExpandido = contenedor.querySelector('.contenido-expandido');

    // Dividir el nuevo texto en "corto" y "expandido" si es necesario
    const partes = nuevoTexto.split('\n\n');
    const textoCortoNuevo = partes[0]; // Texto corto
    const textoExpandidoNuevo = partes.slice(1).join('\n\n'); // Texto expandido

    // Actualiza el contenido de los elementos de texto
    textoCorto.innerText = textoCortoNuevo;
    textoExpandido.innerHTML = `<p>${textoExpandidoNuevo}</p>`;
    
    // Restablecer el campo a su estado original (deja de ser un textarea)
    textarea.remove();
  });

  // Mensaje alerta
  alert("Cambios guardados correctamente.");
}
