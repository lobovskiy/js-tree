import * as TreeGen from "tree-json-generator";
import { connectAPIStarted, parsingDataStarted, parsingLevelIncreased, parsingLevelDecreased, finishParsingData, dataReady } from "../ctrl/events.js";

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

  const getChildrenFromTreeById = treeData => id => {
    let childrenArr = [];
    let isFound = false;

    function getChildren(tree) {

      for (let i = 0; i < tree.length; i++) {
        if (tree[i].id == id) {
          childrenArr = createMyBranchNodes(tree[i].child);
          isFound = true;
          break;
        }

        tree[i]?.child?.length && getChildren(tree[i].child);

        if (isFound) break;
      }

    }

    getChildren(treeData);
    return childrenArr;
  }

  const getChildrenFromOriginalTree = getChildrenFromTreeById(originalTreeData);



  return new Promise(resolve => {

    myTreeData = createMyBranchNodes(originalTreeData);
    document.dispatchEvent(connectAPIStarted);

    setTimeout(() => {
      resolve(myTreeData);
    }, 1000);

  })
  .then(treeData => {
    document.dispatchEvent(parsingDataStarted);

    return new Promise(resolve => {
      
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

      function getChildNodes(treeArr, level, previousResolve) {
        if (!treeArr.length) {
          previousResolve();
        } else {
          level++;
          setLevel(level - 1, 'add');
          Promise.allSettled(treeArr.map(node => {
            return new Promise(resolve => {
              setTimeout(() => {
                node.child = getChildrenFromOriginalTree(node.id);
                getChildNodes(node.child, level, resolve);
              }, 1000);
            });
          })).then(() => {
            setLevel(level - 1, 'subtract');
            previousResolve(treeArr);
          });
        }
      }

      getChildNodes(treeData, levelCounter, resolve);
  
    });
  })
  .then(treeData => {
    return new Promise(resolve => {
      document.dispatchEvent(finishParsingData);

      setTimeout(() => {
        // console.log(treeData);
        // statusDiv.textContent = 'done!';
        document.dispatchEvent(dataReady);
        resolve(treeData);
      }, 1000);
  
    })
  });
}

export { getSimpleTree, getAsyncTree, getAsyncTreeV3 };