const branchClass = 'branch';
const nodeClass = 'branch__node';
const nodeLevelModificatorClass = 'branch__node_level';
const nodeNameClass = 'branch__node-name';
const markerClass = 'branch__node-marker';
const markerModificatorClass = 'branch__node-marker_expanded';
const trailClass = 'branch__node-trail';
const trailLevelModificatorClass = 'branch__node-trail_level';

function createBranch(arr) {
  if (arr?.length) {
    const branch = document.createElement('ul');
    branch.classList.add(branchClass);

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

const changeParsingLevel = container => action => {
  const parsingStatusDiv = document.createElement('div');
  const parsedLevelsNumber = container.children.length;
  parsingStatusDiv.innerHTML = `Parsing level ${parsedLevelsNumber}... <span></span>`;
  switch (action) {
    case 'increase':
      container.append(parsingStatusDiv);
      break;
    case 'decrease':
      container?.lastChild && container.lastChild.remove();
      break;
    default:
      break;
  }
}

let itemParsedByLevels = [];

const countItemsByLevel = container => level => {
  !itemParsedByLevels[level] && (itemParsedByLevels[level] = 0);
  itemParsedByLevels[level]++;
  
  container.children[level].querySelector('span').textContent = `Parsed ${itemParsedByLevels[level]} items.`;
}

function resetParsedItemsCounter() {
  itemParsedByLevels = [];
}

export { createBranch, renderTree, changeParsingLevel, countItemsByLevel, resetParsedItemsCounter };