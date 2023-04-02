// entries
let email;

const logIn = document.getElementById("loginSection");
const  gmailExpression =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;




// Proccess

logIn.addEventListener("submit", validation)



function validation(e) {
    email = document.getElementById("loginGmail")
    password = document.getElementById("loginPassword")
    e.preventDefault();

    if (!email.value.match(gmailExpression) &&  password.value === ""){
        Swal.fire({
            icon: 'error',
            title: ' Falta el correo y contraseña',
            
          })
    }else if(password.value === ""){
        Swal.fire({
            icon: 'error',
            title: ' Falta la contraseña',
          })
    }
}