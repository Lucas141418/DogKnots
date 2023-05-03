//para poner en los inputs la data del tralado seleccionado previamente

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

  // validando que no se pase directo a donacion

  if (currentUnit.value !== "Bodega" || currentUnit.value === null) {
    errors.push("La unidad actual es requerida. ");
    currentUnit.classList.add("error");
  }

  if (destinationUnit.value === "" || destinationUnit.value === null) {
    errors.push("La unidad de destino es requerida. ");
    destinationUnit.classList.add("error");
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

//funcion para traer asset

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

//este es el update

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

//de aca para abajo es lo valicion y hacer la  peticion

//Traer traslado para mostrar sus propiedades en los campos

async function getTransferbyId(id) {
  const response = await fetch(`http://localhost:3000/transfer?id=${id}`);

  const transferDataJson = await response.json();
  console.log(transferDataJson);
  return transferDataJson[0];
}

//funcion para asignar valores a los elementos del form

function assignValues(transfer) {
  document.getElementById("assetId").value = transfer.assetId;
  document.getElementById("currentUnit").value = transfer.currentUnit;
  document.getElementById("assetName").value = transfer.assetName;
  document.getElementById("destinationUnit").value = transfer.destinationUnit;
  document.getElementById("justification").value = transfer.justification;

  document.getElementsByName("reason").forEach((element) => {
    if (transfer.transferReason === element.value) {
      element.checked = true;
    }
  });

  document.getElementById("disuse").value = transfer.transferReason;
  document.querySelector("#transferImageDisplay1").src = transfer.image1;
  document.querySelector("#transferImageDisplay2").src = transfer.image2;
}

window.onload = async function () {
  const rejectButton = document.getElementById("rejectTransferRequest");
  const acceptButton = document.getElementById("acceptTransferRequest");

  rejectButton.classList.add("hide");
  acceptButton.classList.add("hide");

  //to get the local storage persisted value

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

  try {
    const selectedTransferId = localStorage.getItem("selectedTransferId");
    const transfer = await getTransferbyId(selectedTransferId);
    console.log("logueando el transfer en consola del onload", transfer);
    assignValues(transfer);
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

  const form = document.querySelector("form");
  const assetId = document.getElementById("assetId");
  const currentUnit = document.getElementById("currentUnit");
  const assetName = document.getElementById("assetName");
  const destinationUnit = document.getElementById("destinationUnit");
  const justification = document.getElementById("justification");
  const damageRadio = document.getElementById("damage");
  const disuseRadio = document.getElementById("disuse");
  const submit = document.getElementById("acceptTransferRequest");
  const decline = document.getElementById("rejectTransferRequest");
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
        //await sendData(requestBody);
        //aca ocurre la magia PENDIENTE
        //form.reset();
      } catch (error) {}
    }
  });
};

const displayUnidades_Dropdown = (unidades) => {
  const originDD = document.getElementById("currentUnit");
  const destinationDD = document.getElementById("destinationUnit");
  originDD.innerHTML = ""; //Aca vaciamos lo que esta DENTRO del select
  destinationDD.innerHTML = "";
  //<option value="" selected>Seleccione una unidad </option>
  var dropdownOptions = `
    ${unidades
      .map((unidad) => `<option value="${unidad.name}">${unidad.name}</option>`)
      .join("")}
    `; //Aqui llenamos el dropdown

  originDD.innerHTML = dropdownOptions;
  destinationDD.innerHTML = dropdownOptions;
};
