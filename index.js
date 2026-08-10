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
        const nuevoColor = generarColorAleatorio();

        // Cambia el color al nuevo y pone su Hexa en el texto.
        caja.style.setProperty('--colorCaja', nuevoColor);
        const cajaTexto = caja.querySelector('.textoHexa');
        cajaTexto.textContent = nuevoColor;

        // Cambiar texto secundario dependiendo del formato
        const cajaFormato = caja.querySelector('.textoFormato');
        const rgb = hexToRgb(nuevoColor);

        if (selectorFormato.value === 'hsl') {
            cajaFormato.textContent = rgbToHsl(rgb.r, rgb.g, rgb.b);
        } else {
            cajaFormato.textContent = rgbaTexto(rgb.r, rgb.g, rgb.b);
        }
    });
};

// Boton con funcion de generar color.
botonGenerar.addEventListener("click", function() {
    generarPaleta()
});



// ALTERAR TAMAÑO
const selectorPaleta = document.getElementById('tamañoPaleta');

// Por la cantidad de contenedores se geera la paleta.
function construirPaleta(cantidad) {
    const paleta = document.getElementById('contenedorPaleta');
    const crearCaja = document.querySelector('.cajaColor').outerHTML;

    // Elimina los contenedores de color y crea nuevos, así no se suman.
    paleta.innerHTML = '';
    for (var i=0; i < cantidad; i++) {
        paleta.insertAdjacentHTML('beforeend', crearCaja);
    }

    generarPaleta()
};

// Lista desplegable para crear los contenedores correspondientes.
selectorPaleta.addEventListener('change', function() {
    construirPaleta(Number(selectorPaleta.value));
})





// Al cargar la pagina, la paleta se genera y crea los colores.
construirPaleta(6)
generarPaleta();