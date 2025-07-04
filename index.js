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
      let node = new Node(array[1]);
      node.left = this.buildTree([array[0]]);
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
    }

    postOrderStep(this.root);
  }

  height(value) {
    if (this.find(value)) {
      function heightStep(node) {
        let leftHeight = 0;
        let rightHeight = 0;
        if (node.left != null) {
          leftHeight += 1;
          leftHeight += heightStep(node.left);
        }
        if (node.right != null) {
          rightHeight += 1;
          rightHeight += heightStep(node.right);
        }
        return Math.max(leftHeight, rightHeight);
      }

      return heightStep(this.find(value));
    } else {
      return `${value} doesn't exist within tree.`;
    }
  }

  depth(value) {
    if (this.find(value)) {
      let depth = 0;

      function findDepth(value, node) {
        if (value > node.data) {
          depth += 1;
          findDepth(value, node.right);
        } else if (value < node.data) {
          depth += 1;
          findDepth(value, node.left);
        }
      }
      findDepth(value, this.root);
      return depth;
    } else {
      return `${value} doesn't exist within tree.`;
    }
  }

  isBalanced() {
    const checkBalanced = (node) => {
      let rightHeight = 0;
      let leftHeight = 0;
      if (node.right != null) {
        rightHeight = this.height(node.right.data);
      }
      if (node.left != null) {
        leftHeight = this.height(node.left.data);
      }

      if (Math.abs(rightHeight - leftHeight) <= 1) {
        return true;
      } else {
        return false;
      }
    };

    let nodeList = [];
    let queue = [this.root];

    function findNodes() {
      while (queue.length != 0) {
        let currentNode = queue[0];
        nodeList.push(currentNode);
        if (currentNode.left) {
          queue.push(currentNode.left);
        }
        if (currentNode.right) {
          queue.push(currentNode.right);
        }
        queue.shift();
      }
    }

    findNodes();

    let isBalanced = true;

    for (const node of nodeList) {
      if (!checkBalanced(node)) {
        isBalanced = false;
      }
    }

    return isBalanced;
  }

  rebalance() {
    let treeData = []
    this.inOrder(x => treeData.push(x));
    this.root = this.buildTree(mergeSort([...new Set(treeData)]));
  }
}

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

export {Node, Tree, prettyPrint}