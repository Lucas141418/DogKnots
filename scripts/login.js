// entries
let emailFlag = true;
let passwordFlag = true;

const logIn = document.getElementById("loginSection");
const signupForm = document.getElementById("signUp")
const signupBtn = document.getElementById("signupButton")
const main = document.querySelector("main")
const closeBtn = document.getElementById("closeSingup")
const  gmailExpression =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;




// Proccess
closeBtn.addEventListener('click', () => {
    signupForm.style.display = 'none'
    main.style.filter = 'none'
})
signupBtn.addEventListener("click", () => {
    signupForm.style.display = 'flex'
    main.style.filter = "blur(5px)"
})

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

})

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("JHOLa")

})
if(window.getComputedStyle(signupForm).display === 'flex'){
    
} else {
    
}


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
