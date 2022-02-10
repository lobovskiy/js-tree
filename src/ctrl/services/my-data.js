import { getChildrenFromTreeById } from "./services.js";

let originalTreeData = null;
let getChildrenFromOriginalTree = null;

function setOriginalTreeData(treeData) {
  originalTreeData = treeData;
  getChildrenFromOriginalTree = getChildrenFromTreeById(originalTreeData);
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

function createParentNodes() {
  return createMyBranchNodes(originalTreeData);
}

export { createMyBranchNodes, createParentNodes, setOriginalTreeData, getChildrenFromOriginalTree };