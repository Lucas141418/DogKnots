let subMenu = document.querySelector('#subMenu');
let userPicture = document.querySelector('#userPic');

// charge user name
const userNameL = document.querySelector("#userName")
let userNameSession = sessionStorage.getItem("name");
console.log(userNameSession)

userNameL.textContent = userNameSession


// charge user picture
pictureSession = sessionStorage.getItem("photo");
console.log(pictureSession)




const toggleMenu = () => {
    subMenu.classList.toggle("open-menu");
}



userPicture.addEventListener('click', toggleMenu);
