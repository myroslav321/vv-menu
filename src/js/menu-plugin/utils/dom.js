export const wrapElement = (elem, wrapper) => {
  if (elem.parentElement === null) {
    throw Error('`elem` has no parentElement');
  }
  elem.parentElement.insertBefore(wrapper, elem);
  wrapper.appendChild(elem);
  return elem;
}


export const unwrapElement = (elem) => {
  let parent = elem.parentElement;
  if (parent === null) {
    throw Error('`elem` has no parentElement');
  }
  while (elem.firstChild) {
    parent.insertBefore(elem.firstChild, elem);
  }
  parent.removeChild(elem);
}

export const parents = (elem, selector, limit) => {
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

export const parentsOne = (elem, selector) => {
  const matches = parents(elem, selector, 1);
  return matches.length ? matches[0] : null;
}
