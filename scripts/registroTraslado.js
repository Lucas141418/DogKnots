//image 1
// fileButton1.addEventListener("click", function (e) {
//   e.preventDefault();
//   transferImageInput1.click();
// });

// transferImageInput1.addEventListener("change", function (e) {
//   transferImageDisplay1.src = URL.createObjectURL(e.target.files[0]);
// });

//image 2
// fileButton2.addEventListener("click", function (e) {
//   e.preventDefault();
//   transferImageInput2.click();
// });

// transferImageInput2.addEventListener("change", function (e) {
//   transferImageDisplay2.src = URL.createObjectURL(e.target.files[0]);
// });

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

//let observer = new MutationObserver(function () {});

//funcion para validar

function validation() {
  const errors = [];

  const inputs = document.querySelectorAll("input, select, textarea, label");

  if (inputs.length > 0) {
    inputs.forEach((element) => {
      element.classList.remove("error");
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

  //validacion imagen:

  const imageVal1 = document.querySelector("#transferImageDisplay1");

  if (
    document.querySelector("#transferImageDisplay1").src ===
    "assets/image-placeholder.png"
  ) {
    errors.push("Es requerido agregar la primera imagen. ");
    document
      .querySelector("#transferImageDisplay1")
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
    try {
      let requestBody = buildJason();
      console.log(requestBody);
      //sendData(requestBody);
      alert(requestBody);
      Swal.fire({
        title: "Registro de traslado exitoso",
        text: "El traslado se ha registrado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
      form.reset();
    } catch (error) {}
  }
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
    await fetch("http://localhost:8080/createTransfer", {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyJson,
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

  //para obtener el valor del radio button
  //version previa para obtener el valor
  // const reason = document.querySelector(
  //   "#radioButtonContainer input[type=radio]:checked"
  // ).value;
  //segunda version

  // const reason = document.querySelector(
  //   "#radioButtonContainer input[type=radio]:checked"
  // ).value;

  //llamando funciones

  let widget_cloudinary = cloudinary.createUploadWidget(
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
      widget_cloudinary.open();
    },
    false
  );

  //event of the submit button

  submit.addEventListener("click", function (e) {
    e.preventDefault();

    console.log("hola");
    //obtener valor del radio button

    validation();
  });
};
