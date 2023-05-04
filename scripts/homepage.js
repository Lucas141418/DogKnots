window.onload = function(){
const navlinks = document.querySelectorAll(".nav li")
const mainCards = document.querySelectorAll('.mainSection .card');
const mainCardsLinks = document.querySelectorAll('.mainSection .card a');
const footerdivs = document.querySelectorAll(".footer div")
const logoutBtn = document.querySelector('#logoutSession');

let connected = sessionStorage.getItem('connected');
console.log("It is connected : ", connected);


let name = sessionStorage.getItem('name');
console.log("The name is : ", name);

let role = sessionStorage.getItem('role');
console.log("the user role is : ", role);
let status = sessionStorage.getItem('approved');

if(connected || status === "inactivo"){

    switch(role){
        case 'jefatura':
          
            break;
            case 'proveeduria':
            mainCardsLinks[4].classList.add('hide');
            mainCards[2].classList.add('hide');
            footerdivs[5].classList.add('hide');
            navlinks[1].classList.add('hide');
          
            break;
        case "encargado":
            mainCardsLinks[4].classList.add('hide');
            mainCards[2].classList.add('hide');
            footerdivs[5].classList.add('hide');
            navlinks[1].classList.add('hide');

            navlinks[2].classList.add('hide');
            mainCards[1].classList.add('hide');

            footerdivs[5].classList.add('hide');
            footerdivs[4].classList.add('hide');
            footerdivs[3].classList.add('hide');
            navlinks[9].classList.add('hide');
           
           
            break;
    }
}else{
    window.location.href = 'login.html';
}


logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = 'login.html';
});}