$(document).ready(function () {
  const form = document.getElementById("register");
  const fileButtonAvatar = document.getElementById("fileButtonAvatar");
  const avatar = document.getElementById("avatar");
  const avatarImage = document.getElementById("avatar-image");
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const primerApellido = document.getElementById("primerApellido");
  const segundoApellido = document.getElementById("segundoApellido");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const fechaNacimiento = document.getElementById("fechaNacimiento");
  const unidad = document.getElementById("unidad");
  const role = document.getElementById("role");
  const status = document.getElementById("status");
  const submit = document.getElementById("save");
  const avatarError = document.getElementById("avatar-error");
  const nameError = document.getElementById("name-error");
  const cedulaError = document.getElementById("cedula-error");
  const primerapellidosError = document.getElementById("primerapellidos-error");
  const segundoapellidosError = document.getElementById(
    "segundoapellidos-error"
  );
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
  fechaNacimiento.max = new Date().toISOString().split("T")[0];

  // limpiar campos cuando se haga click en cancelar
  cancel.addEventListener("click", function (e) {
    e.preventDefault();
    nombre.value = "";
    cedula.value = "";
    primerApellido.value = "";
    segundoApellido.value = "";
    telefono.value = "";
    correo.value = "";
    fechaNacimiento.value = "";
    unidad.value = "";
    role.value = "";
    status.value = "";
    password.value = "";
  });

  // validar formulario de registro cuando se haga submit
  submit.addEventListener("click", function (e) {
    e.preventDefault();

    const errors = [];

    // revisar que avatar tenga un archivo
    if (avatar.value === "") {
      avatarError.style.display = "block";
    } else {
      avatarError.style.display = "none";
    }

    if (nombre.value === "" || nombre.value === null) {
      errors.push("El nombre es requerido. ");
    }

    if (cedula.value === "" || cedula.value === null) {
      errors.push("La cédula es requerida. ");
    }

    if (primerApellido.value === "" || primerApellido.value === null) {
      errors.push("El primer apellido es requerido. ");
    }

    if (segundoApellido.value === "" || segundoApellido.value === null) {
      errors.push("El segundo apellido es requerido. ");
    }

    if (role.value === "" || role.value === null) {
      errors.push("El role es requerido. ");
    }

    if (telefono.value === "" || telefono.value === null) {
      errors.push("El teléfono es requerido. ");
    } else if (telefono.value.trim() !== "" && isNaN(telefono.value)) {
      errors.push("El teléfono debe ser un número. ");
    }

    // validar email con regex
    if (correo.value === "" || correo.value === null) {
      errors.push("El correo electrónico es requerido. ");
    } else if (
      correo.value.trim() !== "" &&
      !correo.value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors.push("El correo electrónico no es válido. ");
    }

    // validar nacimiento
    if (fechaNacimiento.value === "" || fechaNacimiento.value === null) {
      errors.push("La fecha de nacimiento es requerida. ");
    }

    // validar unidad select es distinto de 0
    if (unidad.value === "") {
      errors.push("La unidad es requerida. ");
    }

    if (avatar.files.length === 0) {
      errors.push("La imagen de perfil es requerida. ");
    }

    if (errors.length > 0) {
      console.log(errors);
      swal("Hay errores en el formulario", errors.join(""), "error", {
        button: "OK",
      });
    } else {
  //    swal({
  //      title: "Registro exitoso",
  //      text: "El usuario se ha registrado correctamente",
  //      icon: "success",
  //      button: "OK",
  //    }).then((value) => {
  //      window.location.href = "usuarios.html";
  //    });
      registerUser();
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
      // use registerUser
      // registerUser();
    }
  });

  async function registerUser() {
    console.log("Registrando usuario");

    try {
      const response = await fetch("http://localhost:3000/users/", {

        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          cedula: cedula.value,
          nombre: nombre.value,
          primerApellido: primerApellido.value,
          segundoApellido: segundoApellido.value,
          correo: correo.value,
          telefono: telefono.value,
          fechaNacimiento: fechaNacimiento.value,
          unidad: unidad.value,
          status: status.value,
          role: role.value,
          password: password.value,
        }),
      }); 

      const data = await response.json();
      console.log(data);

      console.log("Usuario registrado");

      swal({
        title: "Registro exitoso",
        text: "El usuario se ha registrado correctamente",
        icon: "success",
        button: "OK",
      })

    } catch (error) {
      console.error(error);  

      swal("Hay errores en el formulario", error, "error", {
        button: "OK",
      });
    }
  }
});
