import {Node, Tree, prettyPrint} from './index.js'

function getRandomInteger(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const arrayNums = 100;

let treeData = [];

for (let i = 0; i<arrayNums; i++) {
    treeData.push(getRandomInteger(1,100));
}

// Step 1
let newTree = new Tree(treeData);

// Step 2
console.log(newTree.isBalanced() ? 'The tree is balanced' : 'The tree is not balanced');

// Step 3
console.log('Printing out numbers in level order');
newTree.levelOrder(x => {
    console.log(x)
    return x;
});
console.log('Printing out numbers in order');
newTree.inOrder(x => {
    console.log(x)
    return x;
});
console.log('Printing out numbers in preorder');
newTree.preOrder(x => {
    console.log(x)
    return x;
});
console.log('Printing out numbers in postorder');
newTree.postOrder(x => {
    console.log(x)
    return x;
});

// Step 4
for (let i = 0; i<arrayNums; i++) {
    newTree.insert(getRandomInteger(100,200));
}

// Step 5
console.log(newTree.isBalanced() ? 'The tree is balanced' : 'The tree is not balanced');

// Step 6
newTree.rebalance();

// Step 7
console.log(newTree.isBalanced() ? 'The tree is balanced' : 'The tree is not balanced');

// Step 8
console.log('Printing out numbers in level order');
newTree.levelOrder(x => {
    console.log(x)
    return x;
});
console.log('Printing out numbers in order');
newTree.inOrder(x => {
    console.log(x)
    return x;
});
console.log('Printing out numbers in preorder');
newTree.preOrder(x => {
    console.log(x)
    return x;
});
console.log('Printing out numbers in postorder');
newTree.postOrder(x => {
    console.log(x)
    return x;
});