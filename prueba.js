

// FORMATO ADICIONAL

const botonCandado = document.querySelectorAll('.botonCandado')

botonCandado.forEach(function (unBoton) {

    unBoton.addEventListener('click', function() {
        console.log('Clickeaste');
        
    });

});


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