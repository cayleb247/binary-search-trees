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

  levelOrder(callback) {
    if (!callback) {
      throw new Error("No callback was provided");
    } else if (!this.root) {
      throw new Error("There is no root node");
    }

    let queue = [this.root];

    while (queue.length != 0) {
      let currentNode = queue[0];
      currentNode.data = callback(currentNode.data);
      console.log(currentNode.data);
      if (currentNode.left) {
        queue.push(currentNode.left);
      } 
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      queue.shift();
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("No callback was provided");
    } else if (!this.root) {
      throw new Error("There is no root node");
    }
    function inOrderStep(root) {
        if (root.left != null) {
            inOrderStep(root.left);
        }
        root.data = callback(root.data);
        console.log(`new data is ${root.data}`)
        if (root.right != null) {
            inOrderStep(root.right);
        }
    }

    inOrderStep(this.root);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("No callback was provided");
    } else if (!this.root) {
      throw new Error("There is no root node");
    }
    function preOrderStep(root) {
        root.data = callback(root.data);
        console.log(`new data is ${root.data}`)
        if (root.left != null) {
            preOrderStep(root.left);
        }
        
        if (root.right != null) {
            preOrderStep(root.right);
        }
    }

    preOrderStep(this.root);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("No callback was provided");
    } else if (!this.root) {
      throw new Error("There is no root node");
    }
    function postOrderStep(root) {
        if (root.left != null) {
            postOrderStep(root.left);
        }
        
        if (root.right != null) {
            postOrderStep(root.right);
        }
        root.data = callback(root.data);
        console.log(`new data is ${root.data}`)
    }

    postOrderStep(this.root);
  }

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

testTree.inOrder((x) => 2*x);
prettyPrint(testTree.root);
testTree.preOrder((x) => 2*x);
prettyPrint(testTree.root);
testTree.postOrder((x) => 2*x);


prettyPrint(testTree.root);
