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
        const unitInfoContent = document.createElement('div');
        unitInfoContent.classList.add('unit-information');
        const units = /*html*/`
            <div class="section-filters">
                
                <h2>Filtros de Busqueda</h2>

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
                    <select id="search-for-register-date"><option value="">-Any-</option></select>
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
        const unitForm = document.createElement('div');
        unitForm.classList.toggle('unit-form');
        const units_form = /*html*/`formulario`;
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
                <td>${dataElement.created}</td>
            `;
            tableBody.appendChild(newElement);
        });
    }

    this.setTimeout(() => {
        initUnitsInformation();
        initTable();
    }, 0)
});

const tableData = [
    {
        id: '001',
        name: 'Name01',
        desc: 'Test Data',
        loc: 'San Jose',
        created: '01/01/2023',
    },
    {
        id: '002',
        name: 'Name01',
        desc: 'Test Data',
        loc: 'San Jose',
        created: '01/01/2023',
    },
    {
        id: '003',
        name: 'Name01',
        desc: 'Test Data',
        loc: 'San Jose',
        created: '01/01/2023',
    },
    {
        id: '004',
        name: 'Name01',
        desc: 'Test Data',
        loc: 'San Jose',
        created: '01/01/2023',
    },
    {
        id: '005',
        name: 'Name01',
        desc: 'Test Data',
        loc: 'San Jose',
        created: '01/01/2023',
    },
    {
        id: '006',
        name: 'Name01',
        desc: 'Test Data',
        loc: 'San Jose',
        created: '01/01/2023',
    },
]
