(()=>{var t={655:(t,e,r)=>{function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=function(t){"use strict";var e,r=Object.prototype,o=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),a=new A(n||[]);return i._invoke=function(t,e,r){var n=h;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return R()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=k(a,r);if(u){if(u===v)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=f(t,e,r);if("normal"===c.type){if(n=r.done?y:p,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=y,r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var h="suspendedStart",p="suspendedYield",d="executing",y="completed",v={};function m(){}function g(){}function b(){}var w={};s(w,a,(function(){return this}));var _=Object.getPrototypeOf,x=_&&_(_(P([])));x&&x!==r&&o.call(x,a)&&(w=x);var L=b.prototype=m.prototype=Object.create(w);function E(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function r(i,a,u,c){var s=f(t[i],t,a);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"===n(h)&&o.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,u,c)}),(function(t){r("throw",t,u,c)})):e.resolve(h).then((function(t){l.value=t,u(l)}),(function(t){return r("throw",t,u,c)}))}c(s.arg)}var i;this._invoke=function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=f(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function P(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function r(){for(;++n<t.length;)if(o.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:R}}function R(){return{value:e,done:!0}}return g.prototype=b,s(L,"constructor",b),s(b,"constructor",g),g.displayName=s(b,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,s(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},E(S.prototype),s(S.prototype,u,(function(){return this})),t.AsyncIterator=S,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new S(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(L),s(L,c,"Generator"),s(L,a,(function(){return this})),s(L,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=P,A.prototype={constructor:A,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return u.type="throw",u.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=o.call(a,"catchLoc"),s=o.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}("object"===n(t=r.nmd(t))?t.exports:{});try{regeneratorRuntime=o}catch(t){"object"===("undefined"==typeof globalThis?"undefined":n(globalThis))?globalThis.regeneratorRuntime=o:Function("r","regeneratorRuntime = r")(o)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n](i,i.exports,r),i.loaded=!0,i.exports}r.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{"use strict";function t(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function e(e){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=e.apply(r,n);function u(e){t(a,o,i,u,c,"next",e)}function c(e){t(a,o,i,u,c,"throw",e)}u(void 0)}))}}r(655);var n=function(t){return new Promise((function(e){requestAnimationFrame((function(){requestAnimationFrame((function(){t(e)}))}))}))},o={easing:"ease",duration:250,fill:"backwards",display:"block"},i=function(t,r){var i=function(e){return t.style.display=e},a=function(){return t.clientHeight+"px"},u=function(e){return t.style.overflow=e?"auto":""},c=function(){return t.getAnimations()},s=Object.assign({},o,r),l=s.display,f=function(e,r){var n;delete s.display;var o=a(),i=[o,r].map((function(t){return{height:t,paddingTop:"0px",paddingBottom:"0px"}})),u=window.getComputedStyle(t),c=u.paddingTop,l=u.paddingBottom;i[0].paddingTop=c,i[0].paddingBottom=l,e&&(i[0].height=o,i.reverse()),(null==(n=window.matchMedia("(prefers-reduced-motion: reduce)"))?void 0:n.matches)&&(s.duration=0);var f=t.animate(i,s);return f.id=(+e).toString(),f},h=function(){var t=e(regeneratorRuntime.mark((function t(r){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=c().map((function(t){return t.finish()})),t.next=3,n(function(){var t=e(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=r?a():"0px",r&&i(l),u(!0),t.next=5,f(r,n).finished;case 5:u(!1),r||i("none"),e();case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:return t.abrupt("return",o.length?null:r);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=e(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",h(!1));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),d=function(){var t=e(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",h(!0));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{up:p,down:d,toggle:function(){var r=e(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=null==(r=c()[0])?void 0:r.id,o=n?"1"===n:t.offsetHeight,e.abrupt("return",(o?p:d)());case 3:case"end":return e.stop()}}),e)})));return function(){return r.apply(this,arguments)}}()}};function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}const u=function(){var t,e,r,n=document.querySelector(".header"),o=(document.querySelector(".offset-menu__wrp"),document.querySelector(".offset-menu__control")),u=document.querySelector(".offset-menu__close-button"),c=(document.querySelectorAll(".offset-menu__link "),!1),s=!1,l=0,f=(t=document.querySelector("body"),e=0,r=!1,{disable:function(n){r||(r=!r,e=window.pageYOffset,t.style.overflow="hidden",t.style.position="fixed",t.style.top="-".concat(e,"px"),t.style.width="100%",n&&"function"==typeof n&&n(e))},enable:function(n){r&&(r=!r,t.style.removeProperty("overflow"),t.style.removeProperty("position"),t.style.removeProperty("top"),t.style.removeProperty("width"),window.scrollTo({top:e,behavior:"instant"}),n&&"function"==typeof n&&n())}}),h=function(){(s=!s)?f.disable():f.enable(),n.classList.toggle("_nav-open",s),document.body.classList.add("_nav-transition")},p=function(){document.addEventListener("click",(function(t){var e,r,o,u,s=window.innerWidth;if("sub"===t.target.dataset.show){l=2;var f=t.target.nextElementSibling.classList.contains("_level-3");s<992?t.target.classList.add("_sub-2__visible"):f||t.target.classList.add("_sub-2__visible"),f&&(s<992&&function(t){i(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).toggle()}(t.target.nextElementSibling),(r=document.querySelectorAll("._sub-3__visible"),function(t){if(Array.isArray(t))return a(t)}(r)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(r)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(t,e):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).forEach((function(t){t.classList.remove("_sub-3__visible")})),t.target.classList.toggle("_sub-3__visible")),t.preventDefault()}"back"===t.target.dataset.action&&((o=t.target,u="offset-menu__list-item",function t(e){var r=e.parentElement;return r?r.classList.contains(u)?r:t(r):null}(o)).querySelector("._sub-2__visible").classList.remove("_sub-2__visible"),c=!c,l=1,(e=document.querySelector("._sub-3__visible"))&&e.classList.remove("_sub-3__visible")),t.target.dataset.target&&(t.preventDefault(),document.querySelector("[data-ref='".concat(t.target.dataset.target,"']")).classList.add("_sub-2__visible"),l=2,h()),console.log(l),n.classList.toggle("_sub-open",l>1)}))};return{init:function(){o.addEventListener("click",h),u.addEventListener("click",(function(){s=!s,c=!c,f.enable(),n.classList.remove("_nav-open")})),p()}}};document.addEventListener("DOMContentLoaded",(function(){(new u).init()}))})()})();
//# sourceMappingURL=bundle-main.js.map