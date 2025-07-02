import mergeSort from "./sort.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(mergeSort([...new Set(array)])); // removes duplicate values and sorts array
  }

  buildTree(array) {
    if (array.length == 1) {
      let node = new Node(array[0]);
      return node;
    } else if (array.length == 2) {
      let node = new Node(array[0]);
      node.right = this.buildTree([array[1]]);
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

  insert(value) {
    function insertNode(value, node) {
      if (value > node.data) {
        if (node.right == null) {
          node.right = new Node(value);
        } else {
          insertNode(value, node.right);
        }
      } else if (value < node.data) {
        if (node.left == null) {
          node.left = new Node(value);
        } else {
          insertNode(value, node.left);
        }
      }
    }

    insertNode(value, this.root);
  }

  deleteItem(value) {
    if (value == this.root.data) {
      this.root = null;
      return;
    }

    function deleteNode(value, node) {
      if (value > node.data) {
        if (deleteNode(value, node.right)) {
          node.right = null;
        }
      } else if (value < node.data) {
        if (deleteNode(value, node.left)) {
          node.left = null;
        }
      } else {
        return true;
      }
    }

    deleteNode(value, this.root);
  }

  find(value) {
    function findNode(value, node) {
      if (value > node.data) {
        if (node.right == null) {
          return null;
        } else {
          return findNode(value, node.right);
        }
      } else if (value < node.data) {
        if (node.left == null) {
          return null;
        } else {
          return findNode(value, node.left);
        }
      } else {
        return node;
      }
    }

    return findNode(value, this.root);
  }

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(value) {}

  depth(value) {}

  isBalanced() {}

  rebalance() {}
}

let testArray = [2, 3, 1, 5, 4, 9];

let testTree = new Tree(testArray);

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

testTree.insert(33);
testTree.insert(6);
testTree.insert(0);

prettyPrint(testTree.root);

console.log(testTree.find(33));
