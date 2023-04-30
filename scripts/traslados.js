//uso el fetch para traer la respuesta y que quede global para usarlo en las funciones

//funcion para traer la lista de traslados del backend y
// dejarlo como un objeto json para trabajar con el

//funcion para mostrar la tabla

function showTable(json) {
  //para traer tabla del html
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  //Se itera sobre el arreglo de traslados
  json.forEach((object) => {
    // Creo html para cada traslado (td)
    const tableInput = document.createElement("tr");
    //tableInput.classList.add("table-traslado-item");

    // Crea un td con cada propiedad del objeto

    const transferId = document.createElement("td");
    transferId.innerText = `${object.transferId}`;

    // Crea un td con cada propiedad del objeto
    const assetName = document.createElement("td");
    assetName.innerText = `${object.assetName}`;

    const assetId = document.createElement("td");
    assetId.innerText = `${object.assetId}`;

    const transferReason = document.createElement("td");
    transferReason.innerText = `${object.transferReason}`;

    const originUnit = document.createElement("td");
    originUnit.innerText = `${object.originUnit}`;

    const destinationUnit = document.createElement("td");
    destinationUnit.innerText = `${object.destinationUnit}`;

    // Agregar hijos al node tr

    tableInput.appendChild(transferId);
    tableInput.appendChild(assetName);
    tableInput.appendChild(assetId);
    tableInput.appendChild(transferReason);
    tableInput.appendChild(originUnit);
    tableInput.appendChild(destinationUnit);

    // Agregar tr al node table
    tableBody.appendChild(tableInput);
  });
}

// seccion de paginacion

function generatePaginationLinks(currentPage, totalPages) {
  let links = "";

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      links += `<a class="active">${i}</a>`;
    } else {
      links += `<a href="#" data-page="${i}">${i}</a>`;
    }
  }

  pagination.innerHTML = links;
}

const getPaginationData = async function (pageValue) {
  try {
    const paginationData = await fetch(
      `http://localhost:3000/transfers/pagination?page=${pageValue}`
    );
    const transfers = paginationData.json();
    return transfers;
  } catch (error) {
    console.log(error);
  }
};

async function showPagination() {
  const pagination = document.getElementById("pagination");
  let pageData = await getPaginationData(1);
  showTable(pageData);
  pagination.addEventListener("click", async function (event) {
    event.preventDefault();
    selectedAnchor.classNamex;

    if (event.target.tagName === "A") {
      page = event.target.getAttribute("data-page");

      console.log(page);
    }
    pageData = await getPaginationData(page);
    console.log(pageData);
    showTable(pageData);
  });
}

//fin de seccion de paginacion

//usando el window.onload que enseñó el profe

window.onload = async function () {
  //   const response = await fetch("http://localhost:3000/transfers");
  //   const json = await response.json();
  //   console.log(json);
  //   await showTable(json);

  //pagination test
  // Example usage:
  const currentPage = 1;
  const totalPages = 3;
  generatePaginationLinks(currentPage, totalPages);

  //para probar si traigo la paginacion
  showPagination();
  //   console.log(json);
};
