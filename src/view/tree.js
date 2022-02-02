function createBranch(arr) {
  if (arr?.length) {
    const branch = document.createElement('ul');
    branch.classList.add('branch');

    const nodes = arr.map(createNode);

    branch.append(...nodes);

    const branchWithTails = addTails(branch);

    return branchWithTails;
  }
}

function createNode(item) {
  if (item) {
    const node = document.createElement('li');
    node.classList.add('branch__node');   // задать класс как переменную
    
    const divName = document.createElement('div');
    divName.classList.add('branch__node-name');   // задать класс как переменную

    // const divMarker = document.createElement('div');
    // divMarker.classList.add('branch__node-marker');

    // if (item.level == 1) {
    //   const divTrailLevel1 = document.createElement('div');
    //   divTrailLevel1.classList.add('branch__node-trail');
    //   node.append(divTrailLevel1);
    // }

    // if (item.level == 2) {
    //   const divTrailLevel1 = document.createElement('div');
    //   const divTrailLevel2 = document.createElement('div');
    //   divTrailLevel1.classList.add('branch__node-trail', 'branch__node-trail_level2');
    //   divTrailLevel2.classList.add('branch__node-trail');
    //   node.append(divTrailLevel1);
    //   node.append(divTrailLevel2);
    // }

    

    // if (item.level == 3) {
    //   const divTrailLevel1 = document.createElement('div');
    //   const divTrailLevel2 = document.createElement('div');
    //   const divTrailLevel3 = document.createElement('div');
    //   divTrailLevel1.classList.add('branch__node-trail', 'branch__node-trail_level3');
    //   divTrailLevel2.classList.add('branch__node-trail', 'branch__node-trail_level2');
    //   divTrailLevel3.classList.add('branch__node-trail');
    //   node.append(divTrailLevel1);
    //   node.append(divTrailLevel2);
    //   node.append(divTrailLevel3);
    // }

    item.name && divName.append(item.name);
    node.append(divName);

    const childBranch = createBranch(item.child);
    childBranch && node.append(childBranch);
    
    return node;
  }
}

function addTails(tree) {
  if (tree?.childNodes?.length) {
    
    console.dir(tree.childNodes);

    const addExpandArrows = treeNodes => {
      treeNodes.forEach(node => {
          const divMarker = document.createElement('div');
          divMarker.classList.add('branch__node-marker');     // задать класс как переменную
          node.childElementCount > 1 && divMarker.classList.add('branch__node-marker_expanded');
          node.prepend(divMarker);
      });

      return treeNodes;
    }

    addExpandArrows(tree.childNodes);
    return tree;
  }
}

function renderTree(tree, container) {
  container.textContent = '';
  container.append(tree);
}

export { createBranch, renderTree };