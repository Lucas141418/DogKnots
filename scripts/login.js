window.onload = function(){// entries
let emailFlag = true;
let passwordFlag = true;

// div
const signupPopOut = document.getElementById("signUp")
const passwordRecoveryPopOut = document.getElementById("recoveryPassword")

// forms
const logIn = document.getElementById("loginSection");
const showSignUpPassword = document.getElementById("showSignUpPass")
const showSignUpPassword2 = document.getElementById("showSignUpPass2")
const loginPassword = document.getElementById("loginPassword")
const test = document.getElementById("test")
// buttons
const passwordRecoveryBtn = document.getElementById("forgottenPassword")
const closePasswordBtn = document.getElementById("closePasswordBtn")
const closeBtn = document.getElementById("closeSingup")
const signupBtn = document.getElementById("signupButton")
const showPasswordBtn = document.getElementById("showPassword")
// main
const main = document.querySelector("main")

const currentDate = new Date()
const gmailExpression =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const numberExpression = /^[0-9]+$/;




// Proccess

closeBtn.addEventListener('click', () => {
    signupPopOut.style.display = 'none'
    main.style.filter = 'none'
})
signupBtn.addEventListener("click", () => {
    signupPopOut.style.display = 'flex'
    main.style.filter = "blur(5px)"
})

passwordRecoveryBtn.addEventListener('click', () => {
    passwordRecoveryPopOut.style.display = 'flex'
    main.style.filter = "blur(5px)"
})

closePasswordBtn.addEventListener('click', () => {
    passwordRecoveryPopOut.style.display = 'none'
    main.style.filter = 'none'
})


    
showPasswordBtn.addEventListener("click", () => {
    if(loginPassword.type == "password"){
        loginPassword.type = 'text'
    } else{
        loginPassword.type = 'password'
    }
})




// showSignUpPassword.addEventListener('click', () => {
//     showPass1 = document.getElementById("signupPassword")
//     showPass2 = document.getElementById("signupPassword2")


//     if(showPass1.type == 'password' || showPass2.type == 'password'){
//         showPass1.type = "text"
//         showPass2.type = 'text'
//     }else{
//         showPass1.type = "password"
//         showPass2.type = "password"

//     }

// })

// showSignUpPassword2.addEventListener("click", () => {
//     showPass1 = document.getElementById("signupPassword")
//     showPass2 = document.getElementById("signupPassword2")


//     if(showPass1.type == 'password' || showPass2.type == 'password'){
//         showPass1.type = "text"
//         showPass2.type = 'text'
//     }else{
//         showPass1.type = "password"
//         showPass2.type = "password"

//     }

// })


passwordRecoveryPopOut.addEventListener('submit',  async function recoveryPasswordF(e){
    e.preventDefault();
    email = document.getElementById("passwordEmail")
    const emailValue = email.value
    console.log(emailValue)

    await recoveryPassword(emailValue)

})



signupPopOut.addEventListener("submit", async function validationSignUp(e){
    
    e.preventDefault();
    singupName = document.getElementById("singupName")
    singupId = document.getElementById("singupId")
    singupFirstName = document.getElementById("singupFirstName")
    signupEmail = document.getElementById("signupEmail")
    singupSecondName = document.getElementById("singupSecondName")
    singupPhone = document.getElementById("singupPhone")
    singupBirth = document.getElementById("singupBirth")
    signupPassword = document.getElementById("signupPassword")
    signupPassword2 = document.getElementById("signupPassword2")
    const birthDate = new Date(singupBirth.value)

    
    if(singupName.value.trim() === "" || singupFirstName.value.trim() === "" || singupSecondName.value.trim() === "" ){
        Swal.fire({
            icon: 'warning',
            title: ' Falta información del nombre o apellidos',
            confirmButtonColor: "#a44200",
                
        })
    } 
    else if(singupPhone.value === "" || singupPhone.value.length !== 8 || !numberExpression.test(singupPhone.value) ){
        Swal.fire({
            icon: 'warning',
            title: ' Falta número de teléfono o número no valido',
            confirmButtonColor: "#a44200",
        })
    } else if (singupId.value.length !== 9 || singupId.value === "" || !numberExpression.test(singupId.value)){
        Swal.fire({
            icon: 'warning',
            title: ' Falta número de cédula o cédula no valida',
            confirmButtonColor: "#a44200",
        })
    } else if (!signupEmail.value.match(gmailExpression) || signupEmail.value === ""){
        Swal.fire({
            icon: 'warning',
            title: ' Falta Correo electrónico  o correo no valido',
            confirmButtonColor: "#a44200",
        })
    // }else if(signupPassword2.value !== signupPassword.value || signupPassword.value === "" || signupPassword2.value === "" ){
    //     Swal.fire({
    //         icon: 'warning',
    //         title: ' Faltan contraseñas o las contraseñas no coinciden',
    //         confirmButtonColor: "#a44200",
    //     })

    } else if(await validatioDB(signupEmail.value, singupId.value) === false){
    } 
    else if( birthDate > currentDate  || singupBirth.value ===""){
        Swal.fire({
            icon: 'warning',
            title: ' Falta fecha de nacimiento o fecha no valida',
            confirmButtonColor: "#a44200",
        }) 
    } 
    else{
    Swal.fire({
        title: 'Registrando usuario',
        html: 'Por favor espere...',
        timer: 1500,
        timerProgressBar: true,
      })
        await registerUser(singupName.value, singupId.value, singupFirstName.value,signupEmail.value, singupSecondName.value, singupPhone.value,singupBirth.value)
        Swal.fire({
            icon: 'success',
            title: "Registro exitoso de usuario exitoso",
            text: `Bienvenido ${singupName.value} ${singupFirstName.value} ${singupSecondName.value}`,
            confirmButtonColor: "#a44200",
            
    })
        signupPopOut.style.display = 'none'
        main.style.filter = 'none'
    }
    
    
    
    
})



// Cambios test

logIn.addEventListener("submit", validationLogIn);



function validationLogIn(e) {
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

    }else{
        chargeUser(email.value, password.value)

    }
}


}
