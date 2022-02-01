import { getAsyncTree } from '../api/tree.js';
import { createBranch } from '../view/tree.js';

const wrapper = document.getElementById('the-tree');
const button = document.getElementById('load-button');

button.addEventListener('click', loadTree);

function loadTree() {
  getAsyncTree().then(asyncTreeData => {
    const tree = createBranch(asyncTreeData);

    wrapper.append(tree);
  });
}