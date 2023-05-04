window.onload = async function mostrarTraslados(){
    var queryURL = "http://localhost:3000/historicoActivo";

    try {
        const res = await fetch(queryURL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        console.log(data);
        displayTrasladosAsATable(data)
    } catch (error) {
        console.error(error);
    }

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
}

function displayTrasladosAsATable(traslados) { //el parametro que va dentro de la funcion es el response es decir el array de objetos de la DB
   
  var espacioTraslados = document.querySelector("#traslados");
  espacioTraslados.innerHTML = "";

  var tbody = `
    <thead>
        <tr>
            <th>Actor</th>
            <th>ID solicitud</th>
            <th>Nombre Activo</th>
            <th>ID Activo</th>
            <th>Motivo</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha</th>
        </tr>
    </thead>
    <tbody>
      ${traslados.map(traslado => `
        <tr>
          <td>${traslado.actor}</td>
          <td>${traslado.transferId}</td>
          <td>${traslado.assetName}</td>
          <td>${traslado.assetId}</td>
          <td>${traslado.transferReason}</td>
          <td>${traslado.currentUnit}</td>
          <td>${traslado.destinationUnit}</td>
          <td>${traslado.createdAt}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  espacioTraslados.innerHTML = tbody;
}

// document.querySelector('#btnTraslados').addEventListener('click', mostrarTraslados);

const displayUnidades_Dropdown = (unidades) => {
  const dropdown = document.getElementById("userUnity"); //Aca vaciamos lo que esta DENTRO del select
  dropdown.innerHTML = "";

  var dropdownOptions = `<option value="">Seleccione una unidad </option>
    ${unidades
      .map((unidad) => `<option value="${unidad.name}">${unidad.name}</option>`)
      .join("")}
    `; //Aqui llenamos el dropdown

  dropdown.innerHTML = dropdownOptions;
};
