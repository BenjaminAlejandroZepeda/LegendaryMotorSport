document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuarioIngresado = document.getElementById("loginUsuario").value.trim();
  const contraseñaIngresada = document.getElementById("loginContraseña").value;

  const usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];

  const usuarioValido = usuarios.find(u => u.usuario === usuarioIngresado && u.contraseña === contraseñaIngresada);

  if (usuarioValido) {
    alert("Inicio de sesión exitoso.");

    // Ocultar botón de login y mostrar botón de perfil
    document.getElementById("btnLogin").classList.add("d-none");
    document.getElementById("btnPerfil").classList.remove("d-none");
    document.getElementById("btnRegistro").classList.add("d-none");

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
    modal.hide();

  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});
