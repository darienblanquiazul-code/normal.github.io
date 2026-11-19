document.addEventListener('DOMContentLoaded', function() {
  const contenedor = document.getElementById('carrusel');
  if (!contenedor) return;

  // Convertimos NodeList a un Array real para manipularlo mejor
  const tarjetas = Array.from(document.querySelectorAll('.card'));
  const total = tarjetas.length;
  
  let indiceActual = 0;
  let intervalo;
  const tiempoRotacion = 2000;

  // 1. Lógica para asignar los "roles"
  function actualizarCarrusel() {
    // Primero, limpiamos las clases de todas las tarjetas
    tarjetas.forEach(tarjeta => {
      tarjeta.classList.remove('activa', 'anterior', 'siguiente');
    });

    // Calculamos quién va antes y quién va después en el círculo
    // (Sumamos 'total' antes del módulo para evitar números negativos en JavaScript)
    const indiceAnterior = (indiceActual - 1 + total) % total;
    const indiceSiguiente = (indiceActual + 1) % total;

    // Asignamos las nuevas posiciones
    tarjetas[indiceActual].classList.add('activa');
    tarjetas[indiceSiguiente].classList.add('siguiente');
    tarjetas[indiceAnterior].classList.add('anterior');
  }

  // 2. Función para avanzar
  function avanzar() {
    indiceActual = (indiceActual + 1) % total;
    actualizarCarrusel();
  }

  // 3. Control del tiempo (sin cambios)
  function iniciar() {
    clearInterval(intervalo);
    intervalo = setInterval(avanzar, tiempoRotacion);
  }

  function detener() {
    clearInterval(intervalo);
  }

  // 4. Interacciones (sin cambios)
  contenedor.addEventListener('mouseenter', detener);
  contenedor.addEventListener('mouseleave', iniciar);
  
  contenedor.addEventListener('touchstart', detener, { passive: true });
  contenedor.addEventListener('touchend', iniciar);

  // 5. Inicializar la primera vista
  actualizarCarrusel();
  iniciar();
});