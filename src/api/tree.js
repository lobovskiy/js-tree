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
  const statusDivs = [
    document.getElementById('status-level0'),
    document.getElementById('status-level1'),
    document.getElementById('status-level2'),
    document.getElementById('status-level3'),
  ];

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





  return new Promise((resolve, reject) => {

    statusDivs.forEach(div => div.textContent = '');
    
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

      function getChildNodes(treeArr, previousResolve) {

        const delay = node => {
          return new Promise((resolve) => {
            setTimeout(() => {
              levelCounter++;
              node.child = getChildrenFromOriginalTree(node.id);
              getChildNodes(node.child, resolve);
            }, 100);
          });
        }

        const doNextPromise = (d) => {
          if (!treeArr.length) {
            levelCounter--;
            statusDivs[levelCounter].textContent = '';
            previousResolve();
          } else {
            document.querySelectorAll('.status-section')[levelCounter].style.display = 'block';
            statusDivs[levelCounter].style.width = `${(d + 1) * 100 / treeArr.length}%`;
            delay(treeArr[d])
            .then(() => {
              // console.log(levelCounter);
              statusDivs[levelCounter].style.width = `${(d + 1) * 100 / treeArr.length}%`;
              d++;
              if (d < treeArr.length) {
                doNextPromise(d)
              } else {
                statusDivs[levelCounter].textContent = 'creating branch...';
                setTimeout(() => {
                  document.querySelectorAll('.status-section')[levelCounter].style.display = 'none';
                  statusDivs[levelCounter].textContent = '';
                  statusDivs[levelCounter].style.width = '0%';
                  levelCounter--;
                  previousResolve(treeArr);
                }, 500);
              }
            });
          }
        }

        doNextPromise(0);
      }

      getChildNodes(treeData, resolve);
  
    })
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