/*Prompt

Given two integers n and k, return all possible combinations of k numbers from 1 to n.
  Examples:

n = 4
k = 2

result =
  [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4],
  ]

n = 3
k = 1

result =
  [
    [1],
    [2],
    [3],
  ]


n = 5
k = 3

[
  [1,2,3]
  [1,2,4]
  [1,2,5]
  ...
  
  
  
]



Input:

n = Integer

k = Integer
Output

result = Array of Arrays of Integers
Constraints:

Time: O(n choose k)

Space: O(n choose k)

The order of the output array DOES NOT MATTER.

n and k are both positive.

*/


function combinations(n, k){
  let result = []
  function recurse(start, combo){
    if(combo.length == k){
      return result.push(combo.slice())
    }
    if(combo.length + (n-start+1) < k){
      return
    }
    recurse(start+1, combo)
    combo.push(start)
    recurse(start+1, combo)
    combo.pop()
    
    
  }
  recurse(1, []) 
  return result
}

console.log(combinations(5, 2))



