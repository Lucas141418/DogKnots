// images
const transferImageDisplay1 = document.getElementById("transferImageDisplay1");
const transferImageDisplay2 = document.getElementById("transferImageDisplay2");

// inputs
const transferImageInput1 = document.getElementById("transferImage1");
const transferImageInput2 = document.getElementById("transferImage2");

//buttons
const fileButton1 = document.getElementById("fileButton1");
const fileButton2 = document.getElementById("fileButton2");

//image 1
fileButton1.addEventListener("click", function (e) {
  e.preventDefault();
  transferImageInput1.click();
});

transferImageInput1.addEventListener("change", function (e) {
  transferImageDisplay1.src = URL.createObjectURL(e.target.files[0]);
});

//image 2
fileButton2.addEventListener("click", function (e) {
  e.preventDefault();
  transferImageInput2.click();
});

transferImageInput2.addEventListener("change", function (e) {
  transferImageDisplay2.src = URL.createObjectURL(e.target.files[0]);
});

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

const reasonIsChecked = function () {
  let returnValue = false;
  if (damageRadio.checked) {
    returnValue = true;
  } else if (disuseRadio.checked) {
    returnValue = true;
  } else {
    returnValue = false;
  }
  return returnValue;
};

submit.addEventListener("click", function (e) {
  e.preventDefault();

  const errors = [];

  //Revisa que se haya ingresado un id del activo
  if (assetId.value === "" || assetId.value === null) {
    errors.push("El ID del activo es requerido. ");
  } else if (assetId.value.trim() !== "" && isNaN(assetId.value)) {
    errors.push("El ID del activo debe ser un número. ");
  }

  if (currentUnit.value === "" || currentUnit.value === null) {
    errors.push("La unidad actual es requerida. ");
  }

  if (assetName.value === "" || assetName.value === null) {
    errors.push("El nombre del activo es requerido. ");
  }

  if (destinationUnit.value === "" || destinationUnit.value === null) {
    errors.push("La unidad de destino es requerida. ");
  }

  if (justification.value === "" || justification.value === null) {
    errors.push("La justificación es requerida. ");
  }

  if (!reasonIsChecked()) {
    errors.push("El motivo es requerido. ");
  }

  if (transferImage1.files.length === 0 || transferImage2.files.length === 0) {
    errors.push("Las 2 imágenes que justifiquen el traslado son requeridas. ");
  }

  if (errors.length > 0) {
    console.log(errors);
    swal("Hay errores en el formulario", errors.join(""), "error", {
      button: "OK",
    });
  } else {
    form.reset();
    swal({
      title: "Registro de traslado exitoso",
      text: "El traslado se ha registrado correctamente.",
      icon: "success",
      button: "OK",
    });
  }
});
