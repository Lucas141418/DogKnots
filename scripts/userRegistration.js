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
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}



    const chargeUser = async () => {

        try{
            const response = await fetch("http://localhost:3000/login");

            const data = await response.json();

            // const user = {
            //     _id: data._id,
            //     name: data.name,
            //     lastName: data.lastName,
            //     secondLastName: data.secondLastName,
            //     email: data.email,
            // }
            // console.log(user);

            data.forEach(users => {
                console.log(users.email)
                console.log(users.password)
                
            });

        } catch(error){
            console.error(error);
        }

        

        

    };