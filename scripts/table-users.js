$(document).ready(function () {
  const names = [
    "Sofía",
    "Valentina",
    "Isabella",
    "Camila",
    "Valeria",
    "Luciana",
    "María",
    "Josefina",
    "Renata",
    "Emilia",
    "Mateo",
    "Santiago",
    "Benjamín",
    "Sebastián",
    "Thiago",
    "Lucas",
    "Samuel",
    "Daniel",
    "David",
    "Juan",
  ];

  const lastNames = [
    "García",
    "Gómez",
    "Hernández",
    "Martínez",
    "López",
    "González",
    "Pérez",
    "Rodríguez",
    "Sánchez",
    "Ramírez",
    "Fernández",
    "Moreno",
    "Díaz",
    "Muñoz",
    "Alvarez",
    "Romero",
    "Alonso",
    "Ruiz",
    "Torres",
    "Suárez",
  ];

  function generateRandomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  function generateRandomCedula() {
    const max = 7777777;
    const min = 1000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomPhoneNumber() {
    const max = 89999999;
    const min = 80000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomEmail(name, lastName) {
    const domains = [
      "gmail.com",
      "hotmail.com",
      "outlook.com",
    ];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${name.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
  }

  function generateRandomUnit() {
    const units = ["Unidad 1", "Unidad 2", "Unidad 3", "Unidad 4"];
    return units[Math.floor(Math.random() * units.length)];
  }

  // popular tabla
  const table = document.getElementById("table-users");
  const tbody = table.getElementsByTagName("tbody")[0];
  for (let i = 0; i < 10; i++) {
    const row = tbody.insertRow();
    const name = names[Math.floor(Math.random() * names.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const cedula = generateRandomCedula();
    const email = generateRandomEmail(name, lastName);
    const nacimiento = generateRandomDate(
      new Date(1950, 0, 1),
      new Date(2000, 0, 1)
    );
    const telefono = generateRandomPhoneNumber();
    const unidad = generateRandomUnit();
    row.innerHTML = `
                <td>${cedula}</td>
                <td>${name}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${telefono}</td>
                <td>${nacimiento.toLocaleDateString()}</td>
                <td>${unidad}</td>
            `;
  }
});
