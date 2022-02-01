import { getSimpleTree, getAsyncTree } from '../api/tree.js';
import { createBranch } from '../view/tree.js';

document.addEventListener("DOMContentLoaded", () => {
  const wrapperSimpleTree = document.getElementById('simple-tree');
  const wrapperAsyncTree1 = document.getElementById('async-tree1');
  const loadButton1 = document.getElementById('load-button1');

  function createSimpleTree() {
    const simpleTreeData = getSimpleTree();
    return createBranch(simpleTreeData);
  }

  async function createAsyncTree() {
    const asyncTreeData = await getAsyncTree();
    return createBranch(asyncTreeData);
  }

  function renderTree(tree, container) {
    container.textContent = '';
    container.append(tree);
  }

  async function renderAsyncTree() {
    const asyncTree = await createAsyncTree();
    renderTree(asyncTree, wrapperAsyncTree1);
  }

  renderTree(createSimpleTree(), wrapperSimpleTree);

  loadButton1.addEventListener('click', renderAsyncTree);
});