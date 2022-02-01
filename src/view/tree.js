function createBranch(arr) {
  if (arr?.length) {
    const branch = document.createElement('ul');
    const nodes = arr.map(createNode);

    branch.append(...nodes);

    return branch;
  }
}

function createNode(item) {
  if (item) {
    const node = document.createElement('li');
    item.name && node.append(item.name);

    const childBranch = createBranch(item.child);
    childBranch && node.append(childBranch);
    
    return node;
  }
}

export { createBranch };