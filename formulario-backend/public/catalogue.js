fetch('./products.json')
    .then(response => response.json())
    .then(productos => {
        const catalogo = document.getElementById('catalogo');
        const categoryList = document.getElementById('category-list'); // El contenedor de categorías
        const priceFilter = document.getElementById('price-filter'); // El filtro de precio
        const priceLabel = document.getElementById('price-label'); // El texto que muestra el rango de precio
        const minPriceLabel = document.getElementById('min-price'); // El texto que muestra el precio mínimo
        const maxPriceLabel = document.getElementById('max-price'); // El texto que muestra el precio máximo
        const mostrarTodosBtn = document.getElementById('mostrar-todos'); // El botón para mostrar todos los productos
        const addToCartBtn = document.getElementsByClassName('addToCart-button'); // Botones "Add to cart"

        let categoriaSeleccionada = null; // Variable para la categoría seleccionada

        // Extraer categorías únicas del JSON
        const categorias = [...new Set(productos.map(producto => producto.category))]; // Eliminar duplicados

        // Mostrar las categorías en el panel lateral
        categorias.forEach(categoria => {
            const li = document.createElement('li');
            li.textContent = categoria;
            li.addEventListener('click', () => {
                categoriaSeleccionada = categoria; // Establecer la categoría seleccionada
                filtrarProductos(); // Aplicar filtros
            });
            categoryList.appendChild(li);
        });

        // Calcular el precio máximo
        const maxPrice = Math.max(...productos.map(producto => producto.price));

        // Establecer el valor máximo del filtro de precio dinámicamente
        priceFilter.max = maxPrice;  // Establecer el valor máximo en el input range
        priceFilter.value = maxPrice; // Establecer el valor actual al máximo

        // Actualizar los valores mostrados (mínimo, máximo, y actual)
        minPriceLabel.textContent = `$0`;
        maxPriceLabel.textContent = `$${maxPrice}`;
        priceLabel.textContent = `$${maxPrice}`;

        // Función para filtrar los productos por categoría y precio
        function filtrarProductos() {
            let productosFiltrados = productos;

            // Filtrar por categoría si hay una seleccionada
            if (categoriaSeleccionada) {
                productosFiltrados = productosFiltrados.filter(producto => producto.category === categoriaSeleccionada);
            }

            // Filtrar por precio
            const selectedPrice = priceFilter.value; // Obtener el valor del filtro de precio
            productosFiltrados = productosFiltrados.filter(producto => producto.price <= selectedPrice);

            mostrarProductos(productosFiltrados); // Mostrar los productos filtrados
        }

        // Función para manejar el cambio del filtro de precio
        priceFilter.addEventListener('input', () => {
            const selectedPrice = priceFilter.value; // Obtener el valor actual del filtro de precio
            priceLabel.textContent = `$${selectedPrice}`; // Actualizar el rango en el texto
            filtrarProductos(); // Aplicar los filtros de categoría y precio
        });

        // Mostrar todos los productos inicialmente
        mostrarProductos(productos);

        // Función para mostrar los productos
        function mostrarProductos(productos) {
            catalogo.innerHTML = ''; // Limpiar productos anteriores

            productos.forEach(producto => {
                const div = document.createElement('div');
                div.classList.add('producto');
                div.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.name}">
                    <h2>${producto.name}</h2>
                    <p>${producto.description}</p>
                    <button class="addToCart-button"><strong>Add to cart</strong></button>
                    <p>$${producto.price.toFixed(2)}</p>
                `;
                catalogo.appendChild(div);
            });
        }

        const addToCartButtons = document.getElementsByClassName('addToCart-button');

        for (let button of addToCartButtons) {
            button.addEventListener('click', () => {
                const productDiv = button.parentElement;
                const productName = productDiv.querySelector('h2').textContent;
                const productPrice = parseFloat(productDiv.querySelector('p:last-of-type').textContent.replace('$', ''));
                addToCart(productName, productPrice);
            });
        }

        function addToCart(productName, productPrice) {
            cart.push({ name: productName, price: productPrice });
            alert(`${productName} ha sido añadido al carrito.`);
        }


        // Función para mostrar todos los productos al hacer clic en "Mostrar todos"
        mostrarTodosBtn.addEventListener('click', () => {
            categoriaSeleccionada = null; // Limpiar la categoría seleccionada
            priceFilter.value = priceFilter.max; // Resetear el filtro de precio al valor máximo
            priceLabel.textContent = `$${priceFilter.max}`; // Resetear la etiqueta del precio
            filtrarProductos(); // Mostrar todos los productos con el filtro de precio aplicado
        });
    })
    .catch(error => console.error('Error cargando productos:', error));
