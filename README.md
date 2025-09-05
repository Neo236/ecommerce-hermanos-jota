# Casa Jota Digital - E-commerce para Mueblería Hermanos Jota

<div align="center">
  <img src="images/logo.svg" alt="Logo de Hermanos Jota" width="80">
  <br>
  <br>
  <h1>Casa Jota Digital</h1>
  <h3>E-commerce para Mueblería Hermanos Jota</h3>
</div>

---

## 📜 Resumen del Proyecto

Este es el proyecto final desarrollado para el curso de Desarrollo Web Front-End de la **Escuela de Innovación del ITBA**. El objetivo fue construir la fachada digital completa (front-end) y la experiencia de usuario para **"Mueblería Hermanos Jota"**, un taller familiar con 30 años de tradición que buscaba modernizar su presencia y expandirse al mundo digital.

El sitio web simula una experiencia de e-commerce completa, permitiendo a los usuarios explorar un catálogo de muebles de diseño, ver detalles de productos, filtrar por nombre y simular la acción de añadir productos a un carrito de compras. Todo el proyecto se construyó utilizando únicamente tecnologías del lado del cliente: **HTML, CSS y JavaScript (Vanilla)**.

---

## ✨ Funcionalidades Clave Implementadas

*   **Diseño 100% Responsivo:** La interfaz se adapta fluidamente a cualquier tamaño de pantalla, desde móviles pequeños hasta monitores de escritorio, siguiendo un enfoque **Mobile-First**.
*   **Carga de Datos Asíncrona:** Toda la información de los productos se gestiona desde un archivo `products.json` y se carga de forma asíncrona utilizando la **API Fetch** con `async/await`, simulando el comportamiento de una aplicación real que consume una API.
*   **Páginas del Sitio:**
    *   **Página de Inicio:** Presenta un banner principal y una sección con los 4 productos más destacados, cargados dinámicamente.
    *   **Página de Catálogo:** Muestra la grilla completa de productos y cuenta con un **filtro de búsqueda funcional en tiempo real**.
    *   **Página de Detalle:** Renderiza la información completa de un producto específico, obteniendo su `id` desde los parámetros de la URL.
    *   **Página de Contacto:** Incluye un formulario con **validación de campos en el lado del cliente** que muestra mensajes de éxito o error sin recargar la página.
*   **Carrito de Compras Simulado:**
    *   Un contador en el encabezado muestra la cantidad de artículos en el carrito.
    *   El estado del carrito persiste entre sesiones y al navegar entre páginas gracias al uso de `localStorage`.
*   **Manipulación Segura del DOM:** Se priorizó el uso de `createElement` y `textContent` para crear elementos dinámicamente, evitando riesgos de seguridad asociados a `innerHTML`.

---

## 🛠️ Tecnologías Utilizadas

*   **HTML5:**
    *   Uso de etiquetas semánticas (`<main>`, `<section>`, `<nav>`, `<footer>`) para una mejor estructura y accesibilidad.
*   **CSS3:**
    *   **Flexbox** y **Grid Layout** para la maquetación de componentes y páginas.
    *   Variables CSS (Custom Properties) para mantener un sistema de diseño consistente (colores, fuentes).
    *   Media Queries para el diseño responsivo.
*   **JavaScript (ES6+):**
    *   Manipulación del DOM para crear contenido dinámico.
    *   Manejo de eventos (`addEventListener`) para toda la interactividad.
    *   **API Fetch** y promesas con `async/await` para la carga de datos.
    *   Uso de `localStorage` para la persistencia de datos del carrito.
    *   Funciones, arrays (`.map`, `.filter`) y objetos para la lógica de la aplicación.

---

## 🚀 Cómo Ejecutar el Proyecto

Debido a que el proyecto utiliza la API `fetch` para cargar un archivo local (`products.json`), no puede ejecutarse simplemente abriendo el `index.html` en el navegador (por políticas de seguridad CORS). Es necesario utilizar un servidor local.

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/ecommerce-hermanos-jota.git
    ```

2.  **Navegar a la Carpeta del Proyecto:**
    ```bash
    cd ecommerce-hermanos-jota
    ```

3.  **Iniciar un Servidor Local:**
    *   La forma más sencilla es usar la extensión **"Live Server"** en Visual Studio Code.
    *   Una vez instalada, haz clic derecho sobre el archivo `index.html` y selecciona `"Open with Live Server"`.

---

## 👥 Integrantes

*   Lautaro Sebastian Mambrin
*   [Nombre del Integrante 2]
*   [Nombre del Integrante 3]
*   [Nombre del Integrante 4]
*   [Nombre del Integrante 5]