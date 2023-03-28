$(document).ready(function() {

const form = document.getElementById("register");
const fileButtonAvatar = document.getElementById("fileButtonAvatar");
const avatar = document.getElementById("avatar");
const avatarImage = document.getElementById("avatar-image");
const name = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const primerapellidos = document.getElementById("primerapellidos");
const segundoapellidos = document.getElementById("segundoapellidos");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const nacimiento = document.getElementById("nacimiento");
const unidad = document.getElementById("unidad");
const submit = document.getElementById("save");
const avatarError = document.getElementById("avatar-error");
const nameError = document.getElementById("name-error");
const cedulaError = document.getElementById("cedula-error");
const primerapellidosError = document.getElementById("primerapellidos-error");
const segundoapellidosError = document.getElementById("segundoapellidos-error");
const telefonoError = document.getElementById("telefono-error");
const emailError = document.getElementById("email-error");
const nacimientoError = document.getElementById("nacimiento-error");
const unidadError = document.getElementById("unidad-error");

// campo avatar solo acepta imagenes jpg, png y jpeg
avatar.accept = "image/*";

// click fileButtonAvatar para abrir file explorer
fileButtonAvatar.addEventListener("click", function (e) {
    e.preventDefault();
    avatar.click();
});

// mostrar imagen de avatar cuando se seleccione un archivo
avatar.addEventListener("change", function (e) {
  avatarImage.src = URL.createObjectURL(e.target.files[0]);
});

// evitar que nacimiento sea mayor a la fecha actual
nacimiento.max = new Date().toISOString().split("T")[0];

// limpiar campos cuando se haga click en cancelar
cancel.addEventListener("click", function (e) {
  e.preventDefault();
  name.value = "";
  cedula.value = "";
  primerapellidos.value = "";
  segundoapellidos.value = "";
  telefono.value = "";
  email.value = "";
  nacimiento.value = "";
  unidad.value = "";
});

// validar formulario de registro cuando se haga submit
submit.addEventListener("click", function (e) {
  e.preventDefault();

  // revisar que avatar tenga un archivo
  if (avatar.value === "") {
    avatarError.innerHTML = "La imagen es requerida";
    avatarError.style.display = "block";
  } else {
    avatarError.style.display = "none";
  }

  if (name.value === "" || name.value === null) {
    nameError.innerHTML = "El nombre es requerido";
    nameError.style.display = "block";
  } else {
    nameError.style.display = "none";
  }

  if (cedula.value === "" || cedula.value === null) {
    cedulaError.innerHTML = "La cedula es requerida";
    cedulaError.style.display = "block";
  } else {
    cedulaError.style.display = "none";
  }

  if (primerapellidos.value === "" || primerapellidos.value === null) {
    primerapellidosError.innerHTML = "El primer apellido es requerido";
    primerapellidosError.style.display = "block";
  } else {
    primerapellidosError.style.display = "none";
  }

  if (segundoapellidos.value === "" || segundoapellidos.value === null) {
    segundoapellidosError.innerHTML = "El segundo apellido es requerido";
    segundoapellidosError.style.display = "block";
  } else {
    segundoapellidosError.style.display = "none";
  }

  if (telefono.value === "" || telefono.value === null) {
    telefonoError.innerHTML = "El telefono es requerido";
  } else if (telefono.value.trim() !== "" && isNaN(telefono.value)) {
    telefonoError.innerHTML = "El telefono debe ser un numero";
    telefonoError.style.display = "block";
  } else {
    telefonoError.style.display = "none";
  }

  // validar email con regex
  if (email.value === "" || email.value === null) {
    emailError.innerHTML = "El correo electronico es requerido";
    emailError.style.display = "block";
  } else if (
    email.value.trim() !== "" &&
    !email.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    emailError.innerHTML = "El correo electronico no es valido";
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }

  // validar nacimiento
  if (nacimiento.value === "" || nacimiento.value === null) {
    nacimientoError.innerHTML = "La fecha de nacimiento es requerida";
    nacimientoError.style.display = "block";
  } else {
    nacimientoError.style.display = "none";
  }

  // validar unidad select es distinto de 0
  if (unidad.value === "0") {
    unidadError.innerHTML = "La unidad es requerida";
    unidadError.style.display = "block";
  } else {
    unidadError.style.display = "none";
  }

  // si no hay errores enviar a pagina usuarios
  if (
    nameError.style.display === "none" &&
    cedulaError.style.display === "none" &&
    primerapellidosError.style.display === "none" &&
    segundoapellidosError.style.display === "none" &&
    telefonoError.style.display === "none" &&
    emailError.style.display === "none" &&
    nacimientoError.style.display === "none" &&
    unidadError.style.display === "none"
  ) {
    window.location.href = "usuarios.html";
  }
});

});