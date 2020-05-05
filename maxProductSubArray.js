/*given an integer array nums, find the contiguous subarray
 within an array(containing at least one number) which has the largest product.

  Example 1:

Input: [2, 3, -2, 4]
Output: 6
Explanation: [2, 3] has the largest product 6.

Example 2:

Input: [-2, 0, -1]

*/

function maxProd(arr){
  let cur_max = arr[0]
  let cur_min = arr[0]
  let pre_max = arr[0]
  let pre_min = arr[0]
  let result = arr[0]
  
  for(let i = 1; i < arr.length; i++){
    // pre_max*arr[i], pre_min*arr[i], arr[i] (starting )
    cur_max = Math.max(pre_max * arr[i], pre_min * arr[i], arr[i])
    cur_min = Math.min(pre_max * arr[i], pre_min * arr[i], arr[i])
    result = Math.max(result, cur_max)
    pre_max = cur_max
    pre_min = cur_min 
  }
  return result
}
console.log(maxProd([-2,3,-2, 1,-4]))