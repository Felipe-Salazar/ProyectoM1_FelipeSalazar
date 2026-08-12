# 🎨 Colorfly Studio — Generador de Paletas de Colores

Aplicación web para generar paletas de colores aleatorias, bloquear los colores favoritos, elegir entre distintos formatos de color (HSL / RGBA), guardar paletas para más tarde y copiarlas fácilmente al portapapeles.

### Diseño Figma:

https://www.figma.com/design/hwddsaRDJPLCOvgcjONK7d/Clorfly-Studio--Paleta-de-colores-aleatoria?node-id=0-1&t=wAMjwqdBb8vmDlYw-1

### Github Pages

https://felipe-salazar.github.io/ProyectoM1_FelipeSalazar/

---

## 📖 Manual de usuario

### Generar una paleta

1. Elige el **tamaño de paleta** (6, 8 o 9 colores) en el desplegable "Tamaño".
2. Haz clic en **Generar paleta**.
   - Si cambiaste el tamaño, la paleta se reconstruye con la nueva cantidad de colores.
   - Si no cambiaste el tamaño, simplemente se generan colores nuevos.

### Elegir el formato de color

- Usa el desplegable **Formato** para alternar entre **HSL** y **RGBA**.
- El texto secundario debajo del código HEX de cada color se actualiza al instante, sin necesidad de generar una nueva paleta.

### Bloquear colores

- Pasa el mouse sobre un color y haz clic en el ícono de **candado** para bloquearlo.
- Los colores bloqueados no cambian al generar una nueva paleta.
- El botón **Borrar bloqueos** desbloquea todos los colores de una vez.

> ⚠️ No se puede cambiar el tamaño de la paleta ni generar una nueva si hay colores bloqueados. Debes desbloquearlos primero.

### Copiar un color

- Pasa el mouse sobre un color y haz clic en **Copiar**.
- El código HEX se copia al portapapeles y aparece una notificación confirmando la copia.

### Guardar y eliminar paletas

- Haz clic en **Guardar Paleta** para guardar una copia de la paleta actual (colores bloqueados o no).
- Las paletas guardadas aparecen debajo, cada una con su propio botón de copiar por color.
- Haz clic en la **X** de una paleta guardada para eliminarla.
- Las paletas guardadas persisten aunque cierres o recargues la página (se guardan en el navegador).

---

## 🛠️ Decisiones técnicas

- **HTML/CSS/JS puro**, sin frameworks ni dependencias externas — proyecto pensado para practicar fundamentos.
- **Variables CSS (`--colorCaja`)**: cada caja de color recibe su color mediante una custom property aplicada desde JS con `setProperty`, en vez de estilos en línea directos. Esto permite que tanto el estado normal como el efecto `:hover` (degradado) lean el mismo valor sin duplicar lógica.
- **Reconstrucción del DOM en vez de cálculo incremental**: al cambiar el tamaño de la paleta, el contenedor se vacía (`innerHTML = ''`) y se reconstruye completo con la cantidad exacta de cajas, en lugar de calcular cuántas cajas agregar o quitar.
- **Delegación de eventos**: los botones de candado, copiar y eliminar (tanto en la paleta principal como en las guardadas) usan un único listener en su contenedor padre (`event.target.closest(...)`), en lugar de un listener por botón. Esto es necesario porque las cajas se destruyen y recrean dinámicamente al cambiar el tamaño o guardar/eliminar paletas.
- **`<template>` para las paletas guardadas**: la estructura HTML de una paleta guardada vive dentro de una etiqueta `<template>`, que el navegador nunca renderiza. Se clona con `cloneNode(true)` cada vez que se guarda una paleta o se recargan las existentes.
- **`localStorage` para persistencia**: las paletas guardadas se almacenan como un array de objetos (`{ id, colores }`) serializado con `JSON.stringify`. El `id` de cada paleta es un timestamp (`Date.now()`), usado para identificarla al eliminarla.
- **Notificaciones tipo "toast"**: en lugar de `alert()`, los mensajes de validación (colores bloqueados, copiado exitoso, etc.) se muestran con un componente propio que aparece y desaparece automáticamente, sin interrumpir al usuario.

---

## 💻 Ejecutar la aplicación en local

No requiere instalación de dependencias ni build.

1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   cd TU-REPOSITORIO
   ```
2. Abre el archivo `index.html` directamente en tu navegador (doble clic, o clic derecho → "Abrir con" tu navegador).

   **Recomendado:** en lugar de abrir el archivo directamente, usa un servidor local para evitar posibles restricciones del navegador con rutas relativas:
   - Con la extensión **Live Server** de VS Code: clic derecho sobre `index.html` → "Open with Live Server".
   - O con Python instalado, desde la carpeta del proyecto:
     ```bash
     python -m http.server 5500
     ```
     y abre `http://localhost:5500` en tu navegador.

---

## 🚀 Desplegar en GitHub Pages

1. Sube tu proyecto a un repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Primera versión de Colorfly Studio"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```
2. En GitHub, entra a tu repositorio y ve a **Settings** (Configuración).
3. En el menú lateral, selecciona **Pages**.
4. En **Source** (Origen), elige la rama `main` y la carpeta `/ (root)`.
5. Haz clic en **Save**.
6. Espera uno o dos minutos — GitHub te mostrará la URL pública en la parte superior de esa misma sección, con un formato similar a:
   ```
   https://TU-USUARIO.github.io/TU-REPOSITORIO/
   ```
7. Cada vez que hagas `git push` de nuevos cambios a la rama `main`, GitHub Pages actualizará el sitio automáticamente en unos minutos.

> 💡 Verifica que en tu `index.html` las rutas a `Material/`, `style.css` y `index.js` sean **relativas** (como ya las tienes), no absolutas — así funcionan igual en local y en GitHub Pages.

---

## 📁 Estructura del proyecto

```
├── index.html
├── style.css
├── reset.css
├── index.js
├── Material/          # íconos e imágenes
└── README.md
```
