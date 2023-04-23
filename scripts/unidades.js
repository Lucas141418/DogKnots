window.addEventListener("DOMContentLoaded", function () {
  const mainContentContainer = document.querySelector("#main-content");
  const unitsBtn = document.querySelector("#units-btn");
  const registerUnitsBtn = document.querySelector("#register-units-btn");
  const editUnitsBtn = document.querySelector("#edit-units-btn");
  const deleteUnitsBtn = document.querySelector("#delete-unit-btn");

  unitsBtn.addEventListener("click", () => {
    initUnitsInformation();
    initTable();
    this.localStorage.setItem('currentAction', 'read');
  });

  registerUnitsBtn.addEventListener("click", () => {
    this.localStorage.setItem('currentAction', 'create');
    initUnitForm();
  });

  editUnitsBtn.addEventListener("click", () => {
    this.localStorage.setItem('currentAction', 'update');
    initUnitForm();
  });

  deleteUnitsBtn.addEventListener("click", () => {
    const selectedId = JSON.parse(this.localStorage.getItem('selectedItem'))._id;
    swal({
      title: "Eliminando",
      text: `Desea eliminar el elemento ${String(selectedId).padStart(3,'0')}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if(willDelete){
        axios({
          method: 'delete',
          url: `http://localhost:3000/unidades/${selectedId}`
        }).then(()=>{
          window.location.href = "unidades.html";
          initUnitsInformation();
          initTable();
          this.localStorage.setItem('currentAction', 'read');
          this.localStorage.removeItem('selectedItem');
        })
      }
    });
  });


  const initUnitsInformation = () => {
    this.localStorage.setItem("CurrentSection", "UnitInformation");
    const unitInfoContent = document.createElement("div");
    unitInfoContent.classList.add("unit-information");
    const units = /*html*/ `
            <div class="section-filters">
                

                
                <form class= "search-filters">
                <span class="filter-options">
                    <label for= "search-for-name">Nombre</label>
                    <input id="search-for-name" class="search-bar" placeholder="Unidad Tibás" type="text">
                </span>
                
                <span class="filter-options">
                    <label for= "search-for-id">ID</label>
                    <input id="search-for-id" class="search-bar" placeholder= "000" type="text"> 
                </span>

                <span class="filter-options">
                    <label for= "search-for-province">Provincia</label>
                    <select id="search-for-province">
                        <option value=""></option>
                    </select>
                </span>

                <span class="filter-options">
                    <label for="search-for-canton">Canton</label>
                    <input id="search-for-canton" class="search-bar" placeholder="Montes de Oca" type="text">
                </span>

                <span class="filter-options">
                    <label for="search-for-register-date">Fecha de registro</label>
                    <input type="date" name id="search-for-register-date">
                </span>
                
                <button aria-label="Filtrar" class="icon-btn search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>


            </div>
    
                      <!-- table -->
                <table class="transferListTable">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Ubicación</th>
                        <th>Señas</th>
                        <th>Fecha de Registro</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
    unitInfoContent.innerHTML = units;
    mainContentContainer.innerHTML = unitInfoContent.outerHTML;
  };

  const initUnitForm = () => {
    this.localStorage.setItem("CurrentSection", "UnitForm");
    const unitForm = document.createElement("div");
    unitForm.classList.toggle("unit-form");
    const units_form = /*html*/ `  
            <form class= "unit-register">


                <div class= "unit-name-register">
                    <label for= "unit-name">Nombre de la unidad</label>
                    <input id= "unit-name" placeholder= "Digite el nombre la unidad...">
                </div>

                <div class= "unit-id-register">
                    <label for= "unit-id">ID</label>
                    <label id= "unit-id">001</label>
                </div>

                <div class= "unit-description-register">
                <label for= "unit-description">Descripción</label>
                <textarea id= "unit-description" placeholder= "Digite descripción de la unidad..."></textarea>
                </div>

                <div class= "unit-province-register">
                    <label for= "unit-province">Provincia</label>
                    <select id= "unit-province">
                        <option value="">-Elija-</option>
                        <option value="San José">-San José-</option>
                        <option value="Alajuela">-Alajuela-</option>
                        <option value="Cartago">-Cartago-</option>
                        <option value="Heredia">-Heredia-</option>
                        <option value="Puntarenas">-Puntarenas-</option>
                        <option value="Guanacaste">-Guanacaste-</option>
                        <option value="Limón">-Limón-</option>
                    </select>
                </div>                

                <div class= "unit-canton-register">
                <label for= "unit-canton">Cantón</label>
                <input id= "unit-canton" placeholder= "Ej: San Carlos">
                </div>      

                <div class= "unit-district-register">
                <label for= "unit-district">Distrito</label>
                <input id= "unit-district" placeholder= "Ej: La Fortuna">
                </div>    

                <div class= "unit-direction-details-register">
                <label for= "unit-direction-details">Otras señas</label>
                <textarea id= "unit-direction-details" placeholder= "Digite detalles de la dirección..."></textarea>
                </div>

                <div class="unit-date-register">
                <label for="unit-date">Fecha de registro</label>
                <label id= "unit-date">${moment().format('DD/MM/YYYY')}</label>
                </div>

                <div class="button-cancel-register">
                <button  class="white-red-button" type= "Button">Cancelar</button>
                </div>

                <div class="button-save-register">
                <button class="red-button" type= "Button">Guardar</button>
                </div>




            </form>
        
        
        
        `;
    unitForm.innerHTML = units_form;
    mainContentContainer.innerHTML = unitForm.outerHTML;

    if (this.localStorage.getItem('currentAction') === 'create') {
      axios({
        method: 'get',
        url: 'http://localhost:3000/last-id/units'
      }).then((response) => {
        const id = document.querySelector('#unit-id');
        const dataId = response.data[0].sequence_value;
        id.innerHTML = String(dataId + 1).padStart(3, '0');
      }).then(() => {
        SaveButtonHandler()
      }).catch(err => {
        console.log(err);
      })
    }
    if (this.localStorage.getItem('currentAction') === 'update') {
      const selectedItem = this.localStorage.getItem('selectedItem');
      if (selectedItem) {
        const parsedSelectedItem = JSON.parse(selectedItem);
        const unitName = document.querySelector('#unit-name');
        const unitDescription = document.querySelector('#unit-description');
        const unitProvince = document.querySelector('#unit-province')
        const unitCanton = document.querySelector('#unit-canton')
        const unitDistrict = document.querySelector('#unit-district')
        const unitDirectionDetails = document.querySelector('#unit-direction-details')
        const unitId = document.querySelector('#unit-id');
        const unitDate = document.querySelector('#unit-date');

        unitName.value = parsedSelectedItem.name;
        unitDescription.value = parsedSelectedItem.description;
        unitProvince.value = parsedSelectedItem.province;
        unitCanton.value = parsedSelectedItem.canton;
        unitDistrict.value = parsedSelectedItem.district;
        unitDirectionDetails.value = parsedSelectedItem.otherSigns;
        unitDate.innerHTML = parsedSelectedItem.registerDate;

        const dataId = parsedSelectedItem._id;
        unitId.innerHTML = String(dataId + 1).padStart(3, '0');
        SaveButtonHandler()
      }
    }
  };

  const initTable = () => {
    const tableBody = document.querySelector(".transferListTable tbody");
    axios({
      method: 'get',
      url: 'http://localhost:3000/unidades'
    })
      .then(function (response) {
        response.data.forEach((dataElement) => {
          const newElement = document.createElement("tr");
          newElement.innerHTML = /*html*/ `
                    <td>${String(dataElement._id).padStart(3, '0')}</td>
                    <td>${dataElement.name}</td>
                    <td>${dataElement.description}</td>
                    <td>${dataElement.province}, ${dataElement.canton}, ${dataElement.district}</td>
                    <td>${dataElement.otherSigns}</td>
                    <td>${dataElement.registerDate}</td>
                `;
          tableBody.appendChild(newElement);
          newElement.addEventListener('click', () => {
            localStorage.setItem('selectedItem', JSON.stringify(dataElement));
          })
        });
      });

  };

  this.setTimeout(() => {
    const currentSection = localStorage.getItem("CurrentSection");
    if (!currentSection) {
      initUnitsInformation();
      initTable();
    } else {
      switch (currentSection) {
        case "UnitInformation":
          initUnitsInformation();
          initTable();
          break;
        case "UnitForm":
          initUnitForm();
          break;
        default:
          break;
      }
    }
  }, 0);

  const SaveButtonHandler = () => {
    const saveButton = document.querySelector('.button-save-register>button');

    let errors = [];
    const unitName = document.querySelector('#unit-name');
    const unitDescription = document.querySelector('#unit-description');
    const unitProvince = document.querySelector('#unit-province');
    const unitCanton = document.querySelector('#unit-canton');
    const unitDistrict = document.querySelector('#unit-district');
    const unitDirectionDetails = document.querySelector('#unit-direction-details');


    saveButton.addEventListener('click', (e) => {
      e.preventDefault();

      if (!unitName.value) {
        errors.push('Debe introducir un nombre');
      }

      if (!unitDescription.value) {
        errors.push('Debe introducir una descripción');
      }

      if (!unitProvince.value) {
        errors.push('Debe seleccionar una provincia');
      }

      if (!unitCanton.value) {
        errors.push('Debe ingresar el nombre de un cantón');
      }

      if (!unitDistrict.value) {
        errors.push('Debe ingresar el nombre de un distrito');
      }

      if (!unitDirectionDetails.value) {
        errors.push('Debe ingresar otras señas');
      }

      if (errors.length > 0) {
        console.log(errors);
        swal("Hay errores en el formulario", errors.join(", "), "error", {
          button: "OK",
        });
      } else {
        let actionUrl = 'http://localhost:3000/unidades'
        let method = 'post';
        const selectedItem = this.localStorage.getItem('selectedItem');
        const currentAction = this.localStorage.getItem('currentAction');
        if (currentAction === 'update' && selectedItem) {
          actionUrl = `${actionUrl}/${JSON.parse(selectedItem)._id}`;
          method = 'patch';
        }
        axios({
          method,
          url: actionUrl,
          data: {
            name: unitName.value,
            description: unitDescription.value,
            province: unitProvince.value,
            canton: unitCanton.value,
            district: unitDistrict.value,
            otherSigns: unitDirectionDetails.value,
          }
        }).then(function (response) {
          if (currentAction === 'create') {
            console.log('unidad guardada');
            swal({
              title: "Registro exitoso",
              text: "La unidad se ha registrado correctamente",
              icon: "success",
              button: "OK",
            }).then((value) => {
              window.location.href = "unidades.html";
              initUnitsInformation();
              initTable();
              this.localStorage.setItem('currentAction', 'read');
            });
          } else if (currentAction === 'update') {
            console.log('unidad guardada');
            swal({
              title: "Edición exitosa",
              text: "La unidad se ha actualizado correctamente",
              icon: "success",
              button: "OK",
            }).then((value) => {
              window.location.href = "unidades.html";
              initUnitsInformation();
              initTable();
              this.localStorage.setItem('currentAction', 'read');
              this.localStorage.removeItem('selectedItem');
            });
          }

        }).catch(error => console.log(error));


      }
      errors = [];
    })
  }
});