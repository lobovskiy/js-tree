const nodeClass = 'branch__node',
      nodeLevelModificatorClass = `${nodeClass}_level`,
      nodeNameClass = `${nodeClass}-name`,
      markerClass = `${nodeClass}-marker`,
      markerModificatorClass = `${markerClass}_expanded`,
      trailClass = `${nodeClass}-trail`,
      trailLevelModificatorClass = `${trailClass}_level`;

function createBranch(arr) {
  if (arr?.length) {
    const branch = document.createElement('ul');
    branch.classList.add('branch');

    const nodes = arr.map(createNode);
    branch.append(...nodes);

    return branch;
  }
}

function createName(item) {
  if (item.name) {
    const nameDiv = document.createElement('div');
    nameDiv.append(item.name);
    nameDiv.classList.add(nodeNameClass);
    return nameDiv;
  }
}

function createMarker() {
  const markerDiv = document.createElement('div');
  markerDiv.classList.add(markerClass);
  return markerDiv;
}

function getTrails(item) {
  if (item?.level) {
    const trails = [];

    for (let i = 1; i <= item.level; i++) {
      const trailDiv = document.createElement('div');
      trailDiv.classList.add(trailClass);
      addTrailModificator(trailDiv, i);
      trails.push(trailDiv);
    }

    return trails;
  }
}

function addTrailModificator(trail, level) {
  trail.classList.add(trailLevelModificatorClass + level);
}

function addTrails(node, trails) {
  if (Array.isArray(trails)) {
    trails.forEach(trail => node.append(trail));
  }
}

function setNodeLevelClass(item, node) {
  if (item?.level) {
    node.classList.add(nodeLevelModificatorClass + item.level);
  }
}

function createNode(item) {
  if (item) {
    const node = document.createElement('li');
    node.classList.add(nodeClass);

    // set class of level
    setNodeLevelClass(item, node);

    // add trails
    const trails = getTrails(item);
    addTrails(node, trails);

    // add marker and name
    const marker = createMarker();
    const name = createName(item);
    marker && node.append(marker);
    name && node.append(name);

    // add branch with its class
    const childBranch = createBranch(item.child);
    if (childBranch) {
      node.append(childBranch);
      marker && marker.classList.add(markerModificatorClass);
    }
    
    return node;
  }
}

function renderTree(tree, container) {
  container.textContent = '';
  container.append(tree);
}

export { createBranch, renderTree };