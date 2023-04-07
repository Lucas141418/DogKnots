// entries
let emailFlag = true;
let passwordFlag = true

const logIn = document.getElementById("loginSection");
const signupDiv = document.getElementById("signUp")
const signupBtn = document.getElementById("signupButton")
const main = document.querySelector("main")
const cancelBtn = document.getElementById("cancelBtn")
const  gmailExpression =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;




// Proccess
cancelBtn.addEventListener('click', () => {
    signupDiv.style.display = 'none'
    main.style.filter = 'none'
})
signupBtn.addEventListener("click", () => {
    signupDiv.style.display = 'block'
    main.style.filter = "blur(5px)"


    
})
logIn.addEventListener("submit", validation);




function validation(e) {
    e.preventDefault();
    email = document.getElementById("loginGmail")
    password = document.getElementById("loginPassword")

    if (email.value === "" && password.value === "" ){
        Swal.fire({
            icon: 'warning',
            title: ' Falta correo y contraseña',
            confirmButtonColor: "#a44200",
            
          })
    }else if(!email.value.match(gmailExpression)){
        Swal.fire({
            icon: 'warning',
            title: ' Formato de correo no valido',
            confirmButtonColor: "#a44200"
          })
    } else if(password.value === ""){
        Swal.fire({
            icon: 'warning',
            title: ' Falta contraseña',
            confirmButtonColor: "#a44200"
          })

    }
}
