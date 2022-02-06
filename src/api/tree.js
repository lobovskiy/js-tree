import * as TreeGen from "tree-json-generator";

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
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve(getSimpleTree());
    }, 2000);

  });
}



function getAsyncTreeV3() {
  const originalTreeData = getSimpleTree();
  const statusDiv = document.getElementById('loading-status');
  let myTreeData = [];

  function createMyBranchNodes(branchData) {
    let rootNodes = [];

    branchData.forEach(node => {
      const { name, level, id } = node;
      rootNodes.push({ name, level, id });
    });
    
    return rootNodes;
  }

  const getChildren = treeData => id => {
    let childrenArr = [];

    function getChildren(tree) {

      tree.forEach(node => {
        if (node.id == id) {
          childrenArr = createMyBranchNodes(node.child);
          return;     // выйдет из всей функции getChildrenTree или только из forEach??
        }

        node?.child?.length && getChildren(node.child);
      });
    }

    getChildren(treeData);
    return childrenArr;
  }

  const getChildrenFromOriginalTree = getChildren(originalTreeData);





  return new Promise((resolve, reject) => {
    
    // get all data from API
    myTreeData = createMyBranchNodes(originalTreeData);
    statusDiv.textContent = 'getting source data...';

    setTimeout(() => {
      resolve(myTreeData);
    }, 1000);

  })
  .then(treeData => {
    return new Promise((resolve, reject) => {

      function getChildNodes(treeArr) {

        const delay = node => {
          return new Promise((resolve) => {
            setTimeout(() => {
              node.child = getChildrenFromOriginalTree(node.id);
              resolve();
            }, 300);
          });
        }

        const doNextPromise = (d) => {
          delay(treeArr[d])
          .then(() => {
            console.log(d + 1);
            statusDiv.textContent = `parsing parents: ${d + 1}/${treeArr.length}`;
            d++;
            if (d < treeArr.length) {
              doNextPromise(d)
            } else {

              setTimeout(() => {
                statusDiv.textContent = 'creating tree...';
                resolve(treeData);
              }, 1000);
            }
          });
        }
        doNextPromise(0);

      }

      getChildNodes(treeData);
  
    })
  })
  .then(treeData => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(treeData);
        statusDiv.textContent = 'done!';
        resolve(treeData);
      }, 1000);
  
    })
  });
}

export { getSimpleTree, getAsyncTree, getAsyncTreeV3 };