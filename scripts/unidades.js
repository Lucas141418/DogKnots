window.addEventListener('DOMContentLoaded', function () {

    const mainContentContainer = document.querySelector('#main-content');
    const unitsBtn = document.querySelector('#units-btn');
    const registerUnitsBtn = document.querySelector('#register-units-btn');
    const editUnitsBtn = document.querySelector('#edit-units-btn');

    unitsBtn.addEventListener('click', () => {
        initUnitsInformation();
        initTable();
    });


    registerUnitsBtn.addEventListener('click', () => {
        initUnitForm();
    });

    editUnitsBtn.addEventListener('click', () => {
        initUnitForm();
    });

    const initUnitsInformation = () => {
        this.localStorage.setItem("CurrentSection", "UnitInformation");
        const unitInfoContent = document.createElement('div');
        unitInfoContent.classList.add('unit-information');
        const units = /*html*/`
            <div class="section-filters">
                
                <h2 id= search-filters>Filtros de Busqueda</h2>

                <button class="icon-btn"><i class="fa-solid fa-trash"></i> Eliminar unidad</button>
                
                <form class= "search-filters">
                <span class="field-container field-container-text">
                    <label for= "search-for-name">Nombre de la unidad</label>
                    <input id="search-for-name" placeholder= "Tibás" type="text">
                </span>
                
                <span class="field-container field-container-text">
                    <label for= "search-for-id">ID de la unidad</label>
                    <input id="search-for-id" placeholder= "000" type="text"> 
                </span>

                <span class="field-container">
                    <label for= "search-for-province">Provincia</label>
                    <select id="search-for-province">
                        <option value="">-Any-</option>
                    </select>
                </span>

                <span class="field-container">
                    <label for="search-for-canton">Canton</label>
                    <select id="search-for-canton"><option value="">-Any-</option></select>
                </span>

                <span class="field-container">
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
    }


    const initUnitForm = () => {
        this.localStorage.setItem("CurrentSection", "UnitForm");
        const unitForm = document.createElement('div');
        unitForm.classList.toggle('unit-form');
        const units_form = /*html*/`
        
        
            <form class= "unit-register">

                <h2 id= "title-form">Formulario de Registro</h2>

                <div class= "unit-name-register">
                    <label for= "unit-name">Nombre de la unidad</label>
                    <input id= "unit-name" placeholder= "Digite el nombre la unidad...">
                </div>

                <div class= "unit-id-register">
                    <label for= "unit-id">ID</label>
                    <label id= "unit-id">:  001</label>
                </div>

                <div class= "unit-description-register">
                <label for= "unit-description">Descripción</label>
                <textarea id= "unit-description" placeholder= "Digite descripción de la unidad..."></textarea>
                </div>

                <div class= "unit-province-register">
                    <label for= "unit-province">Provincia</label>
                    <select id= "unit-province">
                        <option value="">-Any-</option>
                        <option value="">-San José-</option>
                        <option value="">-Alajuela-</option>
                        <option value="">-Cartago-</option>
                        <option value="">-Heredia-</option>
                        <option value="">-Puntarenas-</option>
                        <option value="">-Guanacaste-</option>
                        <option value="">-Limón-</option>
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
                <label id= "unit-date">01/04/2023</label>
                </div>

                <div class="buttons-register">
                <button  class="white-orange-button" type= "Button">Cancelar</button>
                <button class="orange-button" type= "Button">Guardar</button>
                </div>




            </form>
        
        
        
        `;
        unitForm.innerHTML = units_form;
        mainContentContainer.innerHTML = unitForm.outerHTML;
    }

    const initTable = () => {
        const tableBody = document.querySelector('.transferListTable tbody');
        tableData.forEach((dataElement) => {
            const newElement = document.createElement('tr');
            newElement.innerHTML = /*html*/`
                <td>${dataElement.id}</td>
                <td>${dataElement.name}</td>
                <td>${dataElement.desc}</td>
                <td>${dataElement.loc}</td>
                <td>${dataElement.addr}</td>
                <td>${dataElement.created}</td>
            `;
            tableBody.appendChild(newElement);
        });
    }

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
    }, 0)
});

const tableData = [
    {
        id: '001',
        name: 'Unidad Central',
        desc: 'Oficina Central',
        loc: 'San Jose, San José, Mata Redonda',
        addr: 'Costado Oeste de edificio de canal 7',
        created: '01/01/2023',
    },
    {
        id: '002',
        name: 'Unidad Heredia',
        desc: 'Oficinas de Mantenimiento de equipos',
        loc: 'Heredia, Belén, La Ribera',
        addr: 'Costado Norte de La Gallito',
        created: '01/01/2023',
    },
    {
        id: '003',
        name: 'Unidad Guanacaste',
        desc: 'Oficinas Mercado de turismo',
        loc: 'Guanacaste, Carrillo, El Coco ',
        addr: 'Frente a Restaurante Mar Azúl',
        created: '01/01/2023',
    },
    {
        id: '004',
        name: 'Unidad Puntarenas',
        desc: 'Oficinas Aduaneras Pacífico',
        loc: 'Puntarenas, Esparza, Caldera',
        addr: '500m norte de Restaurante Tabaris',
        created: '01/01/2023',
    },
    {
        id: '005',
        name: 'Unidad Cartado',
        desc: 'Oficinas de Distribucón',
        loc: 'Cartado, La Unión, Tres Ríos',
        addr: 'Costado oeste de Central Autobusera',
        created: '01/01/2023',
    },
    {
        id: '006',
        name: 'Unidad Limón',
        desc: 'Oficinas Aduaneras Caribe',
        loc: 'Limón, Limón, Limón',
        addr: 'Costado este del Colegio Universitario de Limón',
        created: '03/02/2023',
    },

    {
        id: '007',
        name: 'Unidad Alajuela',
        desc: 'Centro de Capacitaciones',
        loc: 'Alajuela, Alajuela, Alajuela',
        addr: 'Frente a entrada Principal de la UTN',
        created: '03/02/2023',
    },

   



]
