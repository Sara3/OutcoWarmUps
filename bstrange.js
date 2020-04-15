function node(val){
  this.val = val; 
  this.left = null;
  this.right= null;
}
// constructor 
function bst(){
  this.root = null
}

bst.prototype.push = function(val){
  var root = this.root; 
  
  if(!root){
    this.root = new node(val);
    return;
  }
  
  var curNode = root; 
  var newNode = new node(val)
  
  while(curNode){
    if(val< curNode.val){
      if(!curNode.left){
        curNode.left = newNode;
        break;
      } else {
        curNode = curNode.left
      }
    }
    else {
      if(!curNode.right){
        curNode.right = newNode;
        break;
      } else {
        curNode = curNode.right
      }
    }
  }
}

function dfs(node){
  if(node){
    dfs(node.left)
    console.log(node.val)
    dfs(node.right)
  }
}


var binaryTree = new bst()

binaryTree.push(10)
binaryTree.push(5)
binaryTree.push(15)
binaryTree.push(3)
binaryTree.push(7)
binaryTree.push(null)
binaryTree.push(18)


//dfs(binaryTree.root)

/*
https://leetcode.com/problems/range-sum-of-bst/
input: root 
L: 7
R: 15

out: int (32)

-
- in order traversal 

pseudo:
query(node, left, right):
  sum = 0
  # some termination code to break early
  # todo
  if !node: return sum
  
  if left <= this.val <= this.right:
    sum += this.val
  sum += query(this.left, left, right)
  sum += query(this.right, left, right)
*/

function sumBST(root, L, R){
  if(root == null){
    return 0//base 
  }
  if(root.val < L) {
    return sumBST(root.right, L, R)
  }
  if(root.val > R){
    return sumBST(root.left, L, R)
  }
  return root.val+sumBST(root.right, L, R)+sumBST(root.left, L, R)
}

console.log(sumBST(binaryTree.root, 7, 15))





