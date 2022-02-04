import { getSimpleTree, getAsyncTree, getAsyncTreeV3 } from '../api/tree.js';
import { createBranch, renderTree } from '../view/tree.js';

document.addEventListener("DOMContentLoaded", () => {
  const wrapperSimpleTree = document.getElementById('simple-tree');
  const wrapperAsyncTree1 = document.getElementById('async-tree1');
  const wrapperAsyncTree2 = document.getElementById('async-tree2');
  const loadButton1 = document.getElementById('load-button1');
  const loadButton2 = document.getElementById('load-button2');

  function createSimpleTree() {
    return createBranch(getSimpleTree());
  }

  function renderAsyncTree() {
    getAsyncTree().then(asyncTreeData => {
      const asyncTree = createBranch(asyncTreeData);
      renderTree(asyncTree, wrapperAsyncTree1);
    });
  }

  function renderAsyncTreeV3() {
    getAsyncTreeV3().then(asyncTreeData => {
      const asyncTree = createBranch(asyncTreeData);
      renderTree(asyncTree, wrapperAsyncTree2);
    });
  }

  renderTree(createSimpleTree(), wrapperSimpleTree);

  loadButton1.addEventListener('click', renderAsyncTree);
  loadButton2.addEventListener('click', renderAsyncTreeV3);
});