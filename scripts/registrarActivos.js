const addActiveForm = document.getElementById("newActive");

let activeName;

    

addActiveForm.addEventListener("click", activeValidation);


function activeValidation(e){
    e.preventDefault();
    const activeName = document.getElementById("activeName")

    if(activeName.value ===""){
        Swal.fire({
            icon: 'warning',
            title: ' Falta correo y contraseña',
            confirmButtonColor: "#a44200",
            
          })
    }

}


