//uploading the images:

const reasonIsChecked = function () {
  let returnValue = false;
  if (document.getElementById("damage").checked) {
    returnValue = true;
  } else if (document.getElementById("disuse").checked) {
    returnValue = true;
  } else {
    returnValue = false;
  }
  return returnValue;
};

// funcion para generar mensaje de error

function errorMessage(array) {
  let stringMessage = array[0];
  for (let i = 1; i < array.length; i++) {
    stringMessage = stringMessage + "-" + array[i] + "\n";
  }

  return stringMessage;
}

//funcion para validar la imagen

//validacion imagen:

const imageVal1 = document.querySelector("#transferImageDisplay1");
const imageVal2 = document.querySelector("#transferImageDisplay2");
const config = { attributes: true };

let imagen1Uploaded = false;
let imagen2Uploaded = false;
const observer1 = new MutationObserver((changes) => {
  changes.forEach((change) => {
    if (change.attributeName.includes("src")) {
      imagen1Uploaded = true;
    }
  });
});

const observer2 = new MutationObserver((changes) => {
  changes.forEach((change) => {
    if (change.attributeName.includes("src")) {
      imagen2Uploaded = true;
    }
  });
});

//poniendolo a observar
observer1.observe(imageVal1, config);
observer2.observe(imageVal2, config);
// observer.disconnect();

//funcion para validar

