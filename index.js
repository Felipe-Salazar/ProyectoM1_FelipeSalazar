// PRELIMINARES
// Genera color aleatorio en Hexadecimal
function generarColorAleatorio() {
    const caracteres = "0123456789ABCDEF";
    let hexa = "#";
    for (let i = 0; i < 6; i++) {
        hexa += caracteres[Math.floor(Math.random() * 16)];
    }
    return hexa;
}

//Covertir Hexa a RGB
function hexToRgb (hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return { r, g, b };
}

function rgbaTexto(r, g, b) {
    return `RGBA(${r}, ${g}, ${b}, 1)`;
}

//Convertir RGBA a HSL
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // gris, sin saturación
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `HSL(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}



// BOTON GENERAR PALETA
const botonGenerar = document.getElementById("generarPaleta");
const selectorFormato = document.getElementById('formatoPaleta');

// Por caja se genera color y texto, se generar al cargar la pagina.
function generarPaleta() {
    const cajas = document.querySelectorAll(".cajaColor");

    cajas.forEach(function(caja) {
        // Revisara si el color esta bloqueado
        if (caja.dataset.locked === 'true') return;

        const nuevoColor = generarColorAleatorio();

        // Cambia el color al nuevo y pone su Hexa en el texto.
        caja.style.setProperty('--colorCaja', nuevoColor);
        const cajaTexto = caja.querySelector('.textoHexa');
        cajaTexto.textContent = nuevoColor;
    });
    actualizarFormato()
};

// Actualiza el formato en tiempo real
function actualizarFormato() {
    const cajas = document.querySelectorAll(".cajaColor");

    cajas.forEach(function(caja) {

        const cajaHexa = caja.querySelector('.textoHexa');
        const cajaFormato = caja.querySelector('.textoFormato');
        const rgb = hexToRgb(cajaHexa.textContent);

        if (selectorFormato.value === 'hsl') {
            cajaFormato.textContent = rgbToHsl(rgb.r, rgb.g, rgb.b);
        } else {
            cajaFormato.textContent = rgbaTexto(rgb.r, rgb.g, rgb.b);
        }
    });    
};

selectorFormato.addEventListener('change', function() {
    actualizarFormato();
});

// Boton con funcion de generar color dependiendo el tamaño
const selectorPaleta = document.getElementById('tamañoPaleta');
const paleta = document.getElementById('contenedorPaleta');
let tamañoElegido = 6; // Memoria del tamaño elegido al iniciar la página

// Selector de tamaño bajado a número
selectorPaleta.addEventListener('change', function(caja) {
    tamañoElegido = Number(selectorPaleta.value);
});

botonGenerar.addEventListener('click', function() {
    const cantidadActual = paleta.querySelectorAll('.cajaColor').length;

    // Si el tamaño de la paleta es diferente de la actual se cambia antes de generarse
    if (tamañoElegido != cantidadActual) {

        // Revisa si hay un color bloqueado antes de poder crear una nueva
        const cajasArray = Array.from(document.querySelectorAll(".cajaColor"));
        const hayBloqueado = cajasArray.some(function(caja) {
            return caja.dataset.locked === 'true';
        });

        if (hayBloqueado) {
            mostrarToast('Desbloquea los colores para crear una nueva paleta');
            return;
        };
        
        construirPaleta(tamañoElegido);
        return;
    };

    // Revisa que al menos un color este desbloqueado para crear la paleta
    const cajasArray = Array.from(document.querySelectorAll(".cajaColor"));
    const hayDesbloqueado = cajasArray.every(function(caja) {
        return caja.dataset.locked === 'true';
    });
    if (hayDesbloqueado) {
        mostrarToast('Todos los colores están bloqueados; no se puede generar una nueva paleta');
        return;
    }

    generarPaleta()    
})

// Por la cantidad de contenedores se genera la paleta.
function construirPaleta(cantidad) {
    const crearCaja = document.querySelector('.cajaColor').outerHTML;

    // Elimina los contenedores de color y crea nuevos, así no se suman.
    paleta.innerHTML = '';
    for (var i=0; i < cantidad; i++) {
        paleta.insertAdjacentHTML('beforeend', crearCaja);
    }

    generarPaleta()
};




// BLOQUEAR COLORES

// Selecciona cada botón, no todos desde el contenedor principal de la plantilla
paleta.addEventListener('click', function(event) {

    const unBoton = event.target.closest('.botonCandado');
    if (!unBoton) return; // El click debe ser en el candado

    // El boton va hacia el contenedor padre que contiene el data-locked, y camabia la imagen del boton al dar click
    const suCaja = unBoton.closest('.cajaColor');
    const estaActivo = suCaja.dataset.locked === 'true';

     if (estaActivo) {
        suCaja.dataset.locked = 'false';
        unBoton.querySelector('img').src = 'Material/unlock.png';
    } else {
        suCaja.dataset.locked = 'true';
        unBoton.querySelector('img').src = 'Material/lock.png';
    };
});



// COPIAR
paleta.addEventListener('click', function(event) {
    const unBoton = event.target.closest('.botonCopiar');
    if (!unBoton) return;

    const suCaja = unBoton.closest('.cajaColor');
    const textoHexa = suCaja.querySelector('.textoHexa').textContent;

    navigator.clipboard.writeText(textoHexa)
        .then(function() {
            mostrarToast('Color copiado ' + textoHexa);
        });
});

document.getElementById('paletasGuardadas').addEventListener('click', function(event) {
    const unBoton = event.target.closest('.botonCopiarGuardado');
    if (!unBoton) return;

    const suCaja = unBoton.closest('.colorCajaGuardado');
    const textoHexa = suCaja.querySelector('.textoHexaGuardado').textContent;

    navigator.clipboard.writeText(textoHexa)
        .then(function() {
            mostrarToast('Color copiado ' + textoHexa);
        });
});


// DESBLOQUEAR COLORES
const botonDesbloquear = document.getElementById('borrarBloqueos');

botonDesbloquear.addEventListener('click', function() {
    const cajas = document.querySelectorAll(".cajaColor");
    const cajasArray = Array.from(cajas);

    const hayBloqueado = cajasArray.some(function(caja) {
        return caja.dataset.locked === 'true';
    });
    if (!hayBloqueado) {
        mostrarToast('No hay colores bloqueados');
        return;
    };

    cajas.forEach(function (caja) {
        const unBoton = caja.querySelector(".botonCandado");
        if (caja.dataset.locked === 'true') {
            caja.dataset.locked = 'false';
            unBoton.querySelector('img').src = 'Material/unlock.png';
        };
    });
});



// GUARDAR PALETA

const botonGuardar = document.getElementById('botonGuardar');

botonGuardar.addEventListener('click', function() {
    // Objener los Hexa como Array
    const cajaArray = Array.from(document.querySelectorAll('.cajaColor'));
    const coloresActuales = cajaArray.map(function(caja) {
        return caja.querySelector('.textoHexa').textContent;
    });

    console.log(coloresActuales);
    
    // Generar ID de cada paleta
    const paletaNueva = { id: Date.now(), colores: coloresActuales };

    // Lee lo que se guardo en una clave fija de texto y crea el array
    const guardado = localStorage.getItem('paletasGuardadas');
    const lista = guardado ? JSON.parse(guardado) : [];

    // Agrega el nuevo elemento a la lista
    lista.push(paletaNueva);

    // Guarda TODO junto con el nuevo elemento
    localStorage.setItem('paletasGuardadas', JSON.stringify(lista));

    mostrarPaletaGuardada(paletaNueva);
    
});

function mostrarPaletaGuardada(paletaGuardada) {
    const plantilla = document.getElementById('plantillaGuardada');
    const copia = plantilla.content.cloneNode(true);

    // Agregar el ID al contenedor de la copia
    const contenedor = copia.querySelector('.contenedorGuardado');
    contenedor.dataset.id = paletaGuardada.id;

    // Busco el color y su contenedor padre
    const contenedorColores = copia.querySelector('.contenedorColoresGuardado');
    const colorEjemplo = copia.querySelector('.colorCajaGuardado');

    // Por cada color guardado en el array le pongo su color
    paletaGuardada.colores.forEach(function(hex) {
        const colorClonado = colorEjemplo.cloneNode(true);

        colorClonado.style.setProperty('--colorCaja', hex);
        colorClonado.querySelector('.textoHexaGuardado').textContent = hex;
        contenedorColores.appendChild(colorClonado);
    });

    // Quitar el color de referencia
    colorEjemplo.remove();

    // Agregar la paleta a la página
    document.getElementById('paletasGuardadas').prepend(copia);
}

// Cargar paletas guardadas al cargar la página
function cargarPaletasGuardadas() {
    const guardado = localStorage.getItem('paletasGuardadas');
    const lista = guardado ? JSON.parse(guardado) : [];
    lista.forEach(mostrarPaletaGuardada)
}

// Borrar las paletas guardadas
document.getElementById('paletasGuardadas').addEventListener('click', function (event) {
    const unBoton = event.target.closest('.eliminarGuardado');
    if (!unBoton) return;

    const suTarjeta = unBoton.closest('.contenedorGuardado');
    const idABorrar = Number(suTarjeta.dataset.id);
    
    const guardado = localStorage.getItem('paletasGuardadas');
    const lista = guardado ? JSON.parse(guardado) : [];
    const listaFiltrada = lista.filter(function(paleta) {
        return paleta.id !== idABorrar;
    });

    localStorage.setItem('paletasGuardadas', JSON.stringify(listaFiltrada));

    suTarjeta.remove();
});


//TOASTS

function mostrarToast(mensaje) {
    const contenedor = document.getElementById('contenedorToasts');

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = mensaje;
    contenedor.appendChild(toast);

    setTimeout(function() {
        toast.classList.add('mostrar');
    }, 10);

    setTimeout(function() {
        toast.classList.remove('mostar');
        setTimeout(function() {
            toast.remove();
        }, 400);
    }, 2500);
}

// Al cargar la pagina, la paleta se genera y crea los colores.
construirPaleta(6)
generarPaleta();
cargarPaletasGuardadas();