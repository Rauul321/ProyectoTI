fetch('./products.json')
    .then(response => response.json())
    .then(productos => {
        const catalogo = document.getElementById('catalogo');
        productos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.name}</h2>
        <p>${producto.description}</p>
        <p><strong>$${producto.price.toFixed(2)}</strong></p>
      `;
            catalogo.appendChild(div);
        });
    })
    .catch(error => console.error('Error cargando productos:', error));