function validation() {
  const errors = [];
  let validationPassed = false;
  const inputs = document.querySelectorAll(
    "input, select, textarea, label, img"
  );
  console.log(imagen1Uploaded);
  const quitandoClase = document.getElementById("transferImageDisplay1");
  quitandoClase.classList.remove("error-image");
  if (inputs.length > 0) {
    inputs.forEach((element) => {
      element.classList.remove("error");
      element.classList.remove("error-image");
    });
  }

  //Revisa que se haya ingresado un id del activo
  if (assetId.value === "" || assetId.value === null) {
    errors.push("El ID del activo es requerido. ");
    assetId.classList.add("error");
  } else if (assetId.value.trim() !== "" && isNaN(assetId.value)) {
    errors.push("El ID del activo debe ser un número. ");
    assetId.classList.add("error");
  }

  if (assetName.value === "" || assetName.value === null) {
    errors.push("La nombre del activo es requerido. ");
    assetName.classList.add("error");
  }

  if (currentUnit.value === "" || currentUnit.value === null) {
    errors.push("La unidad actual es requerida. ");
    currentUnit.classList.add("error");
  }

  if (destinationUnit.value === "" || destinationUnit.value === null) {
    errors.push("La unidad de destino es requerida. ");
    destinationUnit.classList.add("error");
  }

  if (justification.value === "" || justification.value === null) {
    errors.push("La justificación es requerida. ");
    justification.classList.add("error");
  }

  if (!reasonIsChecked()) {
    errors.push("El motivo es requerido. ");
    // document.getElementsByName("reason").classList.add("error");
    document.getElementsByClassName("radio-button")[0].classList.add("error");
    document.getElementsByClassName("radio-button")[1].classList.add("error");
  }

  //validando imagenes

  if (!imagen1Uploaded) {
    errors.push("Es requerido agregar la primera imagen. ");
    document
      .querySelector("#transferImageDisplay1")
      .classList.add("error-image");
  }
  if (!imagen2Uploaded) {
    errors.push("Es requerido agregar la segunda imagen. ");
    document
      .querySelector("#transferImageDisplay2")
      .classList.add("error-image");
  }

  if (errors.length > 0) {
    //console.log(errors);
    let message = errorMessage(errors);
    Swal.fire({
      title: "Error!",
      text: "Hay errores en el formulario:\n" + message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    validationPassed = true;
  }

  return validationPassed;
}

//version 2

function buildJason(isPending) {
  //construyendo el json
  const reason = document.querySelector(
    "#radioButtonContainer input[type=radio]:checked"
  ).value;
  let json = {
    assetName: `${assetName.value}`,
    assetId: `${assetId.value}`,
    transferReason: `${reason}`,
    currentUnit: `${currentUnit.value}`,
    destinationUnit: `${destinationUnit.value}`,
    justification: `${justification.value}`,
    image1: `${document.querySelector("#transferImageDisplay1").src}`,
    image2: `${document.querySelector("#transferImageDisplay2").src}`,
    isPending: `${isPending}`,
    requestedBy: user.cedula,
  };

  let body = JSON.stringify(json);

  return body;
}

async function sendData(bodyJson) {
  //sending the request
  try {
    await fetch("http://localhost:3000/createTransfer", {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyJson,
    });
    Swal.fire({
      title: "Registro de traslado exitoso",
      text: "El traslado se ha registrado correctamente.",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (error) {
    console.log(error);
  }
}

//Funcion para traer la info del activo en cuestion

async function getTransferAsset(id) {
  try {
    const response = await fetch(`http://localhost:3000/activos/id=${id}`); //recordar que debo borrar la ruta
    const asset = await response.json();
    console.log(asset);
    return transferDataJson[0];
  } catch (error) {
    console.log(error);
  }
}

//funcion para modificar la propiedad

function setLocationCode() {
  //Código Ubicacion
  let unit = destinationUnit.value; //quede aca
  let valuePiso = Math.floor(Math.random() * 4);
  let codigoUbicacion =
    "PRO" + unit.substr(0, 3).toUpperCase() + "PIS" + valuePiso;

  console.log(codigoUbicacion);
  return codigoUbicacion;
}

//funcion para modificar el codigo y ubicacion del asset

async function modifyAsset(assetId, unit, locationCode) {
  try {
    const lastChar = locationCode.charAt(locationCode.length - 1);
    console.log(
      "corriendo modify asset",
      assetId,
      unit,
      locationCode,
      lastChar
    );
    const response = await fetch(
      `http://localhost:3000/actualizarActivo/${assetId}`,
      {
        method: "POST",
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unidad: unit,
          codeUbicacion: locationCode,
          piso: lastChar,
        }),
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.log(error);
  }
}

//registrar traslado

window.onload = async function () {
  //console.log("logueando el elemento", navPendTransfers);
  //navPendTransfers.classList.add("hide");
  const navlinks = document.querySelectorAll(".nav li.navPendTransfer");
  //navlinks[0].classList.add("hide");

  let connected = sessionStorage.getItem("connected");
  console.log("It is connected : ", connected);

  let name = sessionStorage.getItem("name");
  console.log("The name is : ", name);

  let role = sessionStorage.getItem("role");
  console.log("the user role is : ", role);

  let unit = sessionStorage.getItem("unit");
  console.log("the user unit is : ", unit);

  let user = sessionStorage.getItem("user");
  let status = sessionStorage.getItem("approved");

  //seccion para traer dropdowns

  var queryURLUnidades = "http://localhost:3000/unidades";

  try {
    const res = await fetch(queryURLUnidades, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    displayUnidades_Dropdown(data);
  } catch (error) {
    console.error(error);
  }

  // images
  const transferImageDisplay1 = document.querySelector(
    "#transferImageDisplay1"
  );
  const transferImageDisplay2 = document.getElementById(
    "transferImageDisplay2"
  );

  // inputs
  const transferImageInput1 = document.getElementById("transferImage1");
  const transferImageInput2 = document.getElementById("transferImage2");

  //buttons
  const fileButton1 = document.getElementById("fileButton1");
  const fileButton2 = document.getElementById("fileButton2");

  //////////////////////

  //validación de formulario
  const form = document.querySelector("form");
  const assetId = document.getElementById("assetId");
  const currentUnit = document.getElementById("currentUnit");
  const assetName = document.getElementById("assetName");
  const destinationUnit = document.getElementById("destinationUnit");
  const justification = document.getElementById("justification");
  const damageRadio = document.getElementById("damage");
  const disuseRadio = document.getElementById("disuse");
  const submit = document.getElementById("saveTransferRequest");
  const transferImage1 = document.getElementById("transferImage1");
  const transferImage2 = document.getElementById("transferImage2");

  const cancelButton = document.getElementById("cancelTransferRequest");

  //para subir imagenes

  let widget_cloudinary1 = cloudinary.createUploadWidget(
    {
      cloudName: "dtpiw7z57",
      uploadPreset: "stev_preset",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Imagen subida con éxito", result.info);
        transferImageDisplay1.src = result.info.secure_url;
      }
    }
  );

  fileButton1.addEventListener(
    "click",
    () => {
      widget_cloudinary1.open();
    },
    false
  );

  let widget_cloudinary2 = cloudinary.createUploadWidget(
    {
      cloudName: "dtpiw7z57",
      uploadPreset: "stev_preset",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Imagen subida con éxito", result.info);
        transferImageDisplay2.src = result.info.secure_url;
      }
    }
  );

  fileButton2.addEventListener(
    "click",
    () => {
      widget_cloudinary2.open();
    },
    false
  );

  //event of the submit button

  submit.addEventListener("click", async function (e) {
    e.preventDefault();

    console.log(role);
    //obtener valor del radio button

    validation();
    if (validation()) {
      try {
        let isPending;
        if (role === "jefatura" || role === "proveeduria") {
          isPending = false;
          const location = setLocationCode();
          await modifyAsset(assetId.value, destinationUnit.value, location);
        } else {
          isPending = true;
        }
        //crear transfer
        let requestBody = buildJason(isPending);
        console.log(
          "logueando el body para ver el estado de isPending",
          requestBody
        );
        await sendData(requestBody);
        form.reset();
      } catch (error) {}
    }
  });
};

const displayUnidades_Dropdown = (unidades) => {
  const originDD = document.getElementById("currentUnit");
  const destinationDD = document.getElementById("destinationUnit");
  originDD.innerHTML = ""; //Aca vaciamos lo que esta DENTRO del select
  destinationDD.innerHTML = "";

  var dropdownOptions = `<option value="">Seleccione una unidad </option>
    ${unidades
      .map((unidad) => `<option value="${unidad.name}">${unidad.name}</option>`)
      .join("")}
    `; //Aqui llenamos el dropdown

  originDD.innerHTML = dropdownOptions;
  destinationDD.innerHTML = dropdownOptions;
};
