// Buttons entries
const btnUsers = document.getElementById("btnUsers")
const btnUnits = document.getElementById("btnUnits")
const btnAssets = document.getElementById("btnAssets")
const btnLogBook = document.getElementById("btnLogbook")
const btnWareHouses = document.getElementById("btnWarehouses")
const btnDonations = document.getElementById("btnDonations")
const table = document.getElementById("table")
const thead = document.querySelector("thead")
let headerTable = null;


// sideBar


document.addEventListener('DOMContentLoaded',  async () => {
    headerTable = table.tHead.insertRow(0);

  const th1 = document.createElement("th");
  th1.textContent =  "Identificación";
  
  const th2 = document.createElement("th");
  th2.textContent = "Usuario";
  
  const th3 = document.createElement("th");
  th3.textContent = "Rol";
  
  const th4 = document.createElement("th");
  th4.textContent = "Correo electrónico";
  
  const th5 = document.createElement("th");
  th5.textContent = "Fecha de nacimiento";
  
  const th6 = document.createElement("th");
  th6.textContent = "Unidad";
  
  const th7 = document.createElement("th");
  th7.textContent = "Aprobado";
  
  // Agregar los nuevos elementos "th" a la fila de encabezado
  headerTable.appendChild(th1);
  headerTable.appendChild(th2);
  headerTable.appendChild(th3);
  headerTable.appendChild(th4);
  headerTable.appendChild(th5);
  headerTable.appendChild(th6);
  headerTable.appendChild(th7);


  const users = await logBookUsers()

  users.forEach(user => {
    const tbody = document.querySelector("#table tbody")
    console.log(tbody)

    const tr = document.createElement("tr");

    const userId = document.createElement("td");
    userId.textContent = user.identification;

    const userName = document.createElement("td");
    userName.textContent = user.name;
    
    // const userLastName = document.createElement("td");
    // userLastName.textContent = user.lastName;

    const userEmail = document.createElement("td");
    userEmail.textContent = user.email;

    const userNumber = document.createElement("td");
    userNumber.textContent = user.number;

    const userBirth = document.createElement("td");
    userBirth.textContent = user.birthDay;



    tbody.appendChild(tr);
    tr.appendChild(userId);
    tr.appendChild(userName);
    // tr.appendChild(userLastName);
    tr.appendChild(userEmail);
    tr.appendChild(userNumber);
    tr.appendChild(userBirth);

    
  });
    

})

btnUsers.addEventListener('click', async () => {
  const tbody = document.querySelector("#table tbody")
  tbody.innerHTML = ""
  if (headerTable !== null) {
    headerTable.remove();
  }

  headerTable = table.tHead.insertRow(0);

  const th1 = document.createElement("th");
  th1.textContent =  "Identificación";
  
  const th2 = document.createElement("th");
  th2.textContent = "Usuario";
  
  const th3 = document.createElement("th");
  th3.textContent = "Rol";
  
  const th4 = document.createElement("th");
  th4.textContent = "Correo electrónico";
  
  const th5 = document.createElement("th");
  th5.textContent = "Fecha de nacimiento";
  
  const th6 = document.createElement("th");
  th6.textContent = "Unidad";
  
  const th7 = document.createElement("th");
  th7.textContent = "Aprobado";
  
  // Agregar los nuevos elementos "th" a la fila de encabezado
  headerTable.appendChild(th1);
  headerTable.appendChild(th2);
  headerTable.appendChild(th3);
  headerTable.appendChild(th4);
  headerTable.appendChild(th5);
  headerTable.appendChild(th6);
  headerTable.appendChild(th7);


  const users = await logBookUsers()

  users.forEach(user => {
    const tbody = document.querySelector("#table tbody")
    console.log(tbody)

    const tr = document.createElement("tr");

    const userId = document.createElement("td");
    userId.textContent = user.identification;

    const userName = document.createElement("td");
    userName.textContent = user.name;
    
    // const userLastName = document.createElement("td");
    // userLastName.textContent = user.lastName;

    const userEmail = document.createElement("td");
    userEmail.textContent = user.email;

    const userNumber = document.createElement("td");
    userNumber.textContent = user.number;

    const userBirth = document.createElement("td");
    userBirth.textContent = user.birthDay;



    tbody.appendChild(tr);
    tr.appendChild(userId);
    tr.appendChild(userName);
    // tr.appendChild(userLastName);
    tr.appendChild(userEmail);
    tr.appendChild(userNumber);
    tr.appendChild(userBirth);

    
  });

  
});

