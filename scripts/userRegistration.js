const registerUser = async (pSignupName, pSignupId, pSignupFirstName, pSignupEmail, pSignupSecondName, pSignupPhone, pSignupBirth, pSignupPassword) => {
    const user = {
        identification: pSignupId,
        name: pSignupName,
        lastName: pSignupFirstName,
        secondLastName: pSignupSecondName,
        email: pSignupEmail,
        number: pSignupPhone,
        birthDay: pSignupBirth,
    };

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        console.log(res)
    } catch (error) {
        console.error(error);
    }
}

const validatioDB = async (pEmail, pIdentification) => {
    try{
        let validation = true;
        const response = await fetch("http://localhost:3000/login");
        const data = await response.json();

        const checkEmailDB =  data.find(checkEmailDB => checkEmailDB.email === pEmail); // funcion de comparacion
        const checkIdentificationDB =  data.find(checkIdentificationDB => checkIdentificationDB.identification === pIdentification);

        if(checkEmailDB){
            Swal.fire({
                icon: 'warning',
                title: ' El correo  ya existe',
                confirmButtonColor: "#a44200",
                });
            validation = false;
        } else if(checkIdentificationDB){
            Swal.fire({
                icon: "warning",
                title: " La identificacion ya existe",
                confirmButtonColor: "#a44200",
            })
            validation = false;
        }

        return validation;
        
        
    } catch(error){
        console.error(error);
        return false;
    }

}



    const chargeUser = async (pEmail, pPassword) => {

        try{
            const response = await fetch("http://localhost:3000/login");

            const data = await response.json();

            const check = data.find(check => check.email === pEmail); 
            console.log(check) //quitar esto
            if(!check){
                Swal.fire({
                    icon: 'warning',
                    title: ' El correo no existe, por favor registrarse!',
                    confirmButtonColor: "#a44200",
                })
            }
           else if(check.password === pPassword){
            Swal.fire({
                icon: 'success',
                title: ' All good!',
                confirmButtonColor: "#a44200",
            });
           } else{
            Swal.fire({
                icon: 'warning',
                title: ' Contraseña incorrecta',
                confirmButtonColor: "#a44200",
            });
           }

        } catch(error){
            console.error(error);
        }

        

        

    };

const recoveryPassword = async (pEmail) => {

    const userUpdate = {
        email: pEmail,
    }

    try{

        const response = await fetch("http://localhost:3000/login", {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userUpdate),
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));


        
    } catch(error){
        console.error(error);
    }


      

}