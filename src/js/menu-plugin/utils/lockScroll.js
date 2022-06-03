const lockScroll = () => {
    const $body = document.querySelector('body');
    let scrollPosition = 0;
    let disabled = false;
  
    return {
      disable(callback) {
        if (!disabled) {
          disabled = !disabled;
          scrollPosition = window.pageYOffset;
          $body.style.overflow = 'hidden';
          $body.style.position = 'fixed';
          $body.style.top = `-${scrollPosition}px`;
          $body.style.width = '100%';
  
          if (callback && typeof callback === 'function') {
            callback(scrollPosition);
          }
        }
      },
      enable(callback) {
        if (disabled) {
          disabled = !disabled;
          $body.style.removeProperty('overflow');
          $body.style.removeProperty('position');
          $body.style.removeProperty('top');
          $body.style.removeProperty('width');
          window.scrollTo({
            top: scrollPosition,
            behavior: 'instant',
          });
          if (callback && typeof callback === 'function') {
            callback();
          }
        }
      },
    };
  };
  
export default lockScroll;
  