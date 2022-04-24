// const menu__item = document.querySelectorAll('.menu__item');

// menu__item.forEach(menu__item => {
//   menu__item.addEventListener('click', function () {
//     menu__item.classList.toggle('hidden');
//     menu__item.classList.toggle('visible');
//     menu__item.classList.add('active');
//   });
// });

const menu = document.querySelector('.menu');

menu.addEventListener('click', e => {
  if (!e.target.closest('.dd-menu')) {
    const menu__item = e.target.closest('.menu__item');
    if (menu__item.querySelector('.dd-menu')) {
      const dd_menu = menu__item.querySelector('.dd-menu');
      dd_menu.classList.toggle('active');
      console.log(dd_menu);
    }
  }

  // const node = menu__item.childNodes;
  // console.log(node);
  // node.forEach(function (e) {
  //   console.log(e);
  //   if (e.classList.contains('.dd-menu')) {
  //     e.classList.toggle('active');
  //     console.log(e);
  //   }
});
