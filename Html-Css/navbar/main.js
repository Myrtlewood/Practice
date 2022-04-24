const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_menu');
const icons = document.querySelector('.navbar_icons');

toggleBtn.addEventListener('click', () => {
    console.log('toggleBtn');
    menu.classList.toggle('active');
    icons.classList.toggle('active');
});