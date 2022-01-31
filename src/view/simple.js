import tree from '../api/simple.js';

console.log(tree);

const wrapper = document.getElementById('theTree');

let levelCounter = 1;

function renderTree(arr) {

    const list = document.createElement('ul');
    
    arr.forEach(treeNode => {
        const listItem = document.createElement('li');
        listItem.setAttribute("data-level", levelCounter);
        listItem.textContent = treeNode.name;
        list.append(listItem);
        if (treeNode.child && treeNode.child.length) {
            levelCounter++;
            listItem.append(renderTree(treeNode.child));
        }
    });
    
    levelCounter--;
    
    return list;
}

wrapper.append(renderTree(tree));