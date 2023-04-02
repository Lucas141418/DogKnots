let subMenu = document.querySelector('#subMenu');
let userPicture = document.querySelector('#userPic');

const toggleMenu = () => {
    subMenu.classList.toggle("open-menu");
}

userPicture.addEventListener('click', toggleMenu);