btnUnits.addEventListener("click", () => {
  const tbody = document.querySelector("#table tbody")
  tbody.innerHTML = ""

    if (headerTable !== null) {
        headerTable.remove();
      }
    
      headerTable = table.tHead.insertRow(0);
    
      const th1 = document.createElement("th");
      th1.textContent =  "ID";
      
      const th2 = document.createElement("th");
      th2.textContent = "Unidad";
      
      const th3 = document.createElement("th");
      th3.textContent = "Ubicación";
      
      const th4 = document.createElement("th");
      th4.textContent = "Fecha creación";
      
      
      headerTable.appendChild(th1);
      headerTable.appendChild(th2);
      headerTable.appendChild(th3);
      headerTable.appendChild(th4);
      
    })

    



btnAssets.addEventListener('click', () => {
  const tbody = document.querySelector("#table tbody")
  tbody.innerHTML = ""
    if (headerTable !== null) {
        headerTable.remove();
      }
    
      headerTable = table.tHead.insertRow(0);
    
      const th1 = document.createElement("th");
      th1.textContent =  "ID";
      
      const th2 = document.createElement("th");
      th2.textContent = "Nombre del Activo";
      
      const th3 = document.createElement("th");
      th3.textContent = "Unidad";
      
      const th4 = document.createElement("th");
      th4.textContent = "Estado";
      
      const th5 = document.createElement("th");
      th5.textContent = "Fecha Añadido";
      
      const th6 = document.createElement("th");
      th6.textContent = "Código de Activo";
      
      
      
      headerTable.appendChild(th1);
      headerTable.appendChild(th2);
      headerTable.appendChild(th3);
      headerTable.appendChild(th4);
      headerTable.appendChild(th5);
      headerTable.appendChild(th6);



  
})
btnLogBook.addEventListener('click', () => {
    const tbody = document.querySelector("#table tbody")
    tbody.innerHTML = ""
    if (headerTable !== null) {
        headerTable.remove();
      }
    
      headerTable = table.tHead.insertRow(0);
    
      const th1 = document.createElement("th");
      th1.textContent =  "Bitacora";
      
      const th2 = document.createElement("th");
      th2.textContent = "";
      
      const th3 = document.createElement("th");
      th3.textContent = "";
      
      const th4 = document.createElement("th");
      th4.textContent = " ";
      
      const th5 = document.createElement("th");
      th5.textContent = " ";
      
      const th6 = document.createElement("th");
      th6.textContent = "";
      
      const th7 = document.createElement("th");
      th7.textContent = "";
      
      headerTable.appendChild(th1);
      headerTable.appendChild(th2);
      headerTable.appendChild(th3);
      headerTable.appendChild(th4);
      headerTable.appendChild(th5);
      headerTable.appendChild(th6);
      headerTable.appendChild(th7);
})

btnWareHouses.addEventListener('click', () => {
    const tbody = document.querySelector("#table tbody")
    tbody.innerHTML = ""
    if (headerTable !== null) {
        headerTable.remove();
      }
    
      headerTable = table.tHead.insertRow(0);
    
      const th1 = document.createElement("th");
      th1.textContent =  "Bodega";
      
      const th2 = document.createElement("th");
      th2.textContent = "";
      
      const th3 = document.createElement("th");
      th3.textContent = "";
      
      const th4 = document.createElement("th");
      th4.textContent = "";
      
      const th5 = document.createElement("th");
      th5.textContent = "  ";
      
      const th6 = document.createElement("th");
      th6.textContent = "";
      
      const th7 = document.createElement("th");
      th7.textContent = "";
      
      headerTable.appendChild(th1);
      headerTable.appendChild(th2);
      headerTable.appendChild(th3);
      headerTable.appendChild(th4);
      headerTable.appendChild(th5);
      headerTable.appendChild(th6);
      headerTable.appendChild(th7);

})

btnDonations.addEventListener('click', () => {
    const tbody = document.querySelector("#table tbody")
    tbody.innerHTML = ""
    if (headerTable !== null) {
        headerTable.remove();
      }
    
      headerTable = table.tHead.insertRow(0);
    
      const th1 = document.createElement("th");
      th1.textContent =  "ID";
      
      const th2 = document.createElement("th");
      th2.textContent = "Activo";
      
      const th3 = document.createElement("th");
      th3.textContent = "Fecha Añadido";
      

      
      headerTable.appendChild(th1);
      headerTable.appendChild(th2);
      headerTable.appendChild(th3);
      
    
})