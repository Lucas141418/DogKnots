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
    errors.push("Es requerido agregar la seunda imagen. ");
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

function buildJason() {
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

//registrar traslado

window.onload = async function () {
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

    console.log("hola");
    //obtener valor del radio button

    validation();
    if (validation()) {
      try {
        let requestBody = buildJason();
        console.log(requestBody);
        await sendData(requestBody);
        form.reset();
      } catch (error) {}
    }
  });
};
