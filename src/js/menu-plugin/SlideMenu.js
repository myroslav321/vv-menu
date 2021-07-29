"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const dom_1 = require("./utils/dom");

let Direction;
(function (Direction) {
  Direction[Direction["Backward"] = -1] = "Backward";
  Direction[Direction["Forward"] = 1] = "Forward";
})(Direction || (Direction = {}));

let MenuPosition;
(function (MenuPosition) {
  MenuPosition["Left"] = "left";
  MenuPosition["Right"] = "right";
})(MenuPosition || (MenuPosition = {}));

var Action;
(function (Action) {
  Action["Back"] = "back";
  Action["Close"] = "close";
  Action["Forward"] = "forward";
  Action["Navigate"] = "navigate";
  Action["Open"] = "open";
})(Action || (Action = {}));
var DEFAULT_OPTIONS = {
  backLinkAfter: '',
  backLinkBefore: '',
  keyClose: '',
  keyOpen: '',
  position: 'right',
  showBackLink: true,
  submenuLinkAfter: '',
  submenuLinkBefore: '',
};
var SlideMenu = /** @class */ (function () {
  function SlideMenu(elem, options) {
    this.level = 0;
    this.isOpen = false;
    this.isAnimating = false;
    this.lastAction = null;
    if (elem === null) {
      throw new Error('Argument `elem` must be a valid HTML node');
    }
    // (Create a new object for every instance)
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.menuElem = elem;
    // Add wrapper (for the slide effect)
    this.wrapperElem = document.createElement('div');
    this.wrapperElem.classList.add(SlideMenu.CLASS_NAMES.wrapper);
    var firstUl = this.menuElem.querySelector('ul');
    if (firstUl) {
      dom_1.wrapElement(firstUl, this.wrapperElem);
    }
    this.initMenu();
    this.initSubmenus();
    this.initEventHandlers();
    // Save this instance in menu DOM node
    this.menuElem._slideMenu = this;
  }
  /**
   * Toggle the menu
   */
  SlideMenu.prototype.toggle = function (show, animate) {
    if (animate === void 0) { animate = true; }
    var offset;
    if (show === undefined) {
      return this.isOpen ? this.close(animate) : this.open(animate);
    }
    else if (show) {
      offset = 0;
    }
    else {
      offset = this.options.position === MenuPosition.Left ? '-100%' : '100%';
    }
    this.isOpen = show;
    if (animate) {
      this.moveSlider(this.menuElem, offset);
    }
    else {
      var action = this.moveSlider.bind(this, this.menuElem, offset);
      this.runWithoutAnimation(action);
    }
  };
  /**
   * Open the menu
   */
  SlideMenu.prototype.open = function (animate) {
    if (animate === void 0) { animate = true; }
    this.triggerEvent(Action.Open);
    this.toggle(true, animate);
  };
  /**
   * Close the menu
   */
  SlideMenu.prototype.close = function (animate) {
    if (animate === void 0) { animate = true; }
    this.triggerEvent(Action.Close);
    this.toggle(false, animate);
  };
  /**
   * Navigate one menu hierarchy back if possible
   */
  SlideMenu.prototype.back = function () {
    // Event is triggered in navigate()
    this.navigate(Direction.Backward);
  };
  /**
   * Destroy the SlideMenu
   */
  SlideMenu.prototype.destroy = function () {
    var _a = this.options, submenuLinkAfter = _a.submenuLinkAfter, submenuLinkBefore = _a.submenuLinkBefore, showBackLink = _a.showBackLink;
    // Remove link decorators
    if (submenuLinkAfter || submenuLinkBefore) {
      var linkDecorators = Array.from(this.wrapperElem.querySelectorAll("." + SlideMenu.CLASS_NAMES.decorator));
      linkDecorators.forEach(function (decorator) {
        if (decorator.parentElement) {
          decorator.parentElement.removeChild(decorator);
        }
      });
    }
    // Remove back links
    if (showBackLink) {
      var backLinks = Array.from(this.wrapperElem.querySelectorAll("." + SlideMenu.CLASS_NAMES.control));
      backLinks.forEach(function (backlink) {
        var parentLi = dom_1.parentsOne(backlink, 'li');
        if (parentLi && parentLi.parentElement) {
          parentLi.parentElement.removeChild(parentLi);
        }
      });
    }
    // Remove the wrapper element
    dom_1.unwrapElement(this.wrapperElem);
    // Remove inline styles
    this.menuElem.style.cssText = '';
    this.menuElem.querySelectorAll('ul').forEach(function (ul) { return (ul.style.cssText = ''); });
    // Delete the reference to *this* instance
    // NOTE: Garbage collection is not possible, as long as other references to this object exist
    delete this.menuElem._slideMenu;
  };
  /**
   * Navigate to a specific link on any level (useful to open the correct hierarchy directly)
   */
  SlideMenu.prototype.navigateTo = function (target) {
    this.triggerEvent(Action.Navigate);
    if (typeof target === 'string') {
      var elem = document.querySelector(target);
      if (elem instanceof HTMLElement) {
        target = elem;
      }
      else {
        throw new Error('Invalid parameter `target`. A valid query selector is required.');
      }
    }
    // Hide other active menus
    var activeMenus = Array.from(this.wrapperElem.querySelectorAll("." + SlideMenu.CLASS_NAMES.active));
    activeMenus.forEach(function (activeElem) {
      activeElem.style.display = 'none';
      activeElem.classList.remove(SlideMenu.CLASS_NAMES.active);
    });
    var parentUl = dom_1.parents(target, 'ul');
    var level = parentUl.length - 1;
    // Trigger the animation only if currently on different level
    if (level >= 0 && level !== this.level) {
      this.level = level;
      this.moveSlider(this.wrapperElem, -this.level * 100);
    }
    parentUl.forEach(function (ul) {
      ul.style.display = 'block';
      ul.classList.add(SlideMenu.CLASS_NAMES.active);
    });
  };
  /**
   * Set up all event handlers
   */
  SlideMenu.prototype.initEventHandlers = function () {
    var _this = this;
    // Ordinary links inside the menu
    var anchors = Array.from(this.menuElem.querySelectorAll('a'));
    anchors.forEach(function (anchor) {
      return anchor.addEventListener('click', function (event) {
        var target = event.target;
        var targetAnchor = target.matches('a') ? target : dom_1.parentsOne(target, 'a');
        if (targetAnchor) {
          _this.navigate(Direction.Forward, targetAnchor);
        }
      });
    });
    // Handler for end of CSS transition
    this.menuElem.addEventListener('transitionend', this.onTransitionEnd.bind(this));
    this.wrapperElem.addEventListener('transitionend', this.onTransitionEnd.bind(this));
    this.initKeybindings();
    this.initSubmenuVisibility();
  };
  SlideMenu.prototype.onTransitionEnd = function (event) {
    // Ensure the transitionEnd event was fired by the correct element
    // (elements inside the menu might use CSS transitions as well)
    if (event.target !== this.menuElem && event.target !== this.wrapperElem) {
      return;
    }
    this.isAnimating = false;
    if (this.lastAction) {
      this.triggerEvent(this.lastAction, true);
      this.lastAction = null;
    }
  };
  SlideMenu.prototype.initKeybindings = function () {
    var _this = this;
    document.addEventListener('keydown', function (event) {
      switch (event.key) {
        case _this.options.keyClose:
          _this.close();
          break;
        case _this.options.keyOpen:
          _this.open();
          break;
        default:
          return;
      }
      event.preventDefault();
    });
  };
  SlideMenu.prototype.initSubmenuVisibility = function () {
    var _this = this;
    // Hide the lastly shown menu when navigating back (important for navigateTo)
    this.menuElem.addEventListener('sm.back-after', function () {
      var lastActiveSelector = ("." + SlideMenu.CLASS_NAMES.active + " ").repeat(_this.level + 1);
      var lastActiveUl = _this.menuElem.querySelector("ul " + lastActiveSelector);
      if (lastActiveUl) {
        lastActiveUl.style.display = 'none';
        lastActiveUl.classList.remove(SlideMenu.CLASS_NAMES.active);
      }
    });
  };
  /**
   * Trigger a custom event to support callbacks
   */
  SlideMenu.prototype.triggerEvent = function (action, afterAnimation) {
    if (afterAnimation === void 0) { afterAnimation = false; }
    this.lastAction = action;
    var name = "sm." + action + (afterAnimation ? '-after' : '');
    var event = new CustomEvent(name);
    this.menuElem.dispatchEvent(event);
  };
  /**
   * Navigate the menu - that is slide it one step left or right
   */
  SlideMenu.prototype.navigate = function (dir, anchor) {
    if (dir === void 0) { dir = Direction.Forward; }
    if (this.isAnimating || (dir === Direction.Backward && this.level === 0)) {
      return;
    }
    var offset = (this.level + dir) * -100;
    if (anchor && anchor.parentElement !== null && dir === Direction.Forward) {
      var ul = anchor.parentElement.querySelector('ul');
      if (!ul) {
        return;
      }
      ul.classList.add(SlideMenu.CLASS_NAMES.active);
      ul.style.display = 'block';
    }
    var action = dir === Direction.Forward ? Action.Forward : Action.Back;
    this.triggerEvent(action);
    this.level = this.level + dir;
    this.moveSlider(this.wrapperElem, offset);
  };
  /**
   * Start the slide animation (the CSS transition)
   */
  SlideMenu.prototype.moveSlider = function (elem, offset) {
    // Add percentage sign
    if (!offset.toString().includes('%')) {
      offset += '%';
    }
    elem.style.transform = "translateX(" + offset + ")";
    this.isAnimating = true;
  };
  /**
   * Initialize the menu
   */
  SlideMenu.prototype.initMenu = function () {
    var _this = this;
    this.runWithoutAnimation(function () {
      switch (_this.options.position) {
        case MenuPosition.Left:
          Object.assign(_this.menuElem.style, {
            left: 0,
            right: 'auto',
            transform: 'translateX(-100%)',
          });
          break;
        default:
          Object.assign(_this.menuElem.style, {
            left: 'auto',
            right: 0,
          });
          break;
      }
      _this.menuElem.style.display = 'block';
    });
  };
  /**
   * Pause the CSS transitions, to apply CSS changes directly without an animation
   */
  SlideMenu.prototype.runWithoutAnimation = function (action) {
    var transitionElems = [this.menuElem, this.wrapperElem];
    transitionElems.forEach(function (elem) { return (elem.style.transition = 'none'); });
    action();
    this.menuElem.offsetHeight; // Trigger a reflow, flushing the CSS changes
    transitionElems.forEach(function (elem) { return elem.style.removeProperty('transition'); });
    this.isAnimating = false;
  };
  /**
   * Enhance the markup of menu items which contain a submenu
   */
  SlideMenu.prototype.initSubmenus = function () {
    var _this = this;
    this.menuElem.querySelectorAll('a').forEach(function (anchor) {
      if (anchor.parentElement === null) {
        return;
      }
      var submenu = anchor.parentElement.querySelector('ul');
      if (!submenu) {
        return;
      }
      // Prevent default behaviour (use link just to navigate)
      anchor.addEventListener('click', function (event) {
        event.preventDefault();
      });
      var anchorText = anchor.textContent;
      _this.addLinkDecorators(anchor);
      // Add back links
      if (_this.options.showBackLink) {
        var _a = _this.options, backLinkBefore = _a.backLinkBefore, backLinkAfter = _a.backLinkAfter;
        var backLink = document.createElement('a');
        backLink.innerHTML = backLinkBefore + anchorText + backLinkAfter;
        backLink.classList.add(SlideMenu.CLASS_NAMES.backlink, SlideMenu.CLASS_NAMES.control);
        backLink.setAttribute('data-action', Action.Back);
        var backLinkLi = document.createElement('li');
        backLinkLi.appendChild(backLink);
        submenu.insertBefore(backLinkLi, submenu.firstChild);
      }
    });
  };
  // Add `before` and `after` text
  SlideMenu.prototype.addLinkDecorators = function (anchor) {
    var _a = this.options, submenuLinkBefore = _a.submenuLinkBefore, submenuLinkAfter = _a.submenuLinkAfter;
    if (submenuLinkBefore) {
      var linkBeforeElem = document.createElement('span');
      linkBeforeElem.classList.add(SlideMenu.CLASS_NAMES.decorator);
      linkBeforeElem.innerHTML = submenuLinkBefore;
      anchor.insertBefore(linkBeforeElem, anchor.firstChild);
    }
    if (submenuLinkAfter) {
      var linkAfterElem = document.createElement('span');
      linkAfterElem.classList.add(SlideMenu.CLASS_NAMES.decorator);
      linkAfterElem.innerHTML = submenuLinkAfter;
      anchor.appendChild(linkAfterElem);
    }
    return anchor;
  };
  SlideMenu.NAMESPACE = 'slide-menu';
  SlideMenu.CLASS_NAMES = {
    active: SlideMenu.NAMESPACE + "__submenu--active",
    backlink: SlideMenu.NAMESPACE + "__backlink",
    control: SlideMenu.NAMESPACE + "__control",
    decorator: SlideMenu.NAMESPACE + "__decorator",
    wrapper: SlideMenu.NAMESPACE + "__slider",
  };
  return SlideMenu;
}());
// Link control buttons with the API
document.addEventListener('click', function (event) {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  var btn = event.target.className.includes(SlideMenu.CLASS_NAMES.control)
      ? event.target
      : dom_1.parentsOne(event.target, "." + SlideMenu.CLASS_NAMES.control);
  if (!btn || !btn.className.includes(SlideMenu.CLASS_NAMES.control)) {
    return;
  }
  var target = btn.getAttribute('data-target');
  var menu = !target || target === 'this'
      ? dom_1.parentsOne(btn, "." + SlideMenu.NAMESPACE)
      : document.getElementById(target); // assumes #id
  if (!menu) {
    throw new Error("Unable to find menu " + target);
  }
  var instance = menu._slideMenu;
  var method = btn.getAttribute('data-action');
  var arg = btn.getAttribute('data-arg');
  // @ts-ignore
  if (instance && method && typeof instance[method] === 'function') {
    // @ts-ignore
    arg ? instance[method](arg) : instance[method]();
  }
});
// Expose SlideMenu to the global namespace
// @ts-ignore
window.SlideMenu = SlideMenu;
