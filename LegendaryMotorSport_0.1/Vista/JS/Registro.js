function esFechaNacimientoValida(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  const hace120Años = new Date();
  hace120Años.setFullYear(hoy.getFullYear() - 120);

  return nacimiento >= hace120Años && nacimiento <= hoy;
}

function esMayorDe21(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  const fechaLimite = new Date();
  fechaLimite.setFullYear(hoy.getFullYear() - 21);

  return nacimiento <= fechaLimite;
}

document.getElementById("formRegistro").addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevoUsuario = {
    usuario: document.getElementById("usuario").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    contraseña: document.getElementById("contraseña").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    nombre: document.getElementById("nombre").value.trim(),
    apellidoP: document.getElementById("apellidoP").value.trim(),
    apellidoM: document.getElementById("apellidoM").value.trim(),
    direccion: document.getElementById("direccion").value.trim()
  };

  if (!esFechaNacimientoValida(nuevoUsuario.fechaNacimiento)) {
    alert("La fecha de nacimiento debe estar entre hoy y hace 120 años.");
    return;
  }

  if (!esMayorDe21(nuevoUsuario.fechaNacimiento)){
    alert("Debes ser mayor de 21 años para registrarte");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];
  const existe = usuarios.some(u => u.usuario === nuevoUsuario.usuario || u.correo === nuevoUsuario.correo);

  if (existe) {
    alert("El usuario o correo ya están registrados.");
    return;
  }

  usuarios.push(nuevoUsuario);
  localStorage.setItem("Usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso.");
  document.getElementById("formRegistro").reset();
});