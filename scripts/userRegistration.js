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
