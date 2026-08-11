
// const botonCandado = document.querySelectorAll('.botonCandado');

// botonCandado.forEach(function(unBoton) {

//     unBoton.addEventListener('click', function() {
//         const suCaja = unBoton.closest('.cajaColor');
//         const estaActivo = suCaja.dataset.locked === 'true';

//          if (estaActivo) {
//             suCaja.dataset.locked = 'false';
//             unBoton.querySelector('img').src = 'Material/unlock.png';
//         } else {
//             suCaja.dataset.locked = 'true';
//             unBoton.querySelector('img').src = 'Material/lock.png';
//         };
        
//     });

// });


// botonCandado.addEventListener('click', function(){
//     const cajas = document.querySelectorAll(".cajaColor");

//     cajas.forEach(function () {
//         const estaActivo = cajas.dataset.locked === 'true'

//         if (estaActivo) {
//             cajas.dataset.locked = 'false';
//             botonCandado.querySelector('img').src = 'Material/unlock.png';
//         } else {
//             cajas.dataset.locked = 'true';
//             botonCandado.querySelector('img').src = 'Material/lock.png';
//         }
//     })


// })


// paleta.addEventListener('click', function(event) {
//     const unBoton = event.target.closest('.botonCopiar');
//     if (!unBoton) return;

//     const suCaja = unBoton.closest('.cajaColor');
//     const textoHexa = suCaja.querySelector('.textoHexa').textContent;

//     navigator.clipboard.writeText(textoHexa)
//         .then(function() {
//             alert ('Color copiado ' + textoHexa);
//         });
// });

// const botonDesbloquear = document.getElementById('borrarBloqueos');

// botonDesbloquear.addEventListener('click', function() {
//     const cajas = document.querySelectorAll(".cajaColor");

//     cajas.forEach(function (caja) {
//         const unBoton = caja.querySelector(".botonCandado");
//         if (caja.dataset.locked === 'true') {
//             caja.dataset.locked = 'false';
//             unBoton.querySelector('img').src = 'Material/unlock.png';
//         };
//     });
// });


// let tamañoElegido = 6; // memoria del tamaño elegido, arranca en 6

// selectorPaleta.addEventListener('change', function(caja) {
//     tamañoElegido = Number(selectorPaleta.value);
// });

// botonGenerar.addEventListener('click', function() {
//     const cantidadActual = paleta.querySelectorAll('.cajaColor').length;

//     // Si el tamaño de la paleta es diferente de la actual se cambia antes de generarse
//     if (tamañoElegido != cantidadActual) {

//         // Revisa si hay un color bloqueado anstes de poder crear una nueva
//         const cajasArray = Array.from(document.querySelectorAll(".cajaColor"));
//         const hayBloqueado = cajasArray.some(function(caja) {
//             return caja.dataset.locked === 'true';
//         });

//         if (hayBloqueado) {
//             alert('Desbloquea los colores para crear nueva');
//             return;
//         };
        
//         construirPaleta(tamañoElegido);
//         return;
//     };

//     // Si la paleta es igual se genera
//     const cajasArray = Array.from(document.querySelectorAll(".cajaColor"));
//     const hayDesbloqueado = cajasArray.every(function(caja) {
//         return caja.dataset.locked === 'true';
//     });
//     if (hayDesbloqueado) {
//         alert('Todos los colores estan desbloqueados, no se puede generar paleta');
//         return;
//     }

//     generarPaleta()    
// })

// function actualizarFormato() {
//     const cajas = document.querySelectorAll(".cajaColor");

//     cajas.forEach(function(caja) {

//         const cajaHexa = caja.querySelector('.textoHexa');
//         const cajaFormato = caja.querySelector('.textoFormato');
//         const rgb = hexToRgb(cajaHexa);

//         if (selectorFormato.value === 'hsl') {
//             cajaFormato.textContent = rgbToHsl(rgb.r, rgb.g, rgb.b);
//         } else {
//             cajaFormato.textContent = rgbaTexto(rgb.r, rgb.g, rgb.b);
//         }
//     });    
// };

// const botonGuardar = document.getElementById('botonGuardar');

// botonGuardar.addEventListener('click', function() {
//     // Objener los Hexa como Array
//     const cajaArray = Array.from(document.querySelectorAll('.cajaColor'));
//     const coloresActuales = cajaArray.map(function(caja) {
//         return caja.querySelector('.textoHexa').textContent;
//     });

//     console.log(coloresActuales);
    
//     // Generar ID de cada paleta
//     const paletaNueva = { id: Date.now(), colores: coloresActuales };

//     // Lee lo que se guardo en una clave fija de texto y crea el array
//     const guardado = localStorage.getItem('paletasGuardadas');
//     const lista = guardado ? JSON.parse(guardado) : [];

//     // Agrega el nuevo elemento a la lista
//     lista.push(paletaNueva);

//     // Guarda TODO junto con el nuevo elemento
//     localStorage.setItem('paletasGuardadas', JSON.stringify(lista));

//     console.log(localStorage.getItem('paletasGuardadas'));
    
// });


// function mostrarToast(mensaje) {
//     const contenedor = document.getElementById('contenedorToasts');

//     const toast = document.createElement('div');
//     toast.className = 'toast';
//     toast.textContent = mensaje;
//     contenedor.appendChild(toast);

//     setTimeout(function() {
//         toast.classList.add('mostrar');
//     }, 10);

//     setTimeout(function() {
//         toast.classList.remove('mostar');
//         setTimeout(function() {
//             toast.remove();
//         }, 300);
//     }, 2500);
// }