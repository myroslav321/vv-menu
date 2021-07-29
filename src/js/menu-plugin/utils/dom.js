"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentsOne = exports.parents = exports.unwrapElement = exports.wrapElement = void 0;
function wrapElement(elem, wrapper) {
  if (elem.parentElement === null) {
    throw Error('`elem` has no parentElement');
  }
  elem.parentElement.insertBefore(wrapper, elem);
  wrapper.appendChild(elem);
  return elem;
}
exports.wrapElement = wrapElement;
function unwrapElement(elem) {
  let parent = elem.parentElement;
  if (parent === null) {
    throw Error('`elem` has no parentElement');
  }
  while (elem.firstChild) {
    parent.insertBefore(elem.firstChild, elem);
  }
  parent.removeChild(elem);
}
exports.unwrapElement = unwrapElement;
function parents(elem, selector, limit) {
  let matched = [];
  while (elem &&
  elem.parentElement !== null &&
  (limit === undefined ? true : matched.length < limit)) {
    if (elem instanceof HTMLElement && elem.matches(selector)) {
      matched.push(elem);
    }
    elem = elem.parentElement;
  }
  return matched;
}
exports.parents = parents;
function parentsOne(elem, selector) {
  const matches = parents(elem, selector, 1);
  return matches.length ? matches[0] : null;
}
exports.parentsOne = parentsOne;
