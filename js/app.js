// js/app.js

// --- VARIABLE GLOBAL PARA ALMACENAR LOS PRODUCTOS ---
// CAMBIO: Almacenamos los productos aquí para no tener que pedirlos con fetch en cada página.
let allProducts = [];

// --- INICIALIZADOR PRINCIPAL ---
document.addEventListener('DOMContentLoaded', async () => {
    // --- INICIALIZAR CONTADOR DEL CARRITO ---
    updateCartCounter();

    // --- FUNCIONALIDAD DEL MENÚ MÓVIL (HAMBURGUESA) ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => mainNav.classList.toggle('is-active'));
    }
    
    // --- LÓGICA DE "AÑADIR AL CARRITO" (DELEGACIÓN DE EVENTOS) ---
    document.body.addEventListener('click', handleAddToCart);

    // --- INICIAMOS LA LÓGICA DE LA APLICACIÓN ---
    // CAMBIO: Centralizamos la carga de datos y la lógica de cada página.
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('No se pudo cargar la base de datos de productos.');
        allProducts = await response.json();
        
        // Llamamos a nuestra función "router"
        initPage();

    } catch (error) {
        console.error("Error crítico al cargar productos:", error);
        // Mostrar un error genérico si falla la carga inicial
        const mainContent = document.querySelector('main');
        if (mainContent) mainContent.innerHTML = '<p class="error">No se pudo cargar el contenido del sitio. Por favor, intente más tarde.</p>';
    }
});

// --- "ROUTER" LÓGICO PARA INICIALIZAR LA PÁGINA CORRECTA ---
// CAMBIO: Esta función determina en qué página estamos y ejecuta solo el código necesario.
function initPage() {
    const featuredGrid = document.getElementById('featured-products-grid');
    const catalogGrid = document.getElementById('products-catalog-grid');
    const productDetailContainer = document.getElementById('product-detail');
    const contactForm = document.getElementById('contact-form');

    if (featuredGrid) {
        // --- Lógica para la página de inicio ---
        const featuredProducts = allProducts.slice(0, 4);
        renderProducts(featuredProducts, featuredGrid);
    } else if (catalogGrid) {
        // --- Lógica para la página de catálogo (CON BUSCADOR) ---
        renderProducts(allProducts, catalogGrid); // Mostramos todos al inicio
        const searchInput = document.getElementById('search-input');
        
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const filteredProducts = allProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            renderProducts(filteredProducts, catalogGrid);
        });
    } else if (productDetailContainer) {
        // --- Lógica para la página de detalle de producto ---
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        if (productId) {
            const product = allProducts.find(p => p.id === productId);
            if (product) {
                renderSingleProduct(product, productDetailContainer);
            } else {
                productDetailContainer.innerHTML = '<p>El producto solicitado no existe.</p>';
            }
        } else {
            productDetailContainer.innerHTML = '<p>Producto no encontrado.</p>';
        }
    } else if (contactForm) {
        // --- Lógica para el formulario de contacto ---
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// --- FUNCIÓN PARA CREAR EL HTML DE LAS TARJETAS DE PRODUCTO ---
function renderProducts(products, container) {
    if (!container) return;
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p>No se encontraron productos que coincidan con la búsqueda.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('a');
        productCard.href = `producto.html?id=${product.id}`;
        productCard.className = 'product-card';
        
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-card-info';
        
        const h3 = document.createElement('h3');
        h3.textContent = product.name;
        
        const p = document.createElement('p');
        p.textContent = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(product.price);
        
        infoDiv.appendChild(h3);
        infoDiv.appendChild(p);
        productCard.appendChild(img);
        productCard.appendChild(infoDiv);
        container.appendChild(productCard);
    });
}

// --- FUNCIÓN PARA RENDERIZAR LA PÁGINA DE UN SOLO PRODUCTO ---
function renderSingleProduct(product, container) {
    document.title = `Hermanos Jota - ${product.name}`;
    container.innerHTML = ''; // Limpiar "Cargando..."

    const layout = document.createElement('div');
    layout.className = 'product-detail-layout';

    const imageGallery = document.createElement('div');
    imageGallery.className = 'product-image-gallery';
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    imageGallery.appendChild(img);

    const info = document.createElement('div');
    info.className = 'product-info';
    
    const h1 = document.createElement('h1');
    h1.textContent = product.name;
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price);
    
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = product.description;
    
    const specsDiv = document.createElement('div');
    specsDiv.className = 'product-specs';
    const h3 = document.createElement('h3');
    h3.textContent = 'Especificaciones';
    const ul = document.createElement('ul');
    
    for (const key in product.specs) {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.textContent = `${key}:`;
        const span = document.createElement('span');
        span.textContent = product.specs[key];
        li.appendChild(strong);
        li.appendChild(span);
        ul.appendChild(li);
    }
    
    specsDiv.appendChild(h3);
    specsDiv.appendChild(ul);

    const button = document.createElement('button');
    button.className = 'add-to-cart-btn';
    button.dataset.productId = product.id;
    button.textContent = 'Añadir al Carrito';

    info.appendChild(h1);
    info.appendChild(price);
    info.appendChild(description);
    info.appendChild(specsDiv);
    info.appendChild(button);
    layout.appendChild(imageGallery);
    layout.appendChild(info);
    container.appendChild(layout);
}

// --- MANEJADORES DE EVENTOS ---
function handleAddToCart(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const button = event.target;
        const productId = parseInt(button.dataset.productId);
        const cart = getCart();
        cart.push(productId);
        saveCart(cart);
        updateCartCounter();
        
        button.textContent = '¡Añadido!';
        button.disabled = true;
        setTimeout(() => {
            button.textContent = 'Añadir al Carrito';
            button.disabled = false;
        }, 2000);
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        displayFormMessage('Por favor, completa todos los campos.', 'error');
        return;
    }
    if (!isValidEmail(email)) {
        displayFormMessage('Por favor, ingresa un email válido.', 'error');
        return;
    }

    displayFormMessage('¡Mensaje enviado con éxito! Gracias por contactarnos.', 'success');
    event.target.reset();
}

// --- FUNCIONES DE AYUDA (HELPERS) ---
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = getCart().length;
    }
}

function displayFormMessage(message, type) {
    const formMessageContainer = document.getElementById('form-message');
    formMessageContainer.textContent = message;
    formMessageContainer.className = `form-message ${type}`;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}