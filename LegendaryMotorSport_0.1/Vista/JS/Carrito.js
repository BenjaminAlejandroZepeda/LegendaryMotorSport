
function renderCarrito() {
    const contenedor = document.getElementById('carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    contenedor.innerHTML = '';

    let total = 0;

    carrito.forEach((item, index) => {
        const precioNumerico = parseInt(item.precio.replace(/\D/g, '')) || 0;
        const subtotal = precioNumerico * item.cantidad;
        total += subtotal;

        const card = document.createElement('div');
        card.className = 'card';
        card.style = 'min-width: 250px; flex: 0 0 auto;';
        card.innerHTML = `
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}" style="height: 150px; object-fit: contain;">
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <h6 class="card-title">${item.nombre}</h6>
                    <p class="card-text mb-1"><small>Cantidad: ${item.cantidad}</small></p>
                    <p class="card-text"><small>Precio unitario: ${item.precio}</small></p>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <strong>$${subtotal.toLocaleString()}</strong>
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });

    document.getElementById('total2').textContent = `$${total.toLocaleString()}`;
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

document.addEventListener('DOMContentLoaded', renderCarrito);

