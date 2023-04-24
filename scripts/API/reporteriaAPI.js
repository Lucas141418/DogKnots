const logBookUsers = async () => {

    try{
        const response = await fetch("http://localhost:3000/login");

        const dataUsers  = await response.json();
        console.log(dataUsers);
        return dataUsers;
    } catch(error){
        console.error(error);
    }
}
