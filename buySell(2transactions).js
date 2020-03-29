/*Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

Example 1:

Input: [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
             Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

Example 2:

Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.

Example 3:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.


https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-k-times/?ref=rp

*/



function buySell(arr, k){

  let prof = []
  console.log(arr)
  for(let i =0; i < arr.length; i++){
    prof.push(0)
  }

  for(let j = 0; j < k; j++){
    let min = arr[0]
    let max = 0
    for(let i = 1; i < arr.length; i++){
      min = Math.min(min, arr[i] - prof[i]) 
      /*Math.min compares two values and selects the more minimum value of the two.
So before the Math.min statement -
min has x value
and arr[i] - prof[i] has y value.
Math.min is comparing x and y. and it’s also setting min equal to the lesser value of x and y.
*/
      max = Math.max(max, arr[i]-min) 
      prof[i] = max
    }
    console.log(prof)
}
  return prof.pop()
}

// [0,3,3, 5]
//[0, 3,3, 7]

console.log(buySell([3, 3, 5, 0, 0, 3, 1, 4], 2))
