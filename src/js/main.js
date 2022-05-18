import './menu-plugin/SlideMenu.js';

document.addEventListener("DOMContentLoaded", function () {
  const menuElement = document.getElementById('slide-menu');
  const menu = new SlideMenu(menuElement, {
    'slideContent': 'main-container',
    'saveMenuState' : false,
    'backLinkBefore': 'zurück',
  });
});

