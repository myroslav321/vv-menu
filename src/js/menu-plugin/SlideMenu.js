import lockScroll from "./utils/lockScroll";
import getParentNode from "./utils/getParentNode";
import "regenerator-runtime/runtime.js";
import { toggle } from "slide-element";

const Navigation = () => {
  const header = document.querySelector('.header');
  const wrp = document.querySelector('.offset-menu__wrp');
  const btn = document.querySelector('.offset-menu__control');
  const close = document.querySelector('.offset-menu__close-button');
  const links = document.querySelectorAll('.offset-menu__link ');
  let isLastVisible = false;
  let isOpen = false;
  let depth = 0;

  const scroll = lockScroll();

  const open = () => {
    isOpen = !isOpen;
    isOpen ? scroll.disable() : scroll.enable();
    header.classList.toggle('_nav-open', isOpen);
    document.body.classList.add('_nav-transition');
  }

  const clearClasses = () => {
    [...document.querySelectorAll('._sub-2__visible')].forEach(item => {
      item.classList.remove('_sub-2__visible');
    });
    depth = 0;
  };

  const controlHandler = () => {
    btn.addEventListener('click', open);
    close.addEventListener('click', () => {
      isOpen = !isOpen;
      isLastVisible = !isLastVisible
      scroll.enable()
      header.classList.remove('_nav-open');
      // clearClasses();
      // clearLastLevel();
    })
  };

  const handleLastLevel = (html) => {
    const menu = document.createElement('div');
    const classList = menu.classList;
  
    menu.classList.add('offset-menu__last-level');
    isLastVisible && menu.classList.add('_show');
    menu.appendChild(html);
    wrp.appendChild(menu);

    const timeout = setTimeout(() => {
      if (!isLastVisible) {
        isLastVisible = !isLastVisible
        classList.add('_show');
      }
      clearTimeout(timeout)
    }, 14);
  };

  const clearLastLevel = () => {
    const lastLevel = document.querySelector('._sub-3__visible');
    if (lastLevel) {
      lastLevel.classList.remove('_sub-3__visible');
    }
  }

  const submenuHandler = () => {
    document.addEventListener('click', (e) => {
  
      const ww = window.innerWidth;
      if (e.target.dataset.show === 'sub') {
        depth = 2;
        const isLastLevel = e.target.nextElementSibling.classList.contains('_level-3');

        if (ww < 992) {
          e.target.classList.add('_sub-2__visible');
        } else if (!isLastLevel) {
          e.target.classList.add('_sub-2__visible');
        }

        if (isLastLevel) {
          ww < 992 && toggle(e.target.nextElementSibling);
          [...document.querySelectorAll('._sub-3__visible')].forEach(item => {
            item.classList.remove('_sub-3__visible');
          })
          e.target.classList.toggle('_sub-3__visible');
        }

        e.preventDefault();
      }

      if (e.target.dataset.action === 'back') {
        const parent = getParentNode(e.target, 'offset-menu__list-item');
        parent.querySelector('._sub-2__visible').classList.remove('_sub-2__visible');
        isLastVisible = !isLastVisible
        depth = 1;
        clearLastLevel();
      }

      if (e.target.dataset.target)  {
        e.preventDefault();
        document.querySelector(`[data-ref='${e.target.dataset.target}']`).classList.add('_sub-2__visible') ;
        depth = 2;
        open();
      }

      console.log(depth)
      header.classList.toggle('_sub-open', depth > 1);
    })
  };

  const init = () => {
    controlHandler();
    submenuHandler();
  };

  return {
    init
  }
};

export default Navigation;