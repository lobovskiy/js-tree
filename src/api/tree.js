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
  const statusDivs = document.querySelectorAll('.status-section');

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

  const getChildrenFromOriginalTree = getChildrenFromTreeById(originalTreeData);

  let event = new Event("hello", {bubbles: true}); // (2)
  document.dispatchEvent(event);



  return new Promise((resolve, reject) => {
    // get all data from API
    myTreeData = createMyBranchNodes(originalTreeData);
    statusDiv.textContent = 'getting source data...';

    setTimeout(() => {
      resolve(myTreeData);
    }, 1000);

  })
  .then(treeData => {
    statusDiv.textContent = 'parsing tree...';
    return new Promise((resolve, reject) => {
      
      let levelCounter = 0;
      let counterLevels = [0, 0, 0, 0]

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

        for (let i = 0; i < counterLevels.length; i++) {
          if (counterLevels[i] > 0) {
            levelCounter = i;
            statusDivs.forEach(div => div.style.display = 'block');
            for (let j = i; j < statusDivs.length; j++) {
              statusDivs[j].style.display = 'none';
            }
            for (let k = 0; k < i; k++) {
              statusDivs[k].style.display = 'block';
            }
          }
        }
        // console.log(levelCounter);
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
                // console.log(node);
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
    return new Promise((resolve, reject) => {
      statusDiv.textContent = 'creating tree...';
      setTimeout(() => {
        console.log(treeData);
        statusDiv.textContent = 'done!';
        resolve(treeData);
      }, 1000);
  
    })
  });
}

export { getSimpleTree, getAsyncTree, getAsyncTreeV3 };