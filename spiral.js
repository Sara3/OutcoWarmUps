/*Matrices - N Spiral Matrix
Prompt

Given an integer N, output an N x N spiral matrix with integers 1 through N2.
Examples:

Input:  3

Output: [[1, 2, 3],
         [8, 9, 4],
         [7, 6, 5]
 
Input: 1

Output: [[1]]

Input:

n = {Integer}
Output

result = {Integer[][]}
Constraints:

Time: O(N2)

Space: O(N2)
Resources:

Spiral Matrix
*/


function matrix_spiral(n){
  let mat = []
  for(let i =0; i < n; i++){
    mat.push([])
  }

  
  let c = 1
  
  let minr = 0
  let minc = 0
  let maxr = n - 1
  let maxc = n - 1
  while(minr <= maxr && minc<=maxc) {
    // top
    for (let i = minc; i <= maxc; i++){
      mat[minr][i] = c
      c++
    }
    minr++
    
    // right
    for (let i = minr; i <= maxr; i++) {
      mat[i][maxc] = c
      c++
    }
    maxc--
    
    // bottom 
    for (let i = maxc; i >= minc; i--){
      mat[maxr][i] = c
      c++
    }
    maxr--
    
    // left
    for (let i = maxr; i >= minr; i--){
      mat[i][minc] = c
      c++
    }
    minc++
  }
  
  return mat
  
}

console.log(matrix_spiral(4))
console.log(matrix_spiral(10))