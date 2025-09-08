document.addEventListener("DOMContentLoaded", function () {
  const formPago = document.getElementById("formPago");
  const listaPagos = document.getElementById("listaPagos");

  // Cargar tarjetas guardadas al iniciar
  const tarjetasGuardadas = JSON.parse(localStorage.getItem("Tarjetas")) || [];
  tarjetasGuardadas.forEach(tarjeta => agregarTarjetaAlDOM(tarjeta));

  // Evento de envío del formulario
  formPago.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombreTitular = document.getElementById("nombreTitular").value.trim();
    const numeroTarjeta = document.getElementById("numeroTarjeta").value.trim();
    const codigoSeguridad = document.getElementById("codigoSeguridad").value.trim();

    // Validación básica
    if (numeroTarjeta.length !== 16 || !/^\d+$/.test(numeroTarjeta)) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (codigoSeguridad.length !== 3 || !/^\d+$/.test(codigoSeguridad)) {
      alert("El código de seguridad debe tener 3 dígitos.");
      return;
    }

    const nuevaTarjeta = {
      nombreTitular,
      numeroTarjeta,
      codigoSeguridad
    };

    // Guardar en localStorage
    tarjetasGuardadas.push(nuevaTarjeta);
    localStorage.setItem("Tarjetas", JSON.stringify(tarjetasGuardadas));

    // Mostrar en DOM
    agregarTarjetaAlDOM(nuevaTarjeta);

    // Resetear formulario y cerrar modal
    formPago.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalPago"));
    modal.hide();
  });

  // Función para mostrar tarjeta en la lista
  function agregarTarjetaAlDOM(tarjeta) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center justify-content-between bg-dark text-light";

    li.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="https://i.imgur.com/1NqZpZL.png" alt="Tarjeta" width="60" height="40">
        <div>
          <strong>${tarjeta.nombreTitular}</strong><br>
          **** **** **** ${tarjeta.numeroTarjeta.slice(-4)}
        </div>
      </div>
      <button class="btn btn-sm btn-warning" onclick="verTarjeta('${tarjeta.numeroTarjeta}')">Ver</button>
    `;

    listaPagos.appendChild(li);
  }
});

// Función para ver detalles (puedes personalizarla)
function verTarjeta(numeroBuscado) {
  const tarjetas = JSON.parse(localStorage.getItem("Tarjetas")) || [];
  const tarjeta = tarjetas.find(t => t.numeroTarjeta === numeroBuscado);

  if (tarjeta) {
    document.getElementById("detalleNombre").textContent = tarjeta.nombreTitular;
    document.getElementById("detalleNumero").textContent = tarjeta.numeroTarjeta;
    document.getElementById("detalleCVV").textContent = tarjeta.codigoSeguridad;

    const modal = new bootstrap.Modal(document.getElementById("modalVerTarjeta"));
    modal.show();
  } else {
    alert("No se encontró la tarjeta.");
  }
}

