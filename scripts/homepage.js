window.onload = function(){
const assetsCard = document.querySelector('#assetsCard');
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

if(connected){

    switch(role){
        case 'admin':
             // nav 
             navlinks[1].classList.add('hide');
             navlinks[9].classList.add('hide');
             //Main 
             mainCards[2].classList.add('hide');
             mainCardsLinks[3].classList.add('hide');
             //footer
             footerdivs[5].classList.add('hide');
            

            break;
        case 'adminProv':
            assetsCard.classList.add('hide');
            break;
        case "adminEnc":
           


            break;
    }
}else{
    window.location.href = 'login.html';
}


logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = 'login.html';
});}