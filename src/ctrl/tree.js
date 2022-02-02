import { getSimpleTree, getAsyncTree } from '../api/tree.js';
import { createBranch, renderTree } from '../view/tree.js';

document.addEventListener("DOMContentLoaded", () => {
  const wrapperSimpleTree = document.getElementById('simple-tree');
  const wrapperAsyncTree1 = document.getElementById('async-tree1');
  const loadButton1 = document.getElementById('load-button1');

  function createSimpleTree() {
    const simpleTree = createBranch(getSimpleTree());
    console.dir(simpleTree);
    return simpleTree;
  }

  function renderAsyncTree() {
    getAsyncTree().then(asyncTreeData => {
      const asyncTree = createBranch(asyncTreeData);
      renderTree(asyncTree, wrapperAsyncTree1);
    });
  }

  renderTree(createSimpleTree(), wrapperSimpleTree);

  loadButton1.addEventListener('click', renderAsyncTree);
});