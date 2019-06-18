// tree find

function getArrayPath(root, pathAry) {
  if (pathAry.length === 0) {
    return root;
  }
  const [key, ...rest] = pathAry;
  const node = root.find(({id}) => id === key);
  if (node && node.children.length > 0) {
    return getArrayPath(node.children, rest);
  } else if (node) {
    return node;
  } else {
    return null;
  }
}

function getStringPath(root, pathStr) {
  return getArrayPath(root, pathStr.split('.'))
}
