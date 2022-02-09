import { parsingLevelIncreased, parsingLevelDecreased } from "../ctrl/events.js";

const getChildrenFromTreeById = treeData => (id, level) => {
  let childrenArr = [];
  let isFound = false;
  let levelCounter = 1;

  function getChildren(tree) {
    console.log(levelCounter, level);

    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id == id) {
        childrenArr = createMyBranchNodes(tree[i].child);
        isFound = true;
        break;
      }

      if (tree[i]?.child?.length && levelCounter < level) {
        levelCounter++;
        getChildren(tree[i].child);
        levelCounter--;
      }

      if (isFound) break;
    }

  }

  getChildren(treeData);
  return childrenArr;
}

function createMyBranchNodes(branchData) {
  let rootNodes = [];

  if (branchData?.length) {
    branchData.forEach(node => {
      const { name, level, id } = node;
      rootNodes.push({ name, level, id });
    });
  }
  
  return rootNodes;
}



let levelCounter = 0;
let counterLevels = [0, 0, 0, 0];

function setLevel(level, action) {
  switch (action) {
    case 'add':
      counterLevels[level]++;
      break;
    case 'subtract':
      counterLevels[level]--;
      break;
    default:
      break;
  }

  for (let i = counterLevels.length - 1; i >= 0; i--) {
    if (counterLevels[i] > 0) {

      if (i > levelCounter) {
        for (let diff = 0; diff < (i - levelCounter); diff++) {
          document.dispatchEvent(parsingLevelIncreased);
          // console.log('+1');
        }
      } else if (i < levelCounter) {
        for (let diff = 0; diff < (levelCounter - i); diff++) {
          document.dispatchEvent(parsingLevelDecreased);
          // console.log('-1');
        }
      }

      levelCounter = i;

      break;
    }
  }
}

let originalTreeData = null;
let getChildrenFromOriginalTree = null;

function setOriginalTreeData(treeData) {
  originalTreeData = treeData;
  getChildrenFromOriginalTree = getChildrenFromTreeById(originalTreeData);
}

function getChildNodes(treeArr, level, previousResolve) {
  if (!treeArr.length) {
    previousResolve();
  } else {
    level++;
    setLevel(level - 1, 'add');
    Promise.allSettled(treeArr.map(node => {
      return new Promise(resolve => {
        setTimeout(() => {
          node.child = getChildrenFromOriginalTree(node.id, level);
          getChildNodes(node.child, level, resolve);
        }, 1000);
      });
    })).then(() => {
      setLevel(level - 1, 'subtract');
      previousResolve(treeArr);
    });
  }
}

export { createMyBranchNodes, getChildNodes, setOriginalTreeData };