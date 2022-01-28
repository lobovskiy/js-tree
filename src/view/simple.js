import tree from '../api/simple.js'

console.log(tree);

const wrapper = document.getElementById('theTree');

function renderTree(arr) {
    const list = document.createElement('ul');
    
    console.log(list);
    
    arr.forEach(treeNode => {
        const listItem = document.createElement('li');
        listItem.append(treeNode.name);
        list.append(listItem);
        if (treeNode.child) {
            listItem.append(renderTree(treeNode.child));
        }
    })
    
    return list;
}

wrapper.append(renderTree(tree));