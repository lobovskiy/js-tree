import { getSimpleTree } from '../api/tree.js';
import { createBranch } from '../view/tree.js';

const simpleTreeData = getSimpleTree();
const tree = createBranch(simpleTreeData);

const wrapper = document.getElementById('theTree');
wrapper.append(tree);