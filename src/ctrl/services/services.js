import { createItemCounterEventWithLevel } from "../events.js";
import { createMyBranchNodes, getChildrenFromOriginalTree } from "./my-data.js";
import { countParsingLevel } from "./counters.js";

const getChildrenFromTreeById = treeData => (id, level) => {
  let childrenArr = [];
  let isFound = false;
  let levelCounter = 0;

  function getChildren(tree) {

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

function getChildNodes(treeArr, previousResolve, level = 0) {
  if (!treeArr.length) {
    previousResolve();
  } else {
    const itemParsedEvent = createItemCounterEventWithLevel(level);
    countParsingLevel(level, 'add');
    Promise.allSettled(treeArr.map(node => {
      return new Promise(resolve => {
        document.dispatchEvent(itemParsedEvent);
        setTimeout(() => {
          node.child = getChildrenFromOriginalTree(node.id, level);
          getChildNodes(node.child, resolve, level + 1);
        }, 1000);
      });
    })).then(() => {
      countParsingLevel(level, 'subtract');
      previousResolve(treeArr);
    });
  }
}

export { getChildNodes, getChildrenFromTreeById };