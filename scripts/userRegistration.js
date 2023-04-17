const registerUser = async (pSignupName, pSignupId, pSignupFirstName, pSignupEmail, pSignupSecondName, pSignupPhone, pSignupBirth, pSignupPassword) => {
    const user = {
        identification: pSignupId,
        name: pSignupName,
        lastName: pSignupFirstName,
        secondLastName: pSignupSecondName,
        email: pSignupEmail,
        number: pSignupPhone,
        birthDay: pSignupBirth,
        password: pSignupPassword,
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



    const chargeUser = async (pEmail, pPassword) => {

        try{
            const response = await fetch("http://localhost:3000/login");

            const data = await response.json();

            const check = data.find(check => check.email === pEmail); 
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