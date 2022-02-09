import { getSimpleTree, getAsyncTree, getAsyncTreeV3 } from '../api/tree.js';
import { createBranch, renderTree, changeParsingLevel } from '../view/tree.js';

document.addEventListener("DOMContentLoaded", () => {
  const wrapperSimpleTree = document.getElementById('simple-tree');

  const wrapperAsyncTreeV2 = document.getElementById('tree-v2');
  const loadButtonTreeV2 = document.getElementById('tree-v2-load-button');

  const wrapperAsyncTreeV3 = document.getElementById('tree-v3');
  const loadButtonTreeV3 = document.getElementById('tree-v3-load-button');
  const statusAsyncTreeV3 = document.getElementById('tree-v3-loading-status');
  const parsingStatusAsyncTree2 = document.getElementById('tree-v3-parsing-status');
  const changeParsingTreeV3 = changeParsingLevel(parsingStatusAsyncTree2);

  document.addEventListener("connectAPIStarted", () => statusAsyncTreeV3.textContent = 'getting source data...');
  document.addEventListener("parsingDataStarted", () => statusAsyncTreeV3.textContent = 'parsing tree...');
  document.addEventListener("parsingLevelIncreased", () => changeParsingTreeV3('increase'));
  document.addEventListener("parsingLevelDecreased", () => changeParsingTreeV3('decrease'));
  document.addEventListener("finishParsingData", () => statusAsyncTreeV3.textContent = 'creating tree...');
  document.addEventListener("dataReady", () => statusAsyncTreeV3.textContent = 'done!');

  function createSimpleTree() {
    return createBranch(getSimpleTree());
  }

  function renderAsyncTree() {
    getAsyncTree().then(asyncTreeData => {
      const asyncTree = createBranch(asyncTreeData);
      renderTree(asyncTree, wrapperAsyncTreeV2);
    });
  }

  function renderAsyncTreeV3() {
    wrapperAsyncTreeV3.textContent = '';
    getAsyncTreeV3().then(asyncTreeData => {
      const asyncTree = createBranch(asyncTreeData);
      renderTree(asyncTree, wrapperAsyncTreeV3);
    });
  }

  renderTree(createSimpleTree(), wrapperSimpleTree);

  loadButtonTreeV2.addEventListener('click', renderAsyncTree);
  loadButtonTreeV3.addEventListener('click', renderAsyncTreeV3);
});