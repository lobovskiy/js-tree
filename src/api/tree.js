import * as TreeGen from "tree-json-generator";
import { connectAPIStarted, parsingDataStarted, parsingDataFinished, dataReady } from "../ctrl/events.js";
import { createMyBranchNodes, getChildNodes, setOriginalTreeData } from "../ctrl/services.js";

const config = {
  node: { // Node fields, required
    id: "@id()", // Pipes
    parent: "@parent()",
    level: "@level()",
    name: "@randomName()", 
    age: "@randomInteger(14,99)",
    email: "@randomEmail()",
    registered: "@randomBoolean(0.79)",
    child: "@child()" // Child field pointer (not required, if children are not needed)
  },
  rootNodesNumber: 7, // Number of root nodes
  childNodesNumber: [2, 5], // Number of children nodes (from 2 to 5)
  hasChildRate: 0.4, // Probability of children
  maxLevel: 3 // Max nesting
}

function getSimpleTree() {
  const simpleTree = TreeGen.generate(config);
  console.log(simpleTree);
  return simpleTree;
}

function getAsyncTree() {
  return new Promise(resolve => {

    setTimeout(() => {
      resolve(getSimpleTree());
    }, 2000);

  });
}

function getAsyncTreeV3() {
  const originalTreeData = getSimpleTree();
  let myTreeData = [];
  setOriginalTreeData(originalTreeData);

  return new Promise(resolve => {
    document.dispatchEvent(connectAPIStarted);

    myTreeData = createMyBranchNodes(originalTreeData);
    setTimeout(() => {
      resolve(myTreeData);
    }, 1000);

  })
  .then(treeData => {
    document.dispatchEvent(parsingDataStarted);

    return new Promise(resolve => {
      getChildNodes(treeData, 0, resolve);
    });
  })
  .then(treeData => {
    return new Promise(resolve => {
      document.dispatchEvent(parsingDataFinished);

      setTimeout(() => {
        document.dispatchEvent(dataReady);
        resolve(treeData);
      }, 1000);
  
    })
  });
}

export { getSimpleTree, getAsyncTree, getAsyncTreeV3 };