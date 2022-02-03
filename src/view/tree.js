function createBranch(arr) {
  if (arr?.length) {
    const branch = document.createElement('ul');
    branch.classList.add('branch');

    const nodes = arr.map(createNode);
    branch.append(...nodes);

    return branch;
  }
}

function addName(item, className) {
  if (item.name) {
    const nameDiv = document.createElement('div');
    nameDiv.append(item.name);
    nameDiv.classList.add(className);
    return nameDiv;
  }
}

function addMarker() {
  const markerDiv = document.createElement('div');
  markerDiv.classList.add('branch__node-marker');     // задать класс как переменную
  return markerDiv;
}

function getTrails(item) {
  if (item?.level) {
    const trails = [];

    for (let i = 1; i <= item.level; i++) {
      const trailDiv = document.createElement('div');
      trailDiv.classList.add('branch__node-trail');   // задать класс как переменную
      addTrailModificator(trailDiv, i);
      trails.push(trailDiv);
    }

    return trails;
  }
}

function addTrailModificator(trail, level) {
  trail.classList.add(`branch__node-trail_level${level}`);    // задать класс как переменную
}

function addTrails(node, trails) {
  if (Array.isArray(trails)) {
    trails.forEach(trail => node.append(trail));
  }
}

function setNodeLevel(item, node) {
  if (item?.level) {
    node.classList.add(`branch__node_level${item.level}`);      // задать класс как переменную
  }
}

function createNode(item) {
  if (item) {
    const node = document.createElement('li');
    node.classList.add('branch__node');   // задать класс как переменную

    // add trails
    const trails = getTrails(item);
    addTrails(node, trails);

    // add level class
    setNodeLevel(item, node);

    // add marker and name
    const marker = addMarker();
    const name = addName(item, 'branch__node-name');      // задать класс как переменную
    marker && node.append(marker);
    name && node.append(name);

    // add branch with its class
    const childBranch = createBranch(item.child);
    if (childBranch) {
      node.append(childBranch);
      marker.classList.add('branch__node-marker_branch');
    }
    
    return node;
  }
}

function renderTree(tree, container) {
  container.textContent = '';
  container.append(tree);
}

export { createBranch, renderTree };