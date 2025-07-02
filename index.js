import mergeSort from "./sort.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left;
    this.right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(mergeSort([...new Set(array)])); // removes duplicate values and sorts array
  }

  buildTree(array) {
    if (array.length == 1) {
      let node = new Node(array[0]);
      node.right = null;
      node.left = null;
      return node;
    } else if (array.length == 2) {
      let node = new Node(array[0]);
      node.right = this.buildTree([array[1]]);
      node.left = null;
      return node;
    } else {
      let rootIndex = Math.floor(array.length / 2);
      let node = new Node(array[rootIndex]);

      let leftTree = this.buildTree(array.slice(0, rootIndex));
      let rightTree = this.buildTree(array.slice(rootIndex + 1, array.length));

      node.left = leftTree;
      node.right = rightTree;

      return node;
    }
  }

  insert(value) {}

  deleteItem(value) {}
}

let testArray = [2, 3, 1, 5, 4, 9];

let testTree = new Tree(testArray);

// console.log(testTree);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(testTree.root);
