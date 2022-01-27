import tree from '../api/simple.js'

console.log(tree);

const wrapper = document.getElementById('theTree');
let rootNodes = '<ul>';

for (let i = 0; i < tree.length; i++) {
    rootNodes += `<li data-id="${tree[i].id}">${tree[i].name}`;
    if (tree[i].child) {
        rootNodes += '<ul>';
        tree[i].child.forEach(child => {
            rootNodes += `<li data-id="${child.id}">${child.name}</li>`;
        })
        rootNodes += '</ul>';
    }
    rootNodes += '</li>';
}

rootNodes += '</ul>';

wrapper.innerHTML = rootNodes;