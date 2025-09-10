const vehiculos = {
  vehiculo001: {
    id: "vehiculo001",
    nombre: "Pegassi Zentorno",
    precio: "$1.500.000",
    imagen: "https://i.blogs.es/fc6022/pegassi-zentorno/1366_2000.png",
    cantidad: 1
  },

  // Solo uno para test
};



document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', function () {
    const id = this.getAttribute('data-id');
    const vehiculo = vehiculos[id];

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const index = carrito.findIndex(item => item.id === vehiculo.id);
    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push(vehiculo);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${vehiculo.nombre} agregado al carrito 🚗`);
  });
});

