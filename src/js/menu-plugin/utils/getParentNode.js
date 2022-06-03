const getParentNode = (startPoint, targetSelector) => {

  const getParent = (node) => {
    const parent = node.parentElement;

    if (parent) {
        return parent.classList.contains(targetSelector) ? parent : getParent(parent);
    } else {
        return null;
    }
  };

  return getParent(startPoint);
}

export default getParentNode;